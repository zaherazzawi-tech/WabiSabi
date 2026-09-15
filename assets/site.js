/* Wabi Sabi — menu tabs + hero scroll choreography (desktop) + reveals. */
(function () {
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (o) { o.setAttribute('aria-selected', o === t ? 'true' : 'false'); });
      document.querySelectorAll('.panel').forEach(function (p) {
        p.classList.toggle('on', p.id === t.dataset.panel);
      });
    });
  });

  var MOBILE = '(max-width: 860px), (max-height: 540px) and (pointer: coarse)';
  function isMobile() { return window.matchMedia(MOBILE).matches; }

  var HERO_SCROLL = 1500;
  var heroDone = false; /* the opening plays once per page load */
  function finishHero(sec) {
    heroDone = true;
    var clip = sec.querySelector('[data-ws-clip]');
    if (clip) clip.style.clipPath = 'none';
    var zoom = sec.querySelector('[data-ws-zoom]');
    if (zoom) zoom.style.transform = 'scale(1)';
    var plate = sec.querySelector('[data-ws-plate]');
    if (plate) { plate.style.opacity = '1'; plate.style.transform = 'none'; plate.style.pointerEvents = 'auto'; }
    var cue = sec.querySelector('[data-ws-cue]');
    if (cue) cue.style.opacity = '0';
    /* collapse the scroll track so scrolling back up doesn't replay it */
    var removed = sec.offsetHeight - window.innerHeight;
    sec.style.height = '100vh';
    window.scrollTo({ top: Math.max(0, window.scrollY - removed), behavior: 'instant' });
  }
  function syncHero() {
    if (isMobile() || heroDone) return; /* mobile hero is fully static via CSS */
    var sec = document.querySelector('[data-ws-hero]');
    if (!sec) return;
    var p = Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / HERO_SCROLL));
    if (p >= 1) { finishHero(sec); return; }
    var clip = sec.querySelector('[data-ws-clip]');
    if (clip) {
      var a = (25 * (1 - p)).toFixed(2), b = (75 + 25 * p).toFixed(2);
      clip.style.clipPath = 'polygon(' + a + '% ' + a + '%, ' + b + '% ' + a + '%, ' + b + '% ' + b + '%, ' + a + '% ' + b + '%)';
    }
    var zoom = sec.querySelector('[data-ws-zoom]');
    if (zoom) zoom.style.transform = 'scale(' + (1.45 - 0.45 * p).toFixed(4) + ')';
    var f = Math.min(1, Math.max(0, (p - 0.5) / 0.34));
    var plate = sec.querySelector('[data-ws-plate]');
    if (plate) {
      plate.style.opacity = f.toFixed(3);
      plate.style.transform = 'translateY(' + (22 * (1 - f)).toFixed(1) + 'px)';
      plate.style.pointerEvents = f > 0.6 ? 'auto' : 'none';
    }
    var cue = sec.querySelector('[data-ws-cue]');
    if (cue) cue.style.opacity = (1 - Math.min(1, p / 0.2)).toFixed(3);
  }
  function loop() { syncHero(); requestAnimationFrame(loop); }
  loop();
  window.addEventListener('resize', syncHero);

  if (isMobile() || !('IntersectionObserver' in window)) return;
  var els = document.querySelectorAll('section .wrap > *');
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.style.opacity = '1'; e.target.style.transform = 'none';
      io.unobserve(e.target);
    });
  }, { threshold: 0.08 });
  els.forEach(function (el) {
    el.style.opacity = '0'; el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1)';
    io.observe(el);
  });
})();
