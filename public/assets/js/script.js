(() => {
  if (window.__faqBound) return;            // avoid double-binding
  window.__faqBound = true;

  document.addEventListener('click', (e) => {
    const item = e.target.closest('.cs-faq-item');
    if (!item) return;
    item.classList.toggle('active');
  });
})();