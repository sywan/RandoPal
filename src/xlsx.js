// Read simple XLSX worksheets locally. No scripts or network resources are loaded.
async function unzipEntries(buffer){
  const view=new DataView(buffer),bytes=new Uint8Array(buffer),files=new Map();
  let end=-1;
  for(let i=bytes.length-22;i>=Math.max(0,bytes.length-65557);i--){if(view.getUint32(i,true)===0x06054b50){end=i;break}}
  if(end<0)throw new Error('不是有效的 Excel .xlsx 檔案');
  let offset=view.getUint32(end+16,true),count=view.getUint16(end+10,true);
  for(let i=0;i<count;i++){
    if(view.getUint32(offset,true)!==0x02014b50)throw new Error('Excel 檔案結構不完整');
    const method=view.getUint16(offset+10,true),size=view.getUint32(offset+20,true),nameLen=view.getUint16(offset+28,true),extraLen=view.getUint16(offset+30,true),commentLen=view.getUint16(offset+32,true),local=view.getUint32(offset+42,true);
    const name=new TextDecoder().decode(bytes.slice(offset+46,offset+46+nameLen));
    const start=local+30+view.getUint16(local+26,true)+view.getUint16(local+28,true);
    const payload=bytes.slice(start,start+size);
    if(name.endsWith('.xml')||name.endsWith('.rels')){
      let decoded;
      if(method===0)decoded=payload;
      else if(method===8){const stream=new Blob([payload]).stream().pipeThrough(new DecompressionStream('deflate-raw'));decoded=new Uint8Array(await new Response(stream).arrayBuffer())}
      else throw new Error('不支援此 Excel 壓縮格式');
      files.set(name,new TextDecoder().decode(decoded));
    }
    offset+=46+nameLen+extraLen+commentLen;
  }
  return files;
}
function xml(text){const doc=new DOMParser().parseFromString(text,'application/xml');if(doc.querySelector('parsererror'))throw new Error('Excel XML 無法解析');return doc}
function elements(node,name){return [...node.getElementsByTagNameNS('*',name)]}
export async function namesFromXlsx(file){
  const files=await unzipEntries(await file.arrayBuffer());
  const shared=files.get('xl/sharedStrings.xml');
  const strings=shared?elements(xml(shared),'si').map(si=>elements(si,'t').map(t=>t.textContent).join('')):[];
  const book=files.get('xl/workbook.xml'),rels=files.get('xl/_rels/workbook.xml.rels');
  let sheetPath='xl/worksheets/sheet1.xml';
  if(book&&rels){
    const sheet=elements(xml(book),'sheet')[0];const id=sheet?.getAttribute('r:id')||sheet?.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships','id');
    const rel=elements(xml(rels),'Relationship').find(r=>r.getAttribute('Id')===id);
    if(rel){const target=rel.getAttribute('Target');sheetPath=target.startsWith('/')?target.slice(1):'xl/'+target.replace(/^\.\//,'')}
  }
  const sheet=files.get(sheetPath)||files.get('xl/worksheets/sheet1.xml');
  if(!sheet)throw new Error('找不到 Excel 工作表');
  const rows=elements(xml(sheet),'row').map(row=>{
    const values=[];
    for(const cell of elements(row,'c')){
      const letters=(cell.getAttribute('r')||'A').match(/^[A-Z]+/i)?.[0]||'A';
      let index=0;for(const letter of letters.toUpperCase())index=index*26+letter.charCodeAt(0)-64;index--;
      const type=cell.getAttribute('t'),value=elements(cell,'v')[0]?.textContent||'';
      values[index]=type==='s'?(strings[Number(value)]||''):type==='inlineStr'?elements(cell,'t').map(t=>t.textContent).join(''):value;
    }
    return values;
  });
  return rows;
}
