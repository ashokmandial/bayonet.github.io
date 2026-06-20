const fs = require('fs');
const path = require('path');
const dir = 'c:\\Projects\\Bayonet';
fs.readdirSync(dir).filter(f => f.endsWith('.html')).forEach(f => {
  let p = path.join(dir, f);
  let c = fs.readFileSync(p, 'utf-8');
  const toggleStr = '<button id="theme-toggle" class="p-2 rounded-lg hover:bg-dark-700 transition-colors mr-4" aria-label="Toggle theme">';
  
  if (c.split(toggleStr).length > 2) {
    // Keep only the first instance of the toggle button block
    const regex = /<button id="theme-toggle"[\s\S]*?<\/button>\s*<button id="theme-toggle"/;
    c = c.replace(regex, '<button id="theme-toggle"');
    fs.writeFileSync(p, c);
  }
});
console.log("Dups fixed");
