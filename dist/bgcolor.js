const theme = localStorage.getItem('unload_theme');

if (theme === 'THEME_DARK' && document.body) {
  document.body.style.backgroundColor = '#1c1c1c';
}
