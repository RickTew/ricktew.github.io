// ricktew.com — nav + carousel behavior
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  document.querySelectorAll('.carousel').forEach(function (car) {
    var slides = car.querySelectorAll('.slide');
    if (!slides.length) return;
    var dotsBox = car.querySelector('.dots');
    var idx = 0;
    var dots = [];
    slides.forEach(function (_, i) {
      var d = document.createElement('button');
      d.setAttribute('aria-label', 'Slide ' + (i + 1));
      d.addEventListener('click', function () { show(i); });
      dotsBox.appendChild(d);
      dots.push(d);
    });
    function show(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach(function (s, j) { s.classList.toggle('active', j === idx); });
      dots.forEach(function (d, j) { d.classList.toggle('active', j === idx); });
    }
    car.querySelector('.c-prev').addEventListener('click', function () { show(idx - 1); });
    car.querySelector('.c-next').addEventListener('click', function () { show(idx + 1); });
    show(0);
  });
});
