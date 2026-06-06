#!/usr/bin/env node
// Concatena os CSS-fonte em um unico assets/css/styles.css, linkado pelos HTML.
// Ordem importa: fontes -> reset (tailwind/preflight) -> design system (theme).

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const cssFiles = [
  'assets/css/fonts.css',
  'assets/css/tailwind.min.css',
  'assets/css/theme.css',
];

const bundle = cssFiles
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8').trim())
  .join('\n');

const outPath = path.join(root, 'assets/css/styles.css');
fs.writeFileSync(outPath, bundle + '\n');
console.log(`Gerado: assets/css/styles.css (${bundle.length} bytes)`);
