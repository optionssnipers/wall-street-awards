// usage: node render-title.js out.png   (writes a 2160x2700 PNG of title.html)
const { chromium } = require('playwright'); const path = require('path');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
await p.goto('file://'+path.join(__dirname,'title.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
await p.screenshot({path:process.argv[2]});await b.close();})();
