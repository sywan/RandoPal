#!/usr/bin/env node
import {mkdtempSync, mkdirSync, readdirSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

const root=resolve(import.meta.dirname,'..');
const out=join(root,'icons');
const work=mkdtempSync(join(tmpdir(),'randopal-guga-dance-'));
mkdirSync(out,{recursive:true});

function magick(...args){
  const result=spawnSync('magick',args,{stdio:'inherit'});
  if(result.status!==0)throw new Error(`ImageMagick failed: ${result.status}`);
}
function pose(name,source){
  // The existing mascot uses a fixed 1000 × 925 transparent canvas.
  magick(source,'-alpha','set','-trim','+repage','-resize','x788',
    '-background','none','-gravity','south','-extent','1000x925',
    join(work,`${name}.png`));
}

const source=join(root,'icons','guga-poses');
for(const name of ['front','wave-left','wave-mid-left','wave-right','wave-mid-right',
  'turn-quarter-right','turn-sixty-right','turn-side-right','turn-rear-quarter-right',
  'back','turn-rear-quarter-left','turn-side-left','turn-sixty-left','turn-quarter-left']){
  pose(name,join(source,`${name}.png`));
}
pose('step-wide',join(out,'guga-dance-poses','step-wide.png'));
pose('step-kick',join(out,'guga-dance-poses','step-kick.png'));

const count=150;
const turn=['front','turn-quarter-right','turn-sixty-right','turn-side-right',
  'turn-rear-quarter-right','back','turn-rear-quarter-left','turn-side-left',
  'turn-sixty-left','turn-quarter-left','front'];
function framePose(i){
  if(i<25){
    const wave=['front','wave-mid-left','wave-left','wave-mid-left','front',
      'wave-mid-right','wave-right','wave-mid-right','front'];
    return wave[Math.min(wave.length-1,Math.floor(i/3))];
  }
  if(i<50){
    const step=['front','step-wide','step-wide','front','step-kick','step-kick','front'];
    return step[Math.min(step.length-1,Math.floor((i-25)/4))];
  }
  if(i<100)return turn[Math.min(turn.length-1,Math.floor((i-50)/4.55))];
  if(i<125){
    const step=['front','step-kick','step-kick','front','step-wide','step-wide','front'];
    return step[Math.min(step.length-1,Math.floor((i-100)/4))];
  }
  const wave=['front','wave-mid-right','wave-right','wave-mid-right','front',
    'wave-mid-left','wave-left','wave-mid-left','front'];
  return wave[Math.min(wave.length-1,Math.floor((i-125)/3))];
}
function round(n){return Math.round(n);}
try{
  for(let i=0;i<count;i++){
    const t=i/count;
    const turnSection=i>=50&&i<100;
    const stepSection=i>=25&&i<50||i>=100&&i<125;
    const x=stepSection?round(36*Math.sin(2*Math.PI*(i%50)/25)):
      turnSection?round(10*Math.sin(2*Math.PI*(i-50)/50)):round(13*Math.sin(4*Math.PI*t));
    const y=round(-5-8*Math.sin(2*Math.PI*i/15)**2-(stepSection?7*Math.sin(2*Math.PI*i/10)**2:0));
    const angle=turnSection?1.2*Math.sin(2*Math.PI*(i-50)/10):
      2.3*Math.sin(6*Math.PI*t);
    const scale=100+1.5*Math.sin(2*Math.PI*i/15);
    const selected=join(work,`${framePose(i)}.png`);
    const output=join(work,`frame-${String(i).padStart(3,'0')}.png`);
    magick('-size','1000x925','xc:none','(',selected,'-background','none',
      '-rotate',angle.toFixed(2),'-resize',`${scale.toFixed(2)}%`,')',
      '-gravity','center','-geometry',`${x>=0?'+':''}${x}${y>=0?'+':''}${y}`,
      '-compose','over','-composite',output);
    if(i%25===0)process.stdout.write(`Rendered ${i}/${count} frames\n`);
  }
  const frames=readdirSync(work).filter(name=>/^frame-\d{3}\.png$/.test(name))
    .sort().map(name=>join(work,name));
  magick('-limit','memory','1GiB','-limit','map','2GiB','-dispose','Background',
    '-delay','8',...frames,'-loop','0',join(out,'guga-pal-hd.gif'));
  const webp=spawnSync('gif2webp',['-quiet','-lossy','-q','90','-m','4','-mt',
    join(out,'guga-pal-hd.gif'),'-o',join(out,'guga-pal-hd.webp')],{stdio:'inherit'});
  if(webp.status!==0)throw new Error(`gif2webp failed: ${webp.status}`);
  process.stdout.write(`Created ${join(out,'guga-pal-hd.gif')} and WebP (${count} frames)\n`);
}finally{
  rmSync(work,{recursive:true,force:true});
}
