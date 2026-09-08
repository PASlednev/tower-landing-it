(function () {
  // Inserire qui il Measurement ID GA4 di QUESTO sito (formato G-XXXXXXXXXX).
  // Finche il valore resta il segnaposto, lo script non carica nulla:
  // nessuna richiesta a Google, nessun cookie di analytics.
  var GA_ID = 'G-XXXXXXXXXX';

  if (GA_ID.indexOf('G-') !== 0 || GA_ID === 'G-XXXXXXXXXX') return;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_ID);
})();
