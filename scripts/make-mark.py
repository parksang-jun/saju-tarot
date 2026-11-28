# assets/mark.svg 를 투명 배경 PNG(assets/mark-1024.png)로 찍는다. 도장 가장자리의 거친 효과가 SVG 필터라 브라우저로 그린다.
import asyncio, shutil
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=shutil.which('google-chrome') or shutil.which('chromium'), args=['--no-sandbox'])
        pg = await b.new_page(viewport={'width': 1024, 'height': 1024})
        await pg.set_content("<body style='margin:0;background:transparent'>" + open('assets/mark.svg').read().replace('<svg ', '<svg width=1024 height=1024 '))
        await pg.screenshot(path='assets/mark-1024.png', omit_background=True); await b.close()
asyncio.run(main())
