# 스토어용 휴대전화 스크린샷을 만든다. 실행: npm run build && python3 scripts/make-screenshots.py (playwright 필요)
#   인자 없음: 안드로이드용 1080x1920 -> store/screenshots
#   ios      : 애플 아이폰용 1206x2622(App Store Connect의 Dynamic Island 지원 iPhone 칸) -> store/ios-screenshots
import asyncio, os, shutil, sys
#   뒤에 en 을 붙이면 영어 화면: python3 scripts/make-screenshots.py ios en -> store/ios-screenshots-en, python3 scripts/make-screenshots.py android en -> store/screenshots-en
IOS = len(sys.argv) > 1 and sys.argv[1] == 'ios'
ENG = 'en' in sys.argv[1:]
W, H, OUT = (402, 874, 'store/ios-screenshots') if IOS else (360, 640, 'store/screenshots')
OUT += '-en/' if ENG else '/'
os.makedirs(OUT, exist_ok=True)
from playwright.async_api import async_playwright
CHROME = shutil.which('google-chrome') or shutil.which('chromium')
URL = 'file://' + os.path.abspath('dist/index.html') + ('?lang=en' if 'en' in sys.argv[1:] else '?lang=ko')
FACE_JS = r'''
(P) => {
  /* 얼굴 사진이나 그림 없이, 어두운 바탕에 측정 윤곽선만 보이게 한다 */
  const c = document.createElement('canvas'); c.width = 1000; c.height = 1000; const x = c.getContext('2d');
  const g = x.createRadialGradient(500, 520, 60, 500, 520, 620); g.addColorStop(0, '#2f3560'); g.addColorStop(1, '#161a33'); x.fillStyle = g; x.fillRect(0, 0, 1000, 1000);
  FaceRead.show(P.map(q => ({ x: q[0], y: q[1] })), c);
}
'''
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=CHROME, args=['--no-sandbox'])
        pg = await b.new_page(viewport={'width': W, 'height': H}, device_scale_factor=3)
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(URL); await pg.wait_for_timeout(800)
        await pg.evaluate("$('guideDlg').close(); S.user={name:EN?'Skye':'김하늘',gender:'F',cal:'solar',y:1990,m:5,d:15,si:3}; S.partner={name:EN?'Daniel':'이도윤',gender:'M',cal:'solar',y:1988,m:8,d:23,si:7}; if(EN){withPlace(S.user,'Los Angeles','07:40',false); withPlace(S.partner,'Chicago','15:20',false);} Access.add('s:'+profileKey(S.user)); Access.add('m:'+pairKey()); S.streak=1; shuffle(); renderAll(); document.querySelector('canvas.fx').remove()")
        await pg.evaluate("$('langBtn').hidden = true")
        if IOS: await pg.evaluate("$('codeBtn').hidden = true")   # 아이폰 앱에는 열람 코드 단추가 없다
        async def shot(name, sel=None, dy=0):
            if sel: await pg.evaluate("(a)=>{const e=document.querySelector(a[0]);window.scrollTo(0,e.getBoundingClientRect().top+scrollY-56+a[1])}", [sel, dy])
            else: await pg.evaluate("scrollTo(0,0)")
            await pg.wait_for_timeout(250); await pg.screenshot(path=OUT + name + '.png')
        await shot('1-saju')
        await shot('2-yuksin', '#s-yuk')
        await shot('3-year', '#s-pick')
        await shot('4-graph', '#s-graph')
        await pg.click('nav a[data-v=tarot]'); await pg.wait_for_timeout(200)
        for k in (0, 1, 2): await pg.click(f'[data-t3="{k}"]'); await pg.wait_for_timeout(500)
        await pg.wait_for_timeout(500); await shot('5-tarot', '#v-tarot h2', -12)
        await pg.click('nav a[data-v=match]'); await pg.wait_for_timeout(300); await shot('6-match', '.hero.match', -10)
        FACE = [[285,448],[289,505],[297,558],[307,608],[325,661],[353,705],[387,735],[431,768],[500,787],[569,768],[613,735],[647,705],[675,661],[693,608],[703,558],[711,505],[715,448],[327,399],[352,385],[386,380],[417,384],[446,394],[554,394],[583,384],[614,380],[648,385],[673,399],[500,448],[500,487],[500,525],[500,558],[460,570],[478,577],[500,582],[522,577],[540,570],[369,440],[388,430],[416,429],[441,444],[418,450],[389,450],[559,444],[584,429],[612,430],[631,440],[611,450],[582,450],[421,643],[448,618],[483,613],[500,617],[517,613],[552,618],[579,643],[549,656],[525,668],[500,672],[475,668],[451,656],[426,643],[475,642],[500,642],[525,642],[574,643],[523,642],[500,642],[477,642]]
        await pg.click('nav a[data-v=face]'); await pg.wait_for_timeout(300)
        await pg.evaluate(FACE_JS, FACE); await pg.wait_for_timeout(1800)
        await shot('7-face', '#fStage', -52)
        await shot('8-face-parts', '#v-face .lock', 4)
        await pg.click('nav a[data-v=astro]'); await pg.wait_for_timeout(400); await shot('9-astro', '#v-astro h2', -12)
        await pg.click('nav a[data-v=saju]'); await pg.wait_for_timeout(300); await shot('10-doc', '#s-doc', -260)
        print('errors', errs); await b.close()
asyncio.run(main())
