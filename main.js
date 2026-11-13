// このファイルは「動き」を担当します。HTMLとCSSだけでも表示はされます。
document.documentElement.classList.add('js');

// 1. スマホのメニューを開閉する
const menu = document.querySelector('.menu');
const nav = document.getElementById('nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', e => { if (e.target.tagName === 'A') { nav.classList.remove('open'); menu.setAttribute('aria-expanded', false); } });

// 2. トップのスライド（5秒ごとに切り替え。マウスを乗せると止まる）
const slider = document.querySelector('[data-slider]');
const slides = slider.querySelectorAll('.slide');
const dots = slider.querySelector('.dots');
let now = 0, timer;
slides.forEach((_, i) => {
  const b = document.createElement('button');
  b.setAttribute('aria-label', (i + 1) + '枚目を表示');
  b.addEventListener('click', () => { show(i); start(); });
  dots.appendChild(b);
});
function show(i) {
  slides[now].classList.remove('on'); dots.children[now].classList.remove('on');
  now = i;
  slides[now].classList.add('on'); dots.children[now].classList.add('on');
}
function start() { clearInterval(timer); timer = setInterval(() => show((now + 1) % slides.length), 5000); }
dots.children[0].classList.add('on');
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  start();
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', start);
}

// 3. 画面に入ったらふわっと表示する
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));