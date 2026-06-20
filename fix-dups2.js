const fs = require('fs');
const path = require('path');
const dir = 'c:\\Projects\\Bayonet';

const toggleButtonHtml = `
          <button id="theme-toggle" class="p-2 rounded-lg hover:bg-dark-700 transition-colors mr-4" aria-label="Toggle theme">
            <svg id="theme-icon-dark" class="w-5 h-5 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            <svg id="theme-icon-light" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </button>
`;

fs.readdirSync(dir).filter(f => f.endsWith('.html')).forEach(f => {
  let p = path.join(dir, f);
  let c = fs.readFileSync(p, 'utf-8');
  
  // Remove ALL instances of the toggle button
  c = c.replace(/<button id="theme-toggle"[\s\S]*?<\/button>\s*/g, '');
  
  // Insert exactly one instance before mobile menu btn or Get Started
  if (c.includes('<button id="mobile-menu-btn"')) {
    c = c.replace('<button id="mobile-menu-btn"', toggleButtonHtml.trim() + '\n          <button id="mobile-menu-btn"');
  } else if (c.includes('<a href="#contact" class="hidden md:flex btn-primary text-sm">Get Started</a>')) {
    c = c.replace('<a href="#contact" class="hidden md:flex btn-primary text-sm">Get Started</a>', toggleButtonHtml.trim() + '\n          <a href="#contact" class="hidden md:flex btn-primary text-sm">Get Started</a>');
  }
  
  fs.writeFileSync(p, c);
});
console.log("Dups perfectly fixed");
