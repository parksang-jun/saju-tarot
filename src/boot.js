/* ===== 시작 ===== */
shuffle(); fillForm(); renderAll(); route(); celebrate();
/* 언어 바꾸기 단추 */
(() => { const b = document.createElement('button'); b.className = 'ghost'; b.type = 'button'; b.id = 'langBtn'; b.textContent = EN ? '한국어' : 'English'; b.lang = EN ? 'ko' : 'en'; b.onclick = () => setLang(EN ? 'ko' : 'en'); $('codeBtn').insertAdjacentElement('afterend', b); b.hidden = !EN_READY; })();
Pay.init();
Ads.init();
if (NATIVE && window.CapSystemBars) window.CapSystemBars.setStyle({ style: 'DARK' }).catch(() => {});   // 어두운 배경에 밝은 상태바 글자
