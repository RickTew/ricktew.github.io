/* The free visit counter (TEWBEDO, Rick 9 Nov 2026, "Our counter on every site").
   Once per page load it tells TEWBEDO's counter the page's path (never its query or hash),
   the hostname of the page that sent the visitor, the utm tags on the link, and whether it
   was a Google ad click (g, b or w, never the click id). The counter adds from Thailand or
   not and the kind of device. Nothing personal is sent; no cookie is set.
   Our own visits stay out: open any page once with ?own=1 on each of our own browsers and
   that browser is never counted again; ?own=0 undoes it. Automation is never counted. */
(function () {
  "use strict";
  var HOSTS = ["ricktew.com", "www.ricktew.com"]; // this site's two names, nothing else
  if (HOSTS.indexOf(location.hostname) < 0) return;
  if (navigator.webdriver) return;
  try {
    var own = /[?&]own=([01])(?:&|$)/.exec(location.search);
    if (own) {
      if (own[1] === "1") localStorage.setItem("tewbedo-own", "1");
      else localStorage.removeItem("tewbedo-own");
    }
    if (localStorage.getItem("tewbedo-own") === "1") return;
  } catch (e) {}
  var q = {};
  try { q = Object.fromEntries(new URLSearchParams(location.search)); } catch (e) {}
  var ref = "";
  try { ref = document.referrer ? new URL(document.referrer).hostname : ""; } catch (e) {}
  var report = {
    p: location.pathname,
    r: ref,
    us: q.utm_source || "",
    um: q.utm_medium || "",
    uc: q.utm_campaign || "",
    a: q.gclid ? "g" : q.gbraid ? "b" : q.wbraid ? "w" : ""
  };
  try {
    fetch("https://abwmdopzejdleaztjywa.supabase.co/functions/v1/site-seen", {
      method: "POST",
      mode: "cors",
      keepalive: true,
      body: JSON.stringify(report)
    }).catch(function () {});
  } catch (e) {}
})();
