/* ===== 시작 ===== */
shuffle(); fillForm(); renderAll(); route(); celebrate();
Pay.init();
if (NATIVE && window.CapSystemBars) window.CapSystemBars.setStyle({ style: 'DARK' }).catch(() => {});   // 어두운 배경에 밝은 상태바 글자
