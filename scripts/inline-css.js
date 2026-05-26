#!/usr/bin/env node
// Substitui o bloco entre <!-- inline-css:start --> e <!-- inline-css:end -->
// pelos 3 CSS concatenados, em pt/index.html e en/index.html.

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const cssFiles = [
  'assets/css/style2.min.css',
  'assets/css/tailwind.min.css',
  'assets/css/theme.css',
];
const htmlFiles = ['pt/index.html', 'en/index.html'];

const inlineCss = cssFiles
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8').trim())
  .join('\n');

const startMarker = '<!-- inline-css:start -->';
const endMarker = '<!-- inline-css:end -->';
const replacement = `${startMarker}\n  <style>${inlineCss}</style>\n  ${endMarker}`;

for (const htmlFile of htmlFiles) {
  const filePath = path.join(root, htmlFile);
  const html = fs.readFileSync(filePath, 'utf8');
  const startIdx = html.indexOf(startMarker);
  const endIdx = html.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    console.error(`Markers nao encontrados em ${htmlFile}. Pule esse arquivo.`);
    process.exit(1);
  }

  const before = html.slice(0, startIdx);
  const after = html.slice(endIdx + endMarker.length);
  fs.writeFileSync(filePath, before + replacement + after);
  console.log(`Atualizado: ${htmlFile} (${inlineCss.length} bytes inline)`);
}
