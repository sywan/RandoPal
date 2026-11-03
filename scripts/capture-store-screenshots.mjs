import {createServer} from 'node:http';
import {spawn} from 'node:child_process';
import {mkdtemp, readFile, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const {version}=JSON.parse(await readFile(path.join(root,'package.json'),'utf8'));
const releaseVersion=`v${version.split('.').slice(0,2).join('.')}`;
const output=path.join(root,'release',releaseVersion,'chrome/store-assets');
const chromePath=process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png','.webp':'image/webp','.gif':'image/gif','.svg':'image/svg+xml'};
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));

class DevTools {
  constructor(url){
    this.socket=new WebSocket(url);
    this.nextId=1;
    this.pending=new Map();
    this.ready=new Promise((resolve,reject)=>{this.socket.onopen=resolve;this.socket.onerror=reject});
    this.socket.onmessage=event=>{
      const message=JSON.parse(event.data);
      if(!message.id)return;
      const pending=this.pending.get(message.id);
      if(!pending)return;
      this.pending.delete(message.id);
      message.error?pending.reject(new Error(message.error.message)):pending.resolve(message.result);
    };
  }
  async send(method,params={}){
    await this.ready;
    const id=this.nextId++;
    return new Promise((resolve,reject)=>{
      this.pending.set(id,{resolve,reject});
      this.socket.send(JSON.stringify({id,method,params}));
    });
  }
  async evaluate(expression){
    const result=await this.send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});
    if(result.exceptionDetails)throw new Error(result.exceptionDetails.text);
    return result.result.value;
  }
  close(){this.socket.close()}
}

const server=createServer(async(req,res)=>{
  const target=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if(!target.startsWith(root+path.sep)){res.writeHead(403).end();return}
  try{
    const contents=await readFile(target);
    res.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream'}).end(contents);
  }catch{res.writeHead(404).end()}
});

await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const profile=await mkdtemp(path.join(tmpdir(),'randopal-store-capture-'));
const chrome=spawn(chromePath,[
  '--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check',
  '--hide-scrollbars','--remote-debugging-port=0',`--user-data-dir=${profile}`,
  '--window-size=1280,800',`${origin}/index.html?mode=pick&display=wheel`
],{stdio:'ignore'});

let devtools;
try{
  let port;
  for(let attempt=0;attempt<100;attempt++){
    try{port=(await readFile(path.join(profile,'DevToolsActivePort'),'utf8')).split('\n')[0];break}
    catch{await pause(100)}
  }
  if(!port)throw new Error('Chrome DevTools did not start');
  let page;
  for(let attempt=0;attempt<100;attempt++){
    const tabs=await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    page=tabs.find(tab=>tab.type==='page'&&tab.url.startsWith(origin));
    if(page)break;
    await pause(100);
  }
  if(!page)throw new Error('RandoPal tab did not load');
  devtools=new DevTools(page.webSocketDebuggerUrl);
  await devtools.send('Page.enable');
  await devtools.send('Runtime.enable');
  await devtools.send('Emulation.setDeviceMetricsOverride',{width:1280,height:800,deviceScaleFactor:1,mobile:false});
  for(let attempt=0;attempt<100;attempt++){
    if(await devtools.evaluate("Boolean(document.querySelector('#pickBtn') && document.querySelector('#cardTitle')?.textContent?.trim())"))break;
    await pause(100);
  }
  await pause(500);

  async function shot(filename){
    await pause(450);
    const {data}=await devtools.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false,fromSurface:true});
    await writeFile(path.join(output,filename),Buffer.from(data,'base64'));
    console.log(`Saved ${filename}`);
  }
  async function click(selector){
    const done=await devtools.evaluate(`(()=>{const el=document.querySelector(${JSON.stringify(selector)});if(!el)return false;el.click();return true})()`);
    if(!done)throw new Error(`Missing control: ${selector}`);
  }

  await click('#pickBtn');
  await pause(4200);
  await shot('01-pick-progress-1280x800.png');

  await click('.mode-tab[data-mode="group"]');
  await click('#groupBtn');
  await shot('02-smart-groups-1280x800.png');

  await click('.mode-tab[data-mode="pick"]');
  await click('.language-option[data-language="en"]');
  await shot('01-pick-progress-en-1280x800.png');
} finally {
  devtools?.close();
  chrome.kill();
  server.close();
  await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:200});
}
