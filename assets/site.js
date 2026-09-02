/* Wabi Sabi — menu tabs + light section reveals (desktop only). */
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

  var MOBILE = '(max-width: 860px), (pointer: coarse)';
  if (window.matchMedia(MOBILE).matches || !('IntersectionObserver' in window)) return;
  var els = document.querySelectorAll('section .wrap > *, .hero > div');
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
