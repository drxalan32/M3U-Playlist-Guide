(function () {
  "use strict";
  var MEASUREMENT_ID = "G-4MG610MKFM";
  var STORAGE_KEY = "iptv_guide_analytics_consent";
  var analyticsReady = false;

  function loadAnalytics() {
    if (analyticsReady) return;
    analyticsReady = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID, { send_page_view: false });
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
    document.head.appendChild(script);
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }

  function saveChoice(choice) {
    try { localStorage.setItem(STORAGE_KEY, choice); } catch (e) {}
    if (choice === "accepted") loadAnalytics();
    renderBanner();
  }

  function renderBanner() {
    var existing = document.getElementById("analytics-consent-banner");
    if (existing) existing.remove();
    var choice = null;
    try { choice = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (choice === "accepted" || choice === "rejected") return;

    var banner = document.createElement("section");
    banner.id = "analytics-consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Analytics cookie preferences");
    banner.innerHTML =
      '<div class="analytics-consent-copy"><strong>Privacy preferences</strong>' +
      '<p>We use optional Google Analytics to understand how visitors use this guide and which pages lead to external links. Analytics stays off unless you allow it. <a href="' + (location.pathname.indexOf("/guides/") === 0 ? "../privacy.html" : location.pathname.indexOf("/kemo-tv/") === 0 ? "../privacy.html" : "privacy.html") + '">Read our privacy policy</a>.</p></div>' +
      '<div class="analytics-consent-actions"><button type="button" id="analytics-reject">Reject optional analytics</button><button type="button" id="analytics-accept">Allow analytics</button></div>';
    document.body.appendChild(banner);
    document.getElementById("analytics-reject").addEventListener("click", function () { saveChoice("rejected"); });
    document.getElementById("analytics-accept").addEventListener("click", function () { saveChoice("accepted"); });
  }

  function addManageLink() {
    if (document.getElementById("analytics-manage-link")) return;
    var link = document.createElement("button");
    link.id = "analytics-manage-link";
    link.type = "button";
    link.textContent = "Cookie preferences";
    link.addEventListener("click", function () {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      renderBanner();
    });
    document.body.appendChild(link);
  }

  document.addEventListener("click", function (event) {
    var anchor = event.target && event.target.closest ? event.target.closest("a[href]") : null;
    if (!anchor) return;
    var url;
    try { url = new URL(anchor.href, window.location.href); } catch (e) { return; }
    if (url.hostname !== "kemoiptv.digital" && url.hostname !== "www.kemoiptv.digital") return;
    var consent = null;
    try { consent = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (consent !== "accepted" || typeof window.gtag !== "function") return;

    var position = anchor.closest("nav") ? "navigation" :
      anchor.classList.contains("cta") ? "cta" :
      anchor.closest("footer") ? "footer" : "in_content";
    var label = (anchor.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100);
    var destination = anchor.href;
    event.preventDefault();
    var navigated = false;
    function continueNavigation() {
      if (navigated) return;
      navigated = true;
      window.location.href = destination;
    }
    window.gtag("event", "outbound_kemo_click", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      link_url: destination,
      link_text: label,
      link_position: position,
      transport_type: "beacon",
      event_callback: continueNavigation,
      event_timeout: 800
    });
    window.setTimeout(continueNavigation, 900);
  });

  try {
    if (localStorage.getItem(STORAGE_KEY) === "accepted") loadAnalytics();
  } catch (e) {}
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { renderBanner(); addManageLink(); });
  } else {
    renderBanner(); addManageLink();
  }
})();