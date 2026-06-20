const fs = require('fs');
const path = require('path');

const dir = 'c:\\Projects\\Bayonet';
const files = fs.readdirSync(dir);
const htmlFiles = files.filter(f => f.endsWith('.html'));

const toggleButtonHtml = `
          <button id="theme-toggle" class="p-2 rounded-lg hover:bg-dark-700 transition-colors mr-4" aria-label="Toggle theme">
            <svg id="theme-icon-dark" class="w-5 h-5 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            <svg id="theme-icon-light" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </button>
`;

const configFind = `dark: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a' }`;
const configReplace = `dark: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: 'var(--color-dark-700)', 800: 'var(--color-dark-800)', 900: 'var(--color-dark-900)' },
            gray: { 100: 'var(--color-gray-100)', 300: 'var(--color-gray-300)', 400: 'var(--color-gray-400)' }`;

// Theme init script to avoid FOUC
const initScript = `  <script>
    if (localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
      document.documentElement.classList.add('light-mode');
    }
  </script>
  <link rel="stylesheet" href="style.css">`;

htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 1. Update config
  content = content.replace(configFind, configReplace);
  
  // 2. Add Toggle Button before the Get Started button (or mobile menu btn)
  if (!content.includes('id="theme-toggle"')) {
    content = content.replace('<button id="mobile-menu-btn"', toggleButtonHtml + '          <button id="mobile-menu-btn"');
    content = content.replace('<a href="index.html#contact" class="hidden md:flex btn-primary text-sm">Get Started</a>', toggleButtonHtml + '          <a href="index.html#contact" class="hidden md:flex btn-primary text-sm">Get Started</a>');
    content = content.replace('<a href="#contact" class="hidden md:flex btn-primary text-sm">Get Started</a>', toggleButtonHtml + '          <a href="#contact" class="hidden md:flex btn-primary text-sm">Get Started</a>');
  }

  // 3. Fix Footer (keep it dark)
  content = content.replace('<footer class="bg-dark-900 text-white', '<footer class="bg-[#0f172a] text-white');
  
  // 4. Add init script in head to prevent FOUC
  if(!content.includes('localStorage.theme')) {
    content = content.replace('<link rel="stylesheet" href="style.css">', initScript);
  }

  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log("HTML files updated for theme toggle.");
