(function () {
  var GA_ID = 'G-PWVYV9RWZ0';

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
