const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox    = document.getElementById('lightbox');
const lightImg    = lightbox.querySelector('.lightbox-img');
const btnClose    = lightbox.querySelector('.close');
const btnNext     = lightbox.querySelector('.next');
const btnPrev     = lightbox.querySelector('.prev');
let currentIndex = 0;

// OPEN LIGHTBOX
galleryItems.forEach((item, idx) => {
  item.querySelector('.view-btn').addEventListener('click', () => {
    currentIndex = idx; showLightbox();
  });
});

// SHOW & UPDATE
function showLightbox(){
  const img = galleryItems[currentIndex].querySelector('img');
  lightImg.src = img.src;
  lightImg.alt = img.alt;
  lightbox.classList.replace('hidden','visible');
}

// NAVIGATION
btnNext.addEventListener('click', ()=> {
  currentIndex = (currentIndex+1) % galleryItems.length;
  showLightbox();
});
btnPrev.addEventListener('click', ()=> {
  currentIndex = (currentIndex-1 + galleryItems.length) % galleryItems.length;
  showLightbox();
});
btnClose.addEventListener('click', ()=> {
  lightbox.classList.replace('visible','hidden');
});

// CLOSE ON OUTSIDE CLICK
lightbox.addEventListener('click', e => {
  if(e.target === lightbox) btnClose.click();
});

// FILTER LOGIC
document.querySelectorAll('.gallery-filter button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.gallery-filter .active').classList.remove('active');
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      item.style.display =
        filter === 'all' || item.dataset.category === filter
          ? 'block'
          : 'none';
    });
  });
});

// KEYBOARD NAVIGATION
document.addEventListener('keydown', e => {
  if (lightbox.classList.contains('visible')) {
    switch (e.key) {
      case 'ArrowRight':
        btnNext.click();
        break;
      case 'ArrowLeft':
        btnPrev.click();
        break;
      case 'Escape':
        btnClose.click();
        break;
    }
  }
});
