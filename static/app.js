// ── Slide navigation ────────────────────────────────────────
const slides = document.querySelectorAll('.slide');
const total  = slides.length;
let current  = 0;

const slideCounterEl = document.getElementById('slide-counter');
const prevBtnEl      = document.getElementById('btn-prev');
const nextBtnEl      = document.getElementById('btn-next');

const dotsEl = document.getElementById('progress-dots');
slides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.title = `Slide ${i + 1}`;
  d.setAttribute('aria-label', `Go to slide ${i + 1}`);
  d.onclick = () => goTo(i);
  dotsEl.appendChild(d);
});

function goTo(idx) {
  if (total === 0) return;

  slides[current].classList.remove('active');
  slides[current].inert = true;
  dotsEl.children[current].classList.remove('active');
  current = Math.max(0, Math.min(idx, total - 1));
  slides[current].classList.add('active');
  slides[current].inert = false;
  dotsEl.children[current].classList.add('active');
  slideCounterEl.textContent = `${current + 1} / ${total}`;
  prevBtnEl.disabled = current === 0;
  nextBtnEl.disabled = current === total - 1;
}

function navigate(dir) { goTo(current + dir); }

function isTypingTarget(target) {
  if (!target) return false;
  return target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(target.tagName);
}

const NEXT_KEYS = new Set([
  'ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Spacebar', 'Enter',
  'MediaTrackNext', 'n', 'N', 'j', 'J', 'l', 'L',
]);

const PREV_KEYS = new Set([
  'ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace',
  'MediaTrackPrevious', 'p', 'P', 'k', 'K', 'h', 'H',
]);

const NEXT_KEYCODES = new Set([32, 34, 39, 40]);
const PREV_KEYCODES = new Set([8, 33, 37, 38]);

document.addEventListener('keydown', e => {
  if (isTypingTarget(e.target)) return;
  if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('a, button')) return;

  const key = e.key;
  const code = e.keyCode;
  const isNext = NEXT_KEYS.has(key) || e.code === 'Space' || NEXT_KEYCODES.has(code);
  const isPrev = PREV_KEYS.has(key) || PREV_KEYCODES.has(code);

  if (isNext) {
    e.preventDefault();
    navigate(1);
  } else if (isPrev) {
    e.preventDefault();
    navigate(-1);
  } else if (e.key === 'Home') {
    e.preventDefault();
    goTo(0);
  } else if (e.key === 'End') {
    e.preventDefault();
    goTo(total - 1);
  }
});

slides.forEach(slide => { slide.inert = true; });
goTo(0);
