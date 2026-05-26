(function () {
  function getStoredTheme() {
    try {
      return localStorage.getItem('theme');
    } catch (error) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      return;
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function updateThemeControl(themeSwitch, theme) {
    var themeLabel = themeSwitch.querySelector('.theme-switch__label');
    var isDark = theme === 'dark';

    var labelLight = themeSwitch.getAttribute('data-label-light') || 'Tema claro';
    var labelDark = themeSwitch.getAttribute('data-label-dark') || 'Tema escuro';
    var ariaLight = themeSwitch.getAttribute('data-aria-light') || 'Alternar para tema claro';
    var ariaDark = themeSwitch.getAttribute('data-aria-dark') || 'Alternar para tema escuro';

    themeSwitch.setAttribute('aria-pressed', String(isDark));
    themeSwitch.setAttribute('aria-label', isDark ? ariaLight : ariaDark);

    if (themeLabel) {
      themeLabel.textContent = isDark ? labelLight : labelDark;
    }
  }

  function initThemeSwitch() {
    var themeSwitch = document.getElementById('theme-switch');

    if (!themeSwitch) {
      return;
    }

    updateThemeControl(themeSwitch, document.documentElement.getAttribute('data-theme'));

    themeSwitch.addEventListener('click', function () {
      var currentTheme = document.documentElement.getAttribute('data-theme');
      var nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

      setTheme(nextTheme);
      setStoredTheme(nextTheme);
      updateThemeControl(themeSwitch, nextTheme);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSwitch);
  } else {
    initThemeSwitch();
  }
})();
