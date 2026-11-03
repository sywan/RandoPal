import {build} from 'esbuild';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const dir=path.dirname(fileURLToPath(import.meta.url));
const result=await build({entryPoints:[path.join(dir,'App.jsx')],bundle:true,minify:true,format:'iife',platform:'browser',write:false,jsx:'automatic'});
const script=result.outputFiles[0].text.replaceAll('</script','<\\/script');
const template=await readFile(path.join(dir,'template.html'),'utf8');
await writeFile(path.join(dir,'..','deployment-guide.html'),template.replace('<!-- GUIDE_SCRIPT -->',`<script>${script}</script>`));
console.log('Built deployment-guide.html');
