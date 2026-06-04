// Google Analytics carregado apos a primeira interacao do usuario (evita peso no LCP).
(function () {
  var loaded = false;
  function loadGA() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=UA-144644601-1';
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', 'UA-144644601-1');
  }
  var events = ['scroll', 'mousemove', 'touchstart', 'keydown', 'click'];
  events.forEach(function (e) {
    window.addEventListener(e, loadGA, { once: true, passive: true });
  });
  setTimeout(loadGA, 8000);
})();
