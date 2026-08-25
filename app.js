const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
const toast = document.getElementById('toast');

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
};

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 18);
});

navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

// Product shortcuts fill the quote form automatically.
document.querySelectorAll('[data-product]').forEach(link => {
  link.addEventListener('click', () => {
    const select = document.getElementById('product');
    select.value = link.dataset.product;
  });
});

// Quote form: no backend required. It builds a clean WhatsApp message.
document.getElementById('quoteForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = data.get('name')?.trim() || '';
  const product = data.get('product') || 'Producto personalizado';
  const qty = data.get('qty') || 'Por definir';
  const delivery = data.get('delivery') || 'Por definir';
  const details = data.get('details')?.trim() || 'Sin detalles adicionales por el momento.';
  const msg = `Hola PinBoton, quiero solicitar una cotización.%0A%0A*Nombre:* ${encodeURIComponent(name)}%0A*Producto:* ${encodeURIComponent(product)}%0A*Cantidad aproximada:* ${encodeURIComponent(qty)}%0A*Entrega:* ${encodeURIComponent(delivery)}%0A*Detalles:* ${encodeURIComponent(details)}`;
  window.open(`https://wa.me/50230481410?text=${msg}`, '_blank', 'noopener');
});

// Gallery lightbox.
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImg.src = item.dataset.full;
    lightbox.showModal();
  });
});
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  const box = lightbox.getBoundingClientRect();
  const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  if (outside) lightbox.close();
});

// Facebook and Instagram remain inactive until their exact official URLs are confirmed. TikTok is active in the HTML.
document.querySelectorAll('[data-coming]').forEach(button => {
  button.addEventListener('click', () => showToast(`${button.dataset.coming}: perfil pendiente de confirmar su enlace oficial.`));
});
