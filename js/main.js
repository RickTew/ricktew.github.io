/* Theme toggle */
const html = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');
const icon = toggleBtn?.querySelector('.theme-icon');

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme ?? (prefersDark ? 'dark' : 'light');

html.setAttribute('data-theme', initialTheme);
if (icon) icon.textContent = initialTheme === 'dark' ? '◐' : '◑';

toggleBtn?.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  if (icon) icon.textContent = next === 'dark' ? '◐' : '◑';
});

/* Nav dropdowns */
document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
  const btn = dropdown.querySelector('button');
  btn?.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('open');
    document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
    if (!isOpen) dropdown.classList.add('open');
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
});

/* Work filter */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.type === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});
