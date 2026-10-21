// usage: node render-story.js out.png  -> 1080x1920 full-bleed 9:16 IG story from cover.html
const { chromium } = require('playwright'); const path = require('path');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
await p.goto('file://'+path.join(__dirname,'cover.html'));await p.evaluate(()=>document.fonts.ready);
await p.addStyleTag({content:`
html,body{height:1920px;background:#05060d}
#bg{top:570px;height:1350px}
.shade{background:linear-gradient(180deg,rgba(7,7,10,.45) 0%,rgba(7,7,10,.1) 25%,rgba(7,7,10,.35) 60%,rgba(7,7,10,.94) 100%)}
.top{top:270px}
.logoWrap{top:400px}
.hl{top:880px}
.sub{top:1310px}
.swipe{display:none}
.foot{bottom:270px}
`});
await p.waitForTimeout(300);
await p.screenshot({path:process.argv[2]});await b.close();})();
