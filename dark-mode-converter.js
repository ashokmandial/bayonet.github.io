const fs = require('fs');
const path = require('path');

const dir = 'c:\\Projects\\Bayonet';
const files = fs.readdirSync(dir);

const htmlFiles = files.filter(f => f.endsWith('.html'));

const htmlReplacements = [
  { from: /bg-white/g, to: 'bg-dark-900' },
  { from: /bg-gray-50/g, to: 'bg-dark-800' },
  { from: /text-dark-800/g, to: 'text-gray-100' },
  { from: /text-dark-900/g, to: 'text-white' },
  { from: /text-dark-600/g, to: 'text-gray-300' },
  { from: /text-dark-500/g, to: 'text-gray-400' },
  { from: /text-dark-700/g, to: 'text-gray-300' },
  { from: /border-gray-100/g, to: 'border-dark-700' },
  { from: /bg-gray-100/g, to: 'bg-dark-700' },
  { from: /bg-dark-900\/90/g, to: 'bg-dark-900/90' }, // Fix over-replacement
  { from: /style="background:#fff;color:#1d4ed8;box-shadow:0 4px 14px 0 rgba\(0,0,0,\.2\)"/g, to: '' },
  { from: /class="btn-primary bg-dark-900 text-primary-700 hover:bg-dark-800"/g, to: 'class="btn-primary"' }
];

htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  htmlReplacements.forEach(rep => {
    content = content.replace(rep.from, rep.to);
  });
  
  // Specific fix for cards that should stand out from the bg-dark-900 background
  content = content.replace(/card-hover bg-dark-900/g, 'card-hover bg-dark-800');
  
  fs.writeFileSync(filePath, content, 'utf-8');
});

// Update style.css
const cssPath = path.join(dir, 'style.css');
let cssContent = fs.readFileSync(cssPath, 'utf-8');
cssContent = cssContent.replace('color: var(--clr-dark-800);', 'color: #f1f5f9;');
cssContent = cssContent.replace('background: #ffffff;', 'background: var(--clr-dark-900);');
fs.writeFileSync(cssPath, cssContent, 'utf-8');

// Update script.js
const jsPath = path.join(dir, 'script.js');
let jsContent = fs.readFileSync(jsPath, 'utf-8');
jsContent = jsContent.replace(/rgba\(255,255,255,0\.97\)/g, 'rgba(15, 23, 42, 0.97)');
jsContent = jsContent.replace(/rgba\(255,255,255,0\.9\)/g, 'rgba(15, 23, 42, 0.9)');
fs.writeFileSync(jsPath, jsContent, 'utf-8');

console.log("Dark mode conversion complete!");
