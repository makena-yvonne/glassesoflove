/**
 * Simple horizontal slider for upcoming event flyers (one track, prev/next + dots).
 */
(function () {
  var root = document.querySelector('[data-event-slider]');
  if (!root) return;

  var track = root.querySelector('.event-slider-track');
  var slides = track ? track.querySelectorAll('.event-slider-slide') : [];
  var prevBtn = root.querySelector('.event-slider-prev');
  var nextBtn = root.querySelector('.event-slider-next');
  var dotsWrap = root.querySelector('.event-slider-dots');

  if (!track || slides.length === 0) return;

  var total = slides.length;
  var index = 0;

  function go(i) {
    index = ((i % total) + total) % total;
    track.style.transform = 'translateX(-' + index * 100 + '%)';
    slides.forEach(function (slide, j) {
      slide.setAttribute('aria-hidden', j === index ? 'false' : 'true');
    });
    if (dotsWrap) {
      dotsWrap.querySelectorAll('.event-slider-dot').forEach(function (dot, j) {
        dot.classList.toggle('is-active', j === index);
        dot.setAttribute('aria-current', j === index ? 'true' : 'false');
      });
    }
  }

  if (dotsWrap && dotsWrap.children.length === 0) {
    for (var d = 0; d < total; d++) {
      (function (j) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'event-slider-dot' + (j === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (j + 1) + ' of ' + total);
        dot.setAttribute('aria-current', j === 0 ? 'true' : 'false');
        dot.addEventListener('click', function () {
          go(j);
        });
        dotsWrap.appendChild(dot);
      })(d);
    }
  } else if (dotsWrap) {
    dotsWrap.querySelectorAll('.event-slider-dot').forEach(function (dot, j) {
      dot.addEventListener('click', function () {
        go(j);
      });
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      go(index - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      go(index + 1);
    });
  }

  slides.forEach(function (slide, j) {
    slide.setAttribute('aria-hidden', j === 0 ? 'false' : 'true');
  });
})();
