/* Pro Choice Cleaning - v4.0 */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.hero-logo, .eyebrow, h1, .hero-sub, .hero-links, .spread-head, .sb-row, .about-left, .about-right, .about-quote, .work h2, .join-inner, .cl, .cr').forEach(el => {
  el.classList.add('flow-in');
  observer.observe(el);
});

// Lightbox with prev/next
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
const lbClose = document.getElementById('lbClose');

// Build unique image list (first 10 only, skip duplicates)
const galleryImages = [];
document.querySelectorAll('.gs-img').forEach((item, i) => {
  if (i < 10) {
    galleryImages.push(item.querySelector('img').src);
  }
});

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = galleryImages[currentIndex];
  lightbox.classList.add('open');
}

function closeLightbox() {
  lightbox.classList.remove('open');
}

function nextPhoto() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex];
}

function prevPhoto() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex];
}

document.querySelectorAll('.gs-img').forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i % 10));
});

lbNext.addEventListener('click', (e) => { e.stopPropagation(); nextPhoto(); });
lbPrev.addEventListener('click', (e) => { e.stopPropagation(); prevPhoto(); });
lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'ArrowRight') nextPhoto();
  if (e.key === 'ArrowLeft') prevPhoto();
  if (e.key === 'Escape') closeLightbox();
});

// Contact form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.textContent = 'Sent!';
    setTimeout(() => { btn.textContent = 'Request Free Quote'; form.reset(); }, 3000);
  });
}

// Join form
const joinForm = document.getElementById('joinForm');
if (joinForm) {
  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = joinForm.querySelector('button');
    btn.textContent = 'Application Sent!';
    setTimeout(() => { btn.textContent = 'Apply Now'; joinForm.reset(); }, 3000);
  });
}
