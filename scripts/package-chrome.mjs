import {copyFile,mkdir,rm} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const run=promisify(execFile);
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const version='v0.55';
const output=path.join(root,'release',version,'chrome');
const extension=path.join(output,'extension');
const files=[
  'manifest.json','_locales/en/messages.json','_locales/zh_TW/messages.json',
  'index.html','styles.css','src/app.js','src/core.js','src/storage.js','src/xlsx.js','src/i18n.js',
  'icons/pal.svg','icons/icon-16.png','icons/icon-32.png','icons/icon-48.png','icons/icon-128.png',
  'icons/guga-pal-hd.webp','icons/guga-spin-hd.webp','icons/guga-pal-hd.gif','icons/guga-pal-hd.png'
];
await rm(extension,{recursive:true,force:true});
for(const file of files){
  const destination=path.join(extension,file);
  await mkdir(path.dirname(destination),{recursive:true});
  await copyFile(path.join(root,file),destination);
}
const zip=path.join(output,`RandoPal-chrome-${version}.zip`);
await rm(zip,{force:true});
await run('zip',['-q','-X','-r',zip,'.'],{cwd:extension});
console.log(`Built Chrome extension: ${zip}`);
