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

  function getPreferredTheme() {
    var savedTheme = getStoredTheme();
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return savedTheme || (prefersDark ? 'dark' : 'light');
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function updateThemeControl(themeSwitch, theme) {
    var themeLabel = themeSwitch.querySelector('.theme-switch__label');
    var themeIcon = themeSwitch.querySelector('.fa');
    var isDark = theme === 'dark';

    themeSwitch.setAttribute('aria-pressed', String(isDark));
    themeSwitch.setAttribute('aria-label', isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro');

    if (themeLabel) {
      themeLabel.textContent = isDark ? 'Tema claro' : 'Tema escuro';
    }

    if (themeIcon) {
      themeIcon.className = isDark ? 'fa fa-sun-o' : 'fa fa-moon-o';
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

  setTheme(getPreferredTheme());

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSwitch);
  } else {
    initThemeSwitch();
  }
})();
