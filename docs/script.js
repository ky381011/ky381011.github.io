const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let startX = 0;
let isDragging = false;

// 初期ロード（最初のスライドだけ）
slides.forEach((slide, index) => {
  if (index === 0) loadSlideContent(slide);
});

// スマホ用
slider.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});
slider.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].clientX - startX;
  handleSwipe(diff);
});

// PC用
slider.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.clientX;
  slider.style.cursor = 'grabbing';
});
slider.addEventListener('mouseup', e => {
  if (!isDragging) return;
  isDragging = false;
  const diff = e.clientX - startX;
  handleSwipe(diff);
  slider.style.cursor = 'grab';
});
slider.addEventListener('mouseleave', e => {
  if (!isDragging) return;
  isDragging = false;
  const diff = e.clientX - startX;
  handleSwipe(diff);
  slider.style.cursor = 'grab';
});

// インジケータークリック
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.dataset.index);
    goToSlide(index);
  });
});

function handleSwipe(diff) {
  const threshold = 50;
  if (diff < -threshold && currentIndex < slides.length - 1) {
    currentIndex++;
  } else if (diff > threshold && currentIndex > 0) {
    currentIndex--;
  }
  goToSlide(currentIndex);
}

function goToSlide(index) {
  currentIndex = index;
  slider.style.transform = `translateX(-${index * 100}%)`;
  updateIndicators();
  loadSlideContent(slides[index]);
}

function updateIndicators() {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function loadSlideContent(slide) {
  const src = slide.getAttribute('data-src');
  if (!slide.innerHTML.trim()) {
    fetch(src)
      .then(res => res.text())
      .then(html => slide.innerHTML = html)
      .catch(() => slide.innerHTML = `<p style="color:red;">読み込みエラー: ${src}</p>`);
  }
}
