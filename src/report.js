/* ===== 풀이 문서(PDF) =====
   이 사주를 연 사람에게 사주와 관상 풀이를 문서 한 권으로 만들어 준다. 문서는 기기 안에서 만든다(서버로 보내지 않는다).
   앱에서는 공유 창이 떠서 파일로 저장하거나 메일·메신저로 보낼 수 있고, 웹 미리보기에서는 바로 내려받는다.
   방법: 화면에 이미 그려진 풀이를 밝은 종이 색으로 복사해 구역마다 그림으로 바꾸고, 글줄이 잘리지 않게 항목 경계에서 쪽을 나눈다. */
const Report = {
  busy: false,
  lib() { return window.ReportLib ? Promise.resolve() : new Promise((ok, no) => { const s = document.createElement('script'); s.src = 'report-lib.js'; s.onload = ok; s.onerror = () => no(new Error('lib')); document.head.appendChild(s); }); },
  /* 화면의 풀이를 문서용으로 복사한다 */
  units(view) {
    const out = [], skip = el => el.id === 'fortune' || el.id === 's-doc' || el.classList.contains('chips') || el.classList.contains('ftips') || el.classList.contains('jump') || el.matches('p.note.warn');
    const unit = el => el.classList.contains('block') || el.classList.contains('hero') || el.classList.contains('panel') || el.tagName === 'CANVAS' || el.tagName === 'DETAILS' || !el.querySelector('.block');
    const walk = node => [...node.children].forEach(el => {
      if (skip(el)) return;
      if (!unit(el)) return walk(el);                                                       // 구역을 감싼 틀은 안으로 들어간다
      if (el.querySelector('#deepGo, #aiGo, #matchGo, input[type=file], [data-ad], [data-astro-ad]')) return;   // AI 단추, 사진 올리기, 광고 배너 구역은 뺀다
      out.push(el);
    });
    walk(view); return out;
  },
  build() {
    const u = S.user, root = document.createElement('div'); root.className = 'report'; root.id = 'reportRoot';
    const add = (html, cls) => { const d = document.createElement('div'); d.className = 'rblock' + (cls ? ' ' + cls : ''); if (typeof html === 'string') d.innerHTML = html; else d.appendChild(html); root.appendChild(d); return d; };
    const d = new Date(), face = window.FaceRead && FaceRead.state.res && S.premium;
    add('<h1>' + T('등불사주', 'Deungbul Saju') + '</h1><p>' + T('명리학과 관상으로 길을 밝히다', 'Light for your path, from saju and face reading') + '</p><h2>' + esc(u.name || T('이름 없음', 'No name')) + '</h2><p>' + $('who').textContent.replace(/열람 중|Unlocked/g, '').trim() + '</p><p>' + T(d.getFullYear() + '년 ' + (d.getMonth() + 1) + '월 ' + d.getDate() + '일 작성', 'Prepared ' + d.toISOString().slice(0, 10)) + '</p><p>' + T('사주 풀이' + (face ? '와 관상 풀이' : ''), 'Saju reading' + (face ? ' and face reading' : '')) + '</p>', 'rcover').dataset.page = '1';
    const copy = (view, title) => {
      add('<h2 class="rsec">' + title + '</h2>').dataset.page = '1';
      this.units(view).forEach(el => {
        let c;
        if (el.tagName === 'CANVAS') { c = new Image(); c.className = 'rface'; try { c.src = el.toDataURL('image/jpeg', .9); } catch (e) { return; } }
        else c = el.cloneNode(true);
        if (c.querySelectorAll) {
          c.querySelectorAll('button, select, .gq, .tier, .yearpick, .badge, .lock-cta, script').forEach(x => x.remove());
          c.querySelectorAll('details').forEach(x => { x.open = true; });
          const src = el.querySelectorAll('canvas'); c.querySelectorAll('canvas').forEach((x, i) => { const im = new Image(); im.className = 'rface'; try { im.src = src[i].toDataURL('image/jpeg', .9); x.replaceWith(im); } catch (e) { x.remove(); } });
          c.querySelectorAll('[id]').forEach(x => x.removeAttribute('id')); c.querySelectorAll('[data-count]').forEach(x => { x.textContent = x.dataset.count; });
        }
        if (c.tagName === 'DETAILS') c.open = true;
        c.removeAttribute && c.removeAttribute('id'); add(c);
      });
    };
    copy($('v-saju'), T('사주 풀이', 'Saju reading'));
    if (face) copy($('v-face'), T('관상 풀이', 'Face reading'));
    add('<p class="note">' + T('이 문서의 사주·관상 풀이와 점수는 오락·참고용입니다. 건강, 법률, 투자 등 중요한 결정의 근거로 쓰지 마세요.', 'The readings and scores in this document are for entertainment and reference only. Do not use them as a basis for health, legal or investment decisions.') + '</p>');
    document.body.appendChild(root); return root;
  },
  /* 구역 안에서 쪽을 나눠도 되는 높이(항목의 아래 끝)를 모은다 */
  cuts(block) {
    const top = block.getBoundingClientRect().top, ys = new Set();
    block.querySelectorAll('.it, .panel, .hero, tr, h3, p, .bar, .ykrow, li, img').forEach(el => ys.add(Math.round(el.getBoundingClientRect().bottom - top)));
    return [...ys].sort((a, b) => a - b);
  },
  async make(btn) {
    if (this.busy) return; this.busy = true;
    const say = t => { if (btn) btn.textContent = t; }, label = btn ? btn.textContent : '';
    let root;
    try {
      say(T('문서 도구를 불러오는 중', 'Loading the document tools')); await this.lib();
      const { jsPDF, html2canvas } = window.ReportLib, SC = 1.7, PW = 210, PH = 297, MX = 12, MT = 12, CW = PW - MX * 2, CH = PH - MT - 16;
      root = this.build(); await new Promise(r => setTimeout(r, 60));
      const blocks = [...root.children], pxmm = root.clientWidth / CW, pagePx = Math.floor(CH * pxmm);
      const pdf = new jsPDF({ unit: 'mm', format: 'a4', compress: true }); let y = 0, page = 1;   // y: 이 쪽에서 쓴 높이(px)
      const foot = () => { const c = document.createElement('canvas'); c.width = 1200; c.height = 40; const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, 1200, 40); x.fillStyle = '#8a8a94'; x.font = '22px sans-serif'; x.textAlign = 'center'; x.fillText(T('등불사주 · 오락·참고용', 'Deungbul Saju · for entertainment and reference') + ' · ' + page, 600, 28); pdf.addImage(c.toDataURL('image/png'), 'PNG', MX, PH - 12, CW, CW * 40 / 1200); };
      const next = () => { foot(); pdf.addPage(); page++; y = 0; };
      for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i]; say(T('문서를 만드는 중 ' + (i + 1) + ' / ' + blocks.length, 'Building the document ' + (i + 1) + ' / ' + blocks.length));
        if (b.dataset.page && y > 0 && !(i > 0 && blocks[i - 1].dataset.page && !blocks[i - 1].classList.contains('rcover'))) next();
        const H = b.offsetHeight; if (!H) continue;
        const cv = await html2canvas(b, { scale: SC, backgroundColor: '#ffffff', logging: false, useCORS: true });
        const cuts = this.cuts(b); let from = 0;
        while (from < H) {
          const room = pagePx - y; let to;
          if (H - from <= room) to = H;
          else { const ok = cuts.filter(c => c > from + 8 && c - from <= room); if (ok.length) to = ok[ok.length - 1]; else if (y > 0) { next(); continue; } else to = from + room; }
          const part = document.createElement('canvas'); part.width = cv.width; part.height = Math.max(1, Math.round((to - from) * SC));
          part.getContext('2d').drawImage(cv, 0, Math.round(from * SC), cv.width, part.height, 0, 0, cv.width, part.height);
          pdf.addImage(part.toDataURL('image/jpeg', .8), 'JPEG', MX, MT + y / pxmm, CW, (to - from) / pxmm);
          y += to - from; from = to; if (from < H) next();
        }
        if (b.classList.contains('rcover')) next();
      }
      foot();
      const name = (EN ? 'deungbul-saju-' : '등불사주-') + (S.user.name ? S.user.name.replace(/[^\w가-힣]/g, '') + '-' : '') + todayStr() + '.pdf';
      if (NATIVE && window.CapFilesystem && window.CapShare) {
        say(T('문서를 저장하는 중', 'Saving the document'));
        const f = await CapFilesystem.writeFile({ path: name, data: pdf.output('datauristring').split(',')[1], directory: 'CACHE' });
        await CapShare.share({ title: T('등불사주 풀이 문서', 'Deungbul Saju reading'), files: [f.uri], dialogTitle: T('문서를 저장하거나 보내기', 'Save or send the document') });
      } else pdf.save(name);
      Report.msg = T('문서를 만들었습니다(' + page + '쪽).', 'Document created (' + page + ' pages).');
    } catch (e) {
      Report.msg = e && /cancel/i.test(e.message || '') ? '' : T('문서를 만들지 못했습니다. 잠시 뒤 다시 눌러 주세요.', 'Could not create the document. Please try again in a moment.'); Report.err = e;
    }
    if (root) root.remove(); this.busy = false; say(label);
    const m = $('docMsg'); if (m) m.textContent = Report.msg || '';
  }
};
/* 사주 탭 맨 아래에 문서 받기 구역을 붙인다 */
function reportSlot() {
  const v = $('v-saju'); if (!v || $('s-doc')) return;
  const face = window.FaceRead && FaceRead.state.res;
  v.insertAdjacentHTML('beforeend', '<div class="block" id="s-doc"><h3>' + T('풀이 문서 받기', 'Get your reading as a document') + TIER.paid + '</h3><div class="panel block"><p>' + T('사주 풀이 전체' + (face ? '와 방금 본 관상 풀이' : '') + '를 PDF 문서 한 권으로 만들어 드립니다. 파일로 저장하거나 메일, 메신저로 보낼 수 있습니다.', 'Your full saju reading' + (face ? ' and the face reading you just did' : '') + ' in one PDF document. Save it as a file or send it by email or messenger.') + '</p>' +
    (S.premium ? '<button type="button" class="primary" id="docGo">' + T('PDF 문서 만들기', 'Create the PDF') + '</button>' : '<button type="button" class="goldbtn" id="docLock">' + T('이 사주를 열면 받을 수 있습니다', 'Available once you open this saju') + '</button>') +
    '<p class="note" id="docMsg" role="status"></p><p class="note">' + (face ? '' : T('관상을 함께 넣으려면 관상 탭에서 사진을 먼저 분석하세요. ', 'To include the face reading, analyze a photo in the Face tab first. ')) + T('문서는 이 기기 안에서 만들어지며 서버로 보내지 않습니다. 만드는 데 30초에서 1분쯤 걸립니다.', 'The document is created on this device and is not sent to any server. It takes about 30 seconds to a minute.') + '</p></div></div>');
}
const _renderSaju = renderSaju;
renderSaju = function () { _renderSaju(); reportSlot(); };
document.addEventListener('click', e => { const t = e.target.closest('#docGo, #docLock'); if (!t) return; if (t.id === 'docLock') return openPay('saju'); Report.make(t); });
window.addEventListener('hashchange', () => { if (location.hash === '#saju' || location.hash === '') { const d = $('s-doc'); if (d) { d.remove(); reportSlot(); } } });
