// usage: node render-conv.js content.json outdir   -> CONV-xx_01.png ...
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');
(async()=>{const data=JSON.parse(fs.readFileSync(process.argv[2]));const out=process.argv[3];fs.mkdirSync(out,{recursive:true});
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:1});
await p.goto('file://'+path.join(__dirname,'conv.html'));await p.evaluate(()=>document.fonts.ready);
for(const c of data){for(let i=0;i<c.slides.length;i++){await p.evaluate(([d,i,n])=>window.render(d,i,n),[c.slides[i],i,c.slides.length]);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(80);
await p.screenshot({path:path.join(out,`${c.cid}_${String(i+1).padStart(2,'0')}.png`)});}}
await b.close();})();
