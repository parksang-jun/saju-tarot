// src의 화면(head.html)과 스크립트를 순서대로 합쳐 dist/index.html 하나로 만든다.
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const ORDER = ['engine.js', 'app.js', 'deep.js', 'yuksin.js', 'match.js', 'pay.js', 'ui2.js', 'daily.js', 'gloss.js', 'face.js', 'boot.js'];
const read = f => readFileSync(new URL('../src/' + f, import.meta.url), 'utf8');

const vendor = await build({ entryPoints: ['src/vendor-entry.js'], bundle: true, format: 'iife', minify: true, write: false, target: 'es2020' });
const vendorJs = vendor.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const appJs = ORDER.map(read).join('\n');
new Function(appJs); // 문법 오류가 있으면 여기서 빌드가 멈춘다

const html = read('head.html') + '<script>\n' + vendorJs + '\n</script>\n<script>\n' + appJs + '\n</script>\n</body>\n</html>\n';
mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
writeFileSync(new URL('../dist/index.html', import.meta.url), html);
console.log('dist/index.html', (html.length / 1024).toFixed(0) + ' KB');

// 관상: 얼굴 인식 엔진과 모델은 용량이 커서 index.html에 넣지 않고 dist에 따로 둔다(관상 탭에서 사진을 처음 올릴 때만 불러온다)
import { copyFileSync as cpFace } from 'node:fs';
for (const f of ['face-api.js', 'face-models.js']) cpFace(new URL('../src/vendor/' + f, import.meta.url), new URL('../dist/' + f, import.meta.url));
