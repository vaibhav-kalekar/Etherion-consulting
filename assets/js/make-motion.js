(function () {
  if (!document.body.classList.contains('make-theme')) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function reveal(el) {
    el.classList.add('is-in', 'in-view');
  }

  function observe(nodes, threshold) {
    var list = Array.prototype.slice.call(nodes);
    if (!list.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      list.forEach(reveal);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: threshold || 0.15 });
    list.forEach(function (el) { io.observe(el); });
  }

  document.querySelectorAll('.make-theme .value-card').forEach(function (el, i) {
    el.classList.add('anim-fade-up');
    if (i) el.classList.add('delay-' + (i * 100));
  });

  observe(document.querySelectorAll(
    '[data-reveal], .anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-fade-in, .anim-scale-in'
  ), 0.16);

  function parseCount(text) {
    var m = String(text).trim().match(/^(\d+)(.*)$/);
    if (!m) return null;
    return { target: parseInt(m[1], 10), suffix: m[2] || '' };
  }

  function countUp(el, target, suffix, duration) {
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var pct = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - pct, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (pct < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function watchCounts(nodes) {
    var list = Array.prototype.slice.call(nodes).filter(function (el) {
      return el.getAttribute('data-count') || parseCount(el.textContent);
    });
    if (!list.length) return;
    function run(el) {
      if (el.getAttribute('data-counted')) return;
      el.setAttribute('data-counted', '1');
      var target = el.getAttribute('data-count');
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = parseInt(el.getAttribute('data-duration') || '1600', 10);
      if (target == null) {
        var parsed = parseCount(el.textContent);
        if (!parsed) return;
        target = parsed.target;
        suffix = parsed.suffix;
      }
      target = parseInt(target, 10);
      if (target > 100 && !el.getAttribute('data-duration')) duration = 2200;
      if (reduce) {
        el.textContent = target + suffix;
        return;
      }
      el.textContent = '0' + suffix;
      countUp(el, target, suffix, duration);
    }
    if (reduce || !('IntersectionObserver' in window)) {
      list.forEach(run);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.3 });
    list.forEach(function (el) { io.observe(el); });
  }

  watchCounts(document.querySelectorAll('.make-stat-value, .make-theme .stat-card > div:first-child'));

  var hero = document.querySelector('.make-hero');
  var layer = document.querySelector('[data-parallax]');
  if (hero && !reduce) {
    for (var i = 0; i < 18; i++) {
      var p = document.createElement('div');
      p.className = 'particle';
      p.style.left = (5 + (i * 5.3) % 90) + '%';
      p.style.bottom = ((i * 7.7) % 30) + '%';
      p.style.width = (2 + (i % 3)) + 'px';
      p.style.height = p.style.width;
      p.style.opacity = String(0.25 + (i % 4) * 0.1);
      p.style.setProperty('--dur', (7 + (i % 5)) + 's');
      p.style.setProperty('--delay', ((i * 0.6) % 6) + 's');
      p.style.setProperty('--dx', (-20 + (i * 9) % 40) + 'px');
      hero.appendChild(p);
    }
  }

  if (layer && !reduce) {
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        layer.style.transform = 'translateY(' + (window.scrollY * 0.28) + 'px)';
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function onHeader() {
    document.body.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onHeader, { passive: true });
  onHeader();

  function scrollToId(id) {
    var el = document.getElementById(id);
    if (!el) return false;
    var top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' });
    return true;
  }

  if (location.hash.length > 1) {
    requestAnimationFrame(function () { scrollToId(location.hash.slice(1)); });
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="#"]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || href === '#' || href.charAt(0) === '?') return;
    var parts = href.split('#');
    var hash = parts[1];
    if (!hash) return;
    var path = link.pathname || parts[0];
    if (path && path !== location.pathname) return;
    if (!scrollToId(hash)) return;
    e.preventDefault();
    if (history.pushState) history.pushState(null, '', '#' + hash);
    var toggle = document.getElementById('nav-toggle');
    if (toggle) {
      toggle.checked = false;
      document.body.style.overflow = '';
    }
  });

  (function initIndustries() {
    var root = document.querySelector('[data-ind-root]');
    var mobile = document.querySelector('[data-ind-mobile]');
    if (!root) return;

    var cols = Array.prototype.slice.call(root.querySelectorAll('.make-ind-col'));
    var accs = mobile ? Array.prototype.slice.call(mobile.querySelectorAll('.make-ind-acc')) : [];
    var idx = 0;
    var timer = null;
    var hovered = false;
    var hold = null;
    var desktop = window.matchMedia('(min-width: 1024px)');

    function setActive(id, fromUser) {
      cols.forEach(function (col, i) {
        var on = col.getAttribute('data-ind') === id;
        col.classList.toggle('is-active', on);
        col.setAttribute('aria-pressed', on ? 'true' : 'false');
        if (on) idx = i;
      });
      accs.forEach(function (acc) {
        var on = acc.getAttribute('data-ind') === id;
        acc.classList.toggle('is-active', on);
        var btn = acc.querySelector('.make-ind-acc-btn');
        if (btn) btn.setAttribute('aria-expanded', on ? 'true' : 'false');
      });
      if (fromUser) {
        stop();
        if (hold) clearTimeout(hold);
        hold = setTimeout(start, 10000);
      }
    }

    function next() {
      if (hovered) return;
      idx = (idx + 1) % cols.length;
      setActive(cols[idx].getAttribute('data-ind'));
    }

    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      stop();
      if (reduce || !desktop.matches) return;
      timer = setInterval(next, 4500);
    }

    cols.forEach(function (col) {
      col.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        setActive(col.getAttribute('data-ind'), true);
      });
      col.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        setActive(col.getAttribute('data-ind'), true);
      });
    });

    accs.forEach(function (acc) {
      var btn = acc.querySelector('.make-ind-acc-btn');
      if (!btn) return;
      btn.addEventListener('click', function () {
        setActive(acc.getAttribute('data-ind'), true);
      });
    });

    root.addEventListener('mouseenter', function () { hovered = true; });
    root.addEventListener('mouseleave', function () { hovered = false; });
    desktop.addEventListener('change', function () {
      if (desktop.matches) start();
      else stop();
    });

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) start();
          else stop();
        });
      }, { threshold: 0.28 });
      io.observe(root);
    } else {
      start();
    }
  })();
})();
