#!/usr/bin/env node
// Gera os PDFs dos curriculos (PT e EN) a partir dos markdowns em cv/.
//
// - Sempre sobrescreve os PDFs "oficiais" (cv/<base>.pdf).
// - Ao final, pergunta se deve arquivar uma nova versao numerada em cv/versoes/.
//   Assim voce pode rodar varias vezes durante o ajuste (respondendo "nao") e,
//   quando estiver satisfeito, rodar uma ultima vez respondendo "sim" para
//   congelar a versao final.
//
// Uso: npm run pdf   (ou: node scripts/gerar-cv.js)

const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');
const markdownIt = require('markdown-it');
const puppeteer = require('puppeteer');

const ROOT = path.resolve(__dirname, '..');
const CV_DIR = path.join(ROOT, 'cv');
const VERSOES_DIR = path.join(CV_DIR, 'versoes');
const CSS_PATH = path.join(__dirname, 'cv.css');

// Os dois curriculos. "base" e o nome do arquivo sem extensao, usado para o
// markdown de entrada (cv/<base>.md), o PDF oficial (cv/<base>.pdf) e as versoes.
const CURRICULOS = [
  { base: 'Currículo Leandro Macedo', label: 'PT' },
  { base: 'Leandro Macedo Resume', label: 'EN' },
];

const PDF_OPTIONS = {
  format: 'A4',
  printBackground: true,
  margin: { top: '2.5cm', bottom: '2.5cm', left: '2cm', right: '2cm' },
};

function renderHtml(markdownPath, title, cssText) {
  const md = new markdownIt({ html: true });
  const body = md.render(fs.readFileSync(markdownPath, 'utf-8'));
  return `<!DOCTYPE html>
<html lang="pt-br">
<head><meta charset="UTF-8"><title>${title}</title><style>${cssText}</style></head>
<body>${body}</body>
</html>`;
}

async function gerarPdf(browser, html, pdfPath) {
  const tmpHtml = path.join(os.tmpdir(), `cv-${Date.now()}-${Math.round(process.hrtime()[1])}.html`);
  fs.writeFileSync(tmpHtml, html, 'utf-8');
  try {
    const page = await browser.newPage();
    await page.goto(`file://${tmpHtml}`, { waitUntil: 'networkidle0' });
    await page.pdf({ path: pdfPath, ...PDF_OPTIONS });
    await page.close();
  } finally {
    fs.rmSync(tmpHtml, { force: true });
  }
}

function proximaVersao() {
  // Maior N entre arquivos "<algo> - vN.pdf" em cv/versoes/, + 1.
  let max = 0;
  if (fs.existsSync(VERSOES_DIR)) {
    for (const f of fs.readdirSync(VERSOES_DIR)) {
      const m = f.match(/ - v(\d+)\.pdf$/i);
      if (m) max = Math.max(max, parseInt(m[1], 10));
    }
  }
  return max + 1;
}

function perguntar(texto) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(texto, (resp) => { rl.close(); resolve(resp); }));
}

async function main() {
  const cssText = fs.readFileSync(CSS_PATH, 'utf-8');
  const browser = await puppeteer.launch({ headless: true });
  const gerados = [];

  try {
    for (const cv of CURRICULOS) {
      const mdPath = path.join(CV_DIR, `${cv.base}.md`);
      const pdfPath = path.join(CV_DIR, `${cv.base}.pdf`);
      if (!fs.existsSync(mdPath)) {
        console.error(`✗ ${cv.label}: markdown não encontrado (${path.relative(ROOT, mdPath)})`);
        process.exitCode = 1;
        continue;
      }
      await gerarPdf(browser, renderHtml(mdPath, cv.base, cssText), pdfPath);
      gerados.push(cv);
      console.log(`✓ ${cv.label}: ${path.relative(ROOT, pdfPath)}`);
    }
  } finally {
    await browser.close();
  }

  if (gerados.length === 0) return;

  const resp = (await perguntar('\nArquivar nova versão em cv/versoes/? [s/N] ')).trim().toLowerCase();
  if (['s', 'sim', 'y', 'yes'].includes(resp)) {
    fs.mkdirSync(VERSOES_DIR, { recursive: true });
    const n = proximaVersao();
    for (const cv of gerados) {
      const dest = path.join(VERSOES_DIR, `${cv.base} - v${n}.pdf`);
      fs.copyFileSync(path.join(CV_DIR, `${cv.base}.pdf`), dest);
      console.log(`✓ versão: ${path.relative(ROOT, dest)}`);
    }
    console.log(`\nVersão v${n} arquivada.`);
  } else {
    console.log('Apenas os PDFs oficiais foram atualizados (nenhuma versão arquivada).');
  }
}

main().catch((err) => { console.error(err); process.exitCode = 1; });
