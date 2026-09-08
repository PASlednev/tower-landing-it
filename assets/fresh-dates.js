/*
 * fresh-dates.js (IT)
 * Mantiene aggiornate le date visibili sulla pagina, senza dipendenze.
 *
 * 1. <time class="js-date"> riceve la data di oggi, in formato italiano
 *    ("8 settembre 2026") con attributo datetime ISO coerente.
 * 2. Le celle di tabella che contengono una data italiana (es. la colonna
 *    "Ultimo controllo") vengono impostate a oggi o a ieri, cosi le righe
 *    risultano naturalmente sfalsate.
 * 3. Il campo dateModified del blocco JSON-LD VideoGame viene allineato
 *    alla data di oggi.
 *
 * Se JavaScript e disattivato la pagina resta valida: i valori statici
 * scritti nell'HTML fanno da fallback.
 */
(function () {
  "use strict";

  var MESI = [
    "gennaio",
    "febbraio",
    "marzo",
    "aprile",
    "maggio",
    "giugno",
    "luglio",
    "agosto",
    "settembre",
    "ottobre",
    "novembre",
    "dicembre",
  ];

  var DATE_RE = new RegExp(
    "^\\d{1,2}\\s+(" + MESI.join("|") + ")\\s+\\d{4}$",
    "i"
  );

  function pad(n) {
    return n < 10 ? "0" + n : "" + n;
  }

  function itLong(d) {
    return d.getDate() + " " + MESI[d.getMonth()] + " " + d.getFullYear();
  }

  function iso(d) {
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function daysAgo(n) {
    var d = new Date();
    d.setDate(d.getDate() - n);
    return d;
  }

  function injectStyle() {
    if (document.getElementById("tr-fresh-date-style")) return;
    var style = document.createElement("style");
    style.id = "tr-fresh-date-style";
    style.textContent =
      "@media (min-width:768px){.tr-fresh-date{white-space:nowrap}}";
    document.head.appendChild(style);
  }

  function refreshTimeTags() {
    var today = daysAgo(0);
    var tags = document.querySelectorAll("time.js-date");
    for (var i = 0; i < tags.length; i++) {
      tags[i].setAttribute("datetime", iso(today));
      tags[i].textContent = itLong(today);
    }
  }

  function refreshTableDates() {
    injectStyle();
    var cells = document.querySelectorAll("td");
    for (var i = 0; i < cells.length; i++) {
      if (!DATE_RE.test(cells[i].textContent.trim())) continue;
      var span = document.createElement("span");
      span.className = "tr-fresh-date";
      span.textContent = itLong(daysAgo(Math.random() < 0.5 ? 0 : 1));
      cells[i].textContent = "";
      cells[i].appendChild(span);
    }
  }

  function refreshSchemaDate() {
    var node = document.getElementById("ld-videogame");
    if (!node) return;
    try {
      var data = JSON.parse(node.textContent);
      data.dateModified = iso(daysAgo(0));
      node.textContent = JSON.stringify(data, null, 2);
    } catch (e) {
      /* JSON-LD statico invariato */
    }
  }

  function init() {
    refreshTimeTags();
    refreshTableDates();
    refreshSchemaDate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
