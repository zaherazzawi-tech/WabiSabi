/* Wabi Sabi — scroll choreography & section reveals.
   Vanilla port of the original design-tool runtime. Desktop gets the
   opening-frame hero; phones get a static hero and no reveal fades. */
(function () {
  var MOBILE = "(max-width: 820px), (max-height: 540px) and (pointer: coarse)";
  var HERO_SCROLL = 1500; /* px of pinned hero scroll on desktop */

  function isMobile() { return window.matchMedia(MOBILE).matches; }

  /* motionLevel "calm" */
  document.documentElement.style.setProperty("--ws-motion", "1.7");

  function syncHero() {
    var sec = document.querySelector("[data-ws-hero]");
    if (!sec) return;

    if (isMobile()) {
      if (sec.dataset.wsStatic !== "1") {
        sec.dataset.wsStatic = "1";
        sec.dataset.wsH = "";
        sec.style.height = "100svh";
        var c = sec.querySelector("[data-ws-clip]");
        if (c) c.style.clipPath = "none";
        var z = sec.querySelector("[data-ws-zoom]");
        if (z) z.style.transform = "scale(1.06)";
        var pl = sec.querySelector("[data-ws-plate]");
        if (pl) { pl.style.opacity = "1"; pl.style.transform = "none"; pl.style.pointerEvents = "auto"; }
        var mk = sec.querySelector("[data-ws-mark]");
        if (mk) mk.style.opacity = "0";
        var cu = sec.querySelector("[data-ws-cue]");
        if (cu) cu.style.opacity = "0.55";
      }
      return;
    }
    if (sec.dataset.wsStatic === "1") { sec.dataset.wsStatic = ""; sec.dataset.wsH = ""; }

    if (sec.dataset.wsH !== String(HERO_SCROLL)) {
      sec.style.height = "calc(" + HERO_SCROLL + "px + 100vh)";
      sec.dataset.wsH = String(HERO_SCROLL);
    }
    var p = Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / HERO_SCROLL));
    var clip = sec.querySelector("[data-ws-clip]");
    if (clip) {
      var a = (25 * (1 - p)).toFixed(2);
      var b = (75 + 25 * p).toFixed(2);
      clip.style.clipPath = "polygon(" + a + "% " + a + "%, " + b + "% " + a + "%, " + b + "% " + b + "%, " + a + "% " + b + "%)";
    }
    var zoom = sec.querySelector("[data-ws-zoom]");
    if (zoom) zoom.style.transform = "scale(" + (1.45 - 0.45 * p).toFixed(4) + ")";

    var f = Math.min(1, Math.max(0, (p - 0.52) / 0.33));
    var plate = sec.querySelector("[data-ws-plate]");
    if (plate) {
      plate.style.opacity = f.toFixed(3);
      plate.style.transform = "translateY(" + (22 * (1 - f)).toFixed(1) + "px)";
      plate.style.pointerEvents = f > 0.6 ? "auto" : "none";
    }
    var mark = sec.querySelector("[data-ws-mark]");
    if (mark) mark.style.opacity = (f * 0.9).toFixed(3);
    var cue = sec.querySelector("[data-ws-cue]");
    if (cue) cue.style.opacity = (1 - Math.min(1, p / 0.22)).toFixed(3);
  }

  var io = null;
  function observeAll() {
    if (!io) return;
    var els = document.querySelectorAll("[data-reveal]:not([data-ws-seen])");
    var flat = isMobile();
    Array.prototype.forEach.call(els, function (el, i) {
      el.setAttribute("data-ws-seen", "1");
      if (flat) { el.style.opacity = "1"; el.style.transform = "none"; el.style.transition = "none"; return; }
      var d = (i % 4) * 0.08;
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity .95s cubic-bezier(.2,.7,.2,1) " + d + "s, transform .95s cubic-bezier(.2,.7,.2,1) " + d + "s";
      io.observe(el);
    });
  }

  function start() {
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.style.opacity = "1";
          e.target.style.transform = "none";
          io.unobserve(e.target);
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    }
    observeAll();
    setTimeout(observeAll, 900);
    function loop() { syncHero(); requestAnimationFrame(loop); }
    loop();
    window.addEventListener("scroll", syncHero, { passive: true, capture: true });
    window.addEventListener("resize", syncHero);
    setInterval(syncHero, 200);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
