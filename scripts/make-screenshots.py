# 스토어용 휴대전화 스크린샷(1080x1920)을 만든다. 실행: npm run build && python3 scripts/make-screenshots.py (playwright 필요)
import asyncio, os, shutil
from playwright.async_api import async_playwright
CHROME = shutil.which('google-chrome') or shutil.which('chromium')
URL = 'file://' + os.path.abspath('dist/index.html')
FACE_JS = r'''
(P) => {
  /* 실제 인물 사진 대신 기준점에 맞춰 그린 그림 얼굴을 쓴다 */
  const c = document.createElement('canvas'); c.width = 1000; c.height = 1000; const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, 1000); g.addColorStop(0, '#d5dbd6'); g.addColorStop(1, '#a9b3ae'); x.fillStyle = g; x.fillRect(0, 0, 1000, 1000);
  const path = (pts, close) => { x.beginPath(); pts.forEach((q, i) => i ? x.lineTo(q[0], q[1]) : x.moveTo(q[0], q[1])); if (close) x.closePath(); };
  x.fillStyle = '#232a44'; x.beginPath(); x.moveTo(120, 1000); x.quadraticCurveTo(200, 830, 430, 800); x.lineTo(570, 800); x.quadraticCurveTo(800, 830, 880, 1000); x.fill();
  x.fillStyle = '#d9b091'; x.fillRect(425, 690, 150, 150);
  x.fillStyle = '#e3bb9b'; [[279, 470], [721, 470]].forEach(q => { x.beginPath(); x.ellipse(q[0], q[1], 20, 44, 0, 0, 7); x.fill(); });
  x.fillStyle = '#ecc8a8'; x.beginPath(); x.moveTo(P[0][0], P[0][1]); x.bezierCurveTo(270, 250, 380, 205, 500, 205); x.bezierCurveTo(620, 205, 730, 250, P[16][0], P[16][1]);
  for (let i = 15; i >= 0; i--) x.lineTo(P[i][0], P[i][1]); x.fill();
  x.fillStyle = '#26201d'; x.beginPath(); x.moveTo(268, 470); x.bezierCurveTo(230, 240, 380, 150, 500, 150); x.bezierCurveTo(620, 150, 770, 240, 732, 470);
  x.bezierCurveTo(720, 380, 690, 330, 640, 300); x.bezierCurveTo(560, 330, 420, 330, 350, 290); x.bezierCurveTo(310, 330, 282, 380, 268, 470); x.fill();
  x.fillStyle = 'rgba(214,120,110,.16)'; [[365, 560], [635, 560]].forEach(q => { x.beginPath(); x.ellipse(q[0], q[1], 46, 30, 0, 0, 7); x.fill(); });
  x.lineCap = 'round'; x.lineJoin = 'round'; x.strokeStyle = '#3a2d27'; x.lineWidth = 13; path(P.slice(17, 22)); x.stroke(); path(P.slice(22, 27)); x.stroke();
  [[36, 42], [42, 48]].forEach(([a, b]) => { const e = P.slice(a, b); x.fillStyle = '#fbf7f2'; path(e, true); x.fill();
    const cx = (e[0][0] + e[3][0]) / 2, cy = (e[1][1] + e[4][1]) / 2; x.save(); path(e, true); x.clip(); x.fillStyle = '#35261f'; x.beginPath(); x.arc(cx, cy, 10, 0, 7); x.fill(); x.restore();
    x.strokeStyle = '#3a2d27'; x.lineWidth = 4; path(e.slice(0, 4)); x.stroke(); });
  x.strokeStyle = '#c59877'; x.lineWidth = 4; x.beginPath(); x.moveTo(488, 462); x.quadraticCurveTo(476, 530, 470, 556); x.stroke(); path(P.slice(31, 36)); x.stroke();
  x.fillStyle = '#c8746c'; path(P.slice(48, 60), true); x.fill(); x.strokeStyle = '#96504a'; x.lineWidth = 3; path([P[48], P[60], P[62], P[64], P[54]]); x.stroke();
  FaceRead.show(P.map(q => ({ x: q[0], y: q[1] })), c);
}
'''
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
        FACE = [[285,448],[289,505],[297,558],[307,608],[325,661],[353,705],[387,735],[431,768],[500,787],[569,768],[613,735],[647,705],[675,661],[693,608],[703,558],[711,505],[715,448],[327,399],[352,385],[386,380],[417,384],[446,394],[554,394],[583,384],[614,380],[648,385],[673,399],[500,448],[500,487],[500,525],[500,558],[460,570],[478,577],[500,582],[522,577],[540,570],[369,440],[388,430],[416,429],[441,444],[418,450],[389,450],[559,444],[584,429],[612,430],[631,440],[611,450],[582,450],[421,643],[448,618],[483,613],[500,617],[517,613],[552,618],[579,643],[549,656],[525,668],[500,672],[475,668],[451,656],[426,643],[475,642],[500,642],[525,642],[574,643],[523,642],[500,642],[477,642]]
        await pg.click('nav a[data-v=face]'); await pg.wait_for_timeout(300)
        await pg.evaluate(FACE_JS, FACE); await pg.wait_for_timeout(1800)
        await shot('7-face', '#fStage', -52)
        await shot('8-face-parts', '#v-face .lock', 4)
        print('errors', errs); await b.close()
asyncio.run(main())
