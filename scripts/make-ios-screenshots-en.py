# 애플 영어 현지화용 스크린샷(1206x2622). 앱 화면은 한국어 그대로 두고, 위에 영어 설명 문구만 얹는다.
# 먼저 python3 scripts/make-screenshots.py ios 로 store/ios-screenshots 를 만든 뒤 실행한다.
import os
from PIL import Image, ImageDraw, ImageFont
SERIF = '/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc'; SANS = '/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'
W, H, SRC, OUT = 1206, 2622, 'store/ios-screenshots/', 'store/ios-screenshots-en/'
os.makedirs(OUT, exist_ok=True)
CAP = [
  ('1-saju', 'Your Four Pillars', 'Korean saju astrology, read in plain words'),
  ('2-yuksin', 'The Ten Gods', 'See which energies shape your character'),
  ('3-year', 'Year by Year', 'Pick any year and follow its twelve months'),
  ('4-graph', 'Your Lifetime Graph', 'Ten-year luck cycles, peaks and cautions'),
  ('5-tarot', 'Tarot Meets Saju', 'A three-card spread read against your chart'),
  ('6-match', 'Compatibility', 'Outer, inner and daily-life match in nine parts'),
  ('7-face', 'Face Reading', 'Measured on your device. Photos are never saved'),
  ('8-face-parts', 'Feature by Feature', 'Your element type, strengths and what to change'),
]
big, small, tag = ImageFont.truetype(SERIF, 92), ImageFont.truetype(SANS, 44), ImageFont.truetype(SANS, 30)
for name, head, sub in CAP:
    im = Image.new('RGB', (W, H), '#0f1226'); d = ImageDraw.Draw(im)
    for y in range(H):   # 위에서 아래로 옅어지는 바탕
        t = y / H; d.line([(0, y), (W, y)], fill=(int(28 - 13 * t), int(32 - 14 * t), int(66 - 28 * t)))
    d.text((W / 2, 200), head, font=big, fill='#f2e3bd', anchor='mm')
    d.text((W / 2, 318), sub, font=small, fill='#b9bfdc', anchor='mm')
    assert d.textlength(head, font=big) < W - 80 and d.textlength(sub, font=small) < W - 80, name
    shot = Image.open(SRC + name + '.png').convert('RGB'); sw = 980; sh = round(shot.height * sw / shot.width)
    shot = shot.resize((sw, sh), Image.LANCZOS); x, y = (W - sw) // 2, 440; vis = H - y - 70
    shot = shot.crop((0, 0, sw, vis)); mask = Image.new('L', (sw, vis), 0); ImageDraw.Draw(mask).rounded_rectangle([0, 0, sw - 1, vis - 1], 54, fill=255)
    d.rounded_rectangle([x - 5, y - 5, x + sw + 4, y + vis + 4], 58, outline='#c9a85c', width=5)
    im.paste(shot, (x, y), mask)
    d.text((W / 2, H - 34), 'App interface is in Korean', font=tag, fill='#7f86a8', anchor='mm')
    im.save(OUT + name + '.png'); print(OUT + name + '.png', im.size)
