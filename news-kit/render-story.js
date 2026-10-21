// usage: node render-story.js <cover|title|news|cta> out.png [cta-variant] out.png  -> 1080x1920 full-bleed 9:16 IG story (no SWIPE tag, safe zones: top 250px / bottom 270px kept free of key content)
const { chromium } = require('playwright'); const path = require('path');
const kind = process.argv[2], out = process.argv[3];
const CSS = {
cover:`html,body{height:1920px;background:#05060d}#bg{top:570px;height:1350px}
.shade{background:linear-gradient(180deg,rgba(7,7,10,.45) 0%,rgba(7,7,10,.1) 25%,rgba(7,7,10,.35) 60%,rgba(7,7,10,.94) 100%)}
.top{top:270px}.logoWrap{top:400px}.hl{top:880px}.sub{top:1310px}.swipe{display:none}.foot{bottom:270px}`,
title:`html,body{height:1920px}body{padding-top:300px}.hl{margin-top:70px}.sub{margin-top:50px}.swipe{display:none}
.ticker{bottom:330px}.foot{bottom:296px}.bl,.br{bottom:24px}`,
cta:`html,body{height:1920px}body{padding-top:310px}.disc{bottom:346px}.foot{bottom:306px}`,
news:`html,body{height:1920px}body{padding-top:290px}h1{font-size:88px;margin-top:40px}.sub{margin-top:26px}.row{margin-top:44px}.what{margin-top:40px;font-size:31px}.box{margin-top:40px;padding:28px 32px}.box li{font-size:31px;gap:14px}.box ul{gap:16px}
.disc{bottom:346px}.foot{bottom:306px}`};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
await p.goto('file://'+path.join(__dirname,kind==='news'?'news.html':kind+'.html'));await p.evaluate(()=>document.fonts.ready);
if(kind==='cta')await p.evaluate(v=>window.setVariant(v),parseInt(process.argv[4]||'1'));
await p.addStyleTag({content:CSS[kind]});await p.waitForTimeout(300);
await p.screenshot({path:out});await b.close();})();
