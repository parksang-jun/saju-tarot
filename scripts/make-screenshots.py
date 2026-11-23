# 스토어용 휴대전화 스크린샷(1080x1920)을 만든다. 실행: npm run build && python3 scripts/make-screenshots.py (playwright 필요)
import asyncio, os, shutil
from playwright.async_api import async_playwright
CHROME = shutil.which('google-chrome') or shutil.which('chromium')
URL = 'file://' + os.path.abspath('dist/index.html')
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=CHROME, args=['--no-sandbox'])
        pg = await b.new_page(viewport={'width': 360, 'height': 640}, device_scale_factor=3)
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(URL); await pg.wait_for_timeout(800)
        await pg.evaluate("$('guideDlg').close(); S.user={name:'김하늘',gender:'F',cal:'solar',y:1990,m:5,d:15,si:3}; S.partner={name:'이도윤',gender:'M',cal:'solar',y:1988,m:8,d:23,si:7}; Access.add('s:'+profileKey(S.user)); Access.add('m:'+pairKey()); S.streak=1; shuffle(); renderAll(); document.querySelector('canvas.fx').remove()")
        async def shot(name, sel=None, dy=0):
            if sel: await pg.evaluate("(a)=>{const e=document.querySelector(a[0]);window.scrollTo(0,e.getBoundingClientRect().top+scrollY-56+a[1])}", [sel, dy])
            else: await pg.evaluate("scrollTo(0,0)")
            await pg.wait_for_timeout(250); await pg.screenshot(path='store/screenshots/' + name + '.png')
        await shot('1-saju')
        await shot('2-yuksin', '#s-yuk')
        await shot('3-year', '#s-pick')
        await shot('4-graph', '#s-graph')
        await pg.click('nav a[data-v=tarot]'); await pg.click('[data-today]')
        for i in (1, 5, 9): await pg.click(f'[data-pick="{i}"]')
        for k in (0, 1, 2): await pg.click(f'[data-rev="{k}"]')
        await pg.wait_for_timeout(900); await shot('5-tarot', '.spread', -70)
        await pg.click('nav a[data-v=match]'); await pg.wait_for_timeout(300); await shot('6-match', '.hero.match', -10)
        print('errors', errs); await b.close()
asyncio.run(main())
