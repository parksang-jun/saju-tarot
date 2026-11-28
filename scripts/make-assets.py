# 앱 아이콘, 스플래시, 스토어 그래픽을 만든다. 실행: python3 scripts/make-assets.py (Pillow와 Noto Serif CJK 글꼴 필요)
from PIL import Image, ImageDraw, ImageFont
import glob, os, sys
FONT = next((f for f in ['/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc', '/System/Library/Fonts/Supplemental/Songti.ttc', '/Library/Fonts/NotoSerifCJK-Bold.ttc'] if os.path.exists(f)), None)
if not FONT: sys.exit('한자 명조 글꼴을 찾지 못했습니다. FONT 경로를 고쳐 주세요.')
INK, SEAL, PAPER, GOLD = (23, 21, 19), (200, 51, 31), (255, 245, 233), (207, 169, 95)
RES = 'android/app/src/main/res'

MARK = Image.open('assets/mark-1024.png').convert('RGBA')   # 주홍 도장 + 붓글씨 "등불사주" (scripts/make-mark.py 로 만든다)
def seal(size, pad=0.0, rot=0):
    """투명 배경 위 도장 마크."""
    return MARK.resize((size, size), Image.LANCZOS)

def on_bg(size, inner, round_=False):
    bg = Image.new('RGBA', (size, size), INK + (255,)); s = seal(int(size * inner)); o = (size - s.width) // 2
    bg.alpha_composite(s, (o, o))
    if round_:
        mask = Image.new('L', (size * 4, size * 4), 0); ImageDraw.Draw(mask).ellipse([0, 0, size * 4, size * 4], fill=255)
        bg.putalpha(mask.resize((size, size), Image.LANCZOS))
    return bg

for dpi, n in {'mdpi': 48, 'hdpi': 72, 'xhdpi': 96, 'xxhdpi': 144, 'xxxhdpi': 192}.items():
    on_bg(n, 0.92).save(f'{RES}/mipmap-{dpi}/ic_launcher.png')
    on_bg(n, 0.74, True).save(f'{RES}/mipmap-{dpi}/ic_launcher_round.png')
    fg = Image.new('RGBA', (int(n * 2.25),) * 2, (0, 0, 0, 0)); s = seal(int(n * 2.25 * 0.6)); o = (fg.width - s.width) // 2
    fg.alpha_composite(s, (o, o)); fg.save(f'{RES}/mipmap-{dpi}/ic_launcher_foreground.png')   # 적응형 아이콘 안전 영역(가운데 66dp) 안에 배치
open(f'{RES}/values/ic_launcher_background.xml', 'w').write('<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#171513</color>\n</resources>\n')

for f in glob.glob(f'{RES}/drawable*/splash.png'):
    w, h = Image.open(f).size; im = Image.new('RGB', (w, h), INK); s = seal(int(min(w, h) * 0.28))
    im.paste(s, ((w - s.width) // 2, (h - s.height) // 2), s); im.save(f)

# iOS: 앱 아이콘(1024, 투명도 없음)과 스플래시
IOS = 'ios/App/App/Assets.xcassets'
if os.path.isdir(IOS):
    on_bg(1024, 0.92).convert('RGB').save(f'{IOS}/AppIcon.appiconset/AppIcon-512@2x.png')
    for f in glob.glob(f'{IOS}/Splash.imageset/*.png'):
        w, h = Image.open(f).size; im = Image.new('RGB', (w, h), INK); s = seal(int(min(w, h) * 0.2))
        im.paste(s, ((w - s.width) // 2, (h - s.height) // 2), s); im.save(f)

os.makedirs('store', exist_ok=True)
on_bg(512, 0.92).convert('RGB').save('store/icon-512.png')
fg = Image.new('RGB', (1024, 500), INK); d = ImageDraw.Draw(fg); s = seal(300); fg.paste(s, (50, 100), s)
kr = ImageFont.truetype(FONT, 120); sm = ImageFont.truetype(FONT, 40)
d.text((360, 130), '등불사주', font=kr, fill=PAPER); d.text((366, 292), '사주 · 관상 · 별자리로 길을 밝히다', font=sm, fill=GOLD)
fg.save('store/feature-1024x500.png')
print('아이콘, 스플래시, 스토어 그래픽 생성 완료')
