export function randomInt(max){
  if(!Number.isSafeInteger(max)||max<1)throw new RangeError('max must be positive');
  const limit=Math.floor(0x100000000/max)*max;
  const value=new Uint32Array(1);
  do{crypto.getRandomValues(value)}while(value[0]>=limit);
  return value[0]%max;
}
export function shuffle(items){
  const result=[...items];
  for(let i=result.length-1;i>0;i--){const j=randomInt(i+1);[result[i],result[j]]=[result[j],result[i]]}
  return result;
}
export function parseNames(text){return text.split(/[\n\r,，、;；\t]+/).map(x=>x.trim()).filter(Boolean)}
export function makeGroups(items,method,number){
  if(!items.length)return [];
  const n=Math.max(1,Math.min(items.length,Math.floor(Number(number)||1)));
  const count=method==='size'?Math.ceil(items.length/n):n;
  const groups=Array.from({length:count},()=>[]);
  shuffle(items).forEach((item,i)=>groups[i%count].push(item));
  return groups;
}
export function parseDelimited(text,delimiter=','){
  const rows=[];let row=[],field='',quoted=false;
  for(let i=0;i<text.length;i++){
    const ch=text[i];
    if(ch==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++}else quoted=!quoted}
    else if(ch===delimiter&&!quoted){row.push(field);field=''}
    else if((ch==='\n'||ch==='\r')&&!quoted){if(ch==='\r'&&text[i+1]==='\n')i++;row.push(field);rows.push(row);row=[];field=''}
    else field+=ch;
  }
  row.push(field);rows.push(row);
  return rows.filter(r=>r.some(x=>x.trim()));
}
export const parseCsv=text=>parseDelimited(text,',');
export function namesFromRows(rows){
  const first=rows.map(r=>String(r[0]??'').trim()).filter(Boolean);
  if(/^(name|names|姓名|名字|成員|學生姓名)$/i.test(first[0]||''))first.shift();
  return first;
}
export function makeRecordSet(table,hasHeader=true,locale='zh-Hant'){
  const nameLabel=locale==='en'?'Name':'姓名',columnLabel=i=>locale==='en'?`Column ${i}`:`欄位 ${i}`;
  const rows=table.filter(row=>row.some(value=>String(value??'').trim()));
  if(!rows.length)return {columns:[nameLabel],rows:[]};
  const width=Math.max(...rows.map(row=>row.length));
  if(width===1){const values=(hasHeader?rows.slice(1):rows).map(row=>String(row[0]??'').trim()).filter(Boolean);return {columns:[hasHeader?String(rows[0][0]??'').trim()||nameLabel:columnLabel(1)],rows:values.map(value=>[value])}}
  const rawHeaders=hasHeader?rows[0].map((value,i)=>String(value??'').trim()||columnLabel(i+1)):Array.from({length:width},(_,i)=>columnLabel(i+1));
  const columns=rawHeaders.map((header,i)=>rawHeaders.slice(0,i).includes(header)?`${header} ${i+1}`:header);
  return {columns,rows:(hasHeader?rows.slice(1):rows).map(row=>Array.from({length:columns.length},(_,i)=>String(row[i]??'').trim())).filter(row=>row.some(Boolean))};
}
export function serializeTsv(columns,rows){
  const quote=value=>{const s=String(value??'');return /[\t\r\n"]/.test(s)?`"${s.replaceAll('"','""')}"`:s};
  return [columns,...rows].map(row=>row.map(quote).join('\t')).join('\n');
}
export function formatRecord(row,columns,visible){return visible.map(i=>row[i]).filter(Boolean).join(' · ')||'—'}
