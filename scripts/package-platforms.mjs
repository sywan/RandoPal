import {cp,copyFile,mkdir,readFile,rm,writeFile} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const run=promisify(execFile);
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const version='v0.50';
const out=path.join(root,'release',version);
const appFiles=[
  'index.html','styles.css','src/app.js','src/core.js','src/storage.js','src/xlsx.js','src/i18n.js',
  'icons/pal.svg','icons/icon-16.png','icons/icon-32.png','icons/icon-48.png','icons/icon-128.png',
  'icons/guga-pal-hd.webp','icons/guga-spin-hd.webp','icons/guga-pal-hd.gif','icons/guga-pal-hd.png'
];
async function copyFiles(target,files){
  for(const file of files){const to=path.join(target,file);await mkdir(path.dirname(to),{recursive:true});await copyFile(path.join(root,file),to)}
}
async function zipFolder(folder,zipPath){
  await rm(zipPath,{force:true});
  await run('zip',['-q','-X','-r',zipPath,'.'],{cwd:folder});
}
async function makeExtension(browser){
  const dir=path.join(out,browser,'extension');
  await mkdir(dir,{recursive:true});
  await copyFiles(dir,['manifest.json','_locales/en/messages.json','_locales/zh_TW/messages.json',...appFiles]);
  await zipFolder(dir,path.join(out,browser,`RandoPal-${browser}-v0.50.zip`));
}
await makeExtension('chrome');
await makeExtension('edge');

const webapp=path.join(out,'ios','webapp');
await mkdir(webapp,{recursive:true});
await copyFiles(webapp,appFiles);
const manifest={name:'RandoPal',short_name:'RandoPal',description:'隨機抽選、排序、分組 / Random picks, ordering, and groups',id:'./index.html',start_url:'./index.html',scope:'./',display:'standalone',background_color:'#f5faff',theme_color:'#eaf7ff',icons:[{src:'icons/app-192.png',sizes:'192x192',type:'image/png'},{src:'icons/app-512.png',sizes:'512x512',type:'image/png'}]};
await writeFile(path.join(webapp,'manifest.webmanifest'),JSON.stringify(manifest,null,2)+'\n');
let html=await readFile(path.join(webapp,'index.html'),'utf8');
html=html.replace('<link rel="stylesheet"',`<link rel="manifest" href="manifest.webmanifest">\n  <meta name="apple-mobile-web-app-capable" content="yes">\n  <meta name="apple-mobile-web-app-status-bar-style" content="default">\n  <link rel="apple-touch-icon" href="icons/apple-touch-icon.png">\n  <link rel="stylesheet"`);
html=html.replace('</head>',`<script>if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.warn));</script>\n</head>`);
await writeFile(path.join(webapp,'index.html'),html);
const cacheFiles=['./','./index.html','./styles.css?v=12','./src/app.js?v=15','./src/core.js','./src/storage.js','./src/xlsx.js','./src/i18n.js?v=2',...appFiles.filter(f=>f.startsWith('icons/')).map(f=>'./'+f),'./manifest.webmanifest'];
const sw=`const CACHE='randopal-${version}-pick-stage-logo2';\nconst FILES=${JSON.stringify(cacheFiles,null,2)};\nself.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));\nself.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));\nself.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith(caches.match(event.request,{ignoreSearch:true}).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response})));});\n`;
await writeFile(path.join(webapp,'sw.js'),sw);
for(const [size,name] of [[192,'app-192.png'],[512,'app-512.png'],[180,'apple-touch-icon.png']]){
  await run('magick',['-size',`${size}x${size}`,'xc:#eaf7ff','(',path.join(root,'icons/icon-512.png'),'-resize',`${size}x${size}` ,')','-gravity','center','-composite',path.join(webapp,'icons',name)]);
}
await zipFolder(webapp,path.join(out,'ios','RandoPal-iOS-WebApp-v0.50.zip'));

const native=path.join(out,'ios','native');
await cp(path.join(root,'platforms','ios-native'),native,{recursive:true,force:true});
const nativeAssets=path.join(native,'WebAssets');
await copyFiles(nativeAssets,appFiles);
const stripExports=source=>source.replace(/^export /gm,'');
const appCode=(await readFile(path.join(root,'src','app.js'),'utf8')).replace(/^import .*;\n/gm,'');
const bundle=`(async()=>{\n${stripExports(await readFile(path.join(root,'src','core.js'),'utf8'))}\n${stripExports(await readFile(path.join(root,'src','storage.js'),'utf8'))}\n${stripExports(await readFile(path.join(root,'src','xlsx.js'),'utf8'))}\n${stripExports(await readFile(path.join(root,'src','i18n.js'),'utf8'))}\n${appCode}\n})().catch(error=>console.error('RandoPal failed to start',error));\n`;
await writeFile(path.join(nativeAssets,'src','bundle.js'),bundle);
let nativeHtml=await readFile(path.join(nativeAssets,'index.html'),'utf8');
nativeHtml=nativeHtml.replace('<script type="module" src="src/app.js?v=15"></script>','<script defer src="src/bundle.js"></script>');
await writeFile(path.join(nativeAssets,'index.html'),nativeHtml);
await zipFolder(native,path.join(out,'ios','RandoPal-iOS-Native-Source-v0.50.zip'));
console.log(`Built platform packages in ${out}`);
