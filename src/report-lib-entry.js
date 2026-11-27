// 풀이 문서(PDF)를 만들 때만 불러오는 라이브러리. 용량이 커서 index.html에 넣지 않고 dist/report-lib.js로 따로 둔다.
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
window.ReportLib = { jsPDF, html2canvas };
