/* اسکریپت مشترک همه‌ی صفحات (فقط رفتار؛ ساختار صفحه توی HTML نوشته شده) */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- تم روشن/تیره ---------- */
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem('theme', t); } catch (e) {}
}
function toggleTheme() {
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
}

/* ---------- مودال و منوی موبایل ---------- */
const modal = $('.modal');
const drawer = $('.drawer');
function closeModal() { modal.classList.remove('open'); }

document.addEventListener('click', e => {
  const t = e.target;
  if (t.closest('.theme-btn')) toggleTheme();
  if (t.closest('.open-support')) { e.preventDefault(); drawer.classList.remove('open'); modal.classList.add('open'); }
  if (t.closest('.close-modal') || t === modal) closeModal();
  if (t.closest('.burger')) drawer.classList.add('open');
  if (t.closest('.close-drawer') || t.classList.contains('back')) drawer.classList.remove('open');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); drawer.classList.remove('open'); }
});

/* ---------- اعتبارسنجی فرم‌ها (حروف فارسی و انگلیسی پذیرفته می‌شود) ---------- */





const rules = {
  name: v => /^[\p{L}\s]{5,40}$/u.test(v.trim()) && v.trim().includes(' '),
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  msg: v => v.trim().length > 0
};
function validate(form) {
  let ok = true;
  $$('input,textarea', form).forEach(el => {
    const rule = rules[el.name];
    const good = rule ? rule(el.value) : true;
    el.closest('.field').classList.toggle('bad', !good);
    if (!good) ok = false;
  });
  return ok;
}
function showToast() {
  const t = $('.toast');
  t.classList.add('show');
  
  setTimeout(() => t.classList.remove('show'), 4000);
}
$$('[data-form]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (validate(form)) { form.reset(); closeModal(); showToast(); }
  });
  form.addEventListener('change', () => validate(form));
});


const clock = $('#clock');
if (clock) setInterval(() => { clock.textContent = new Date().toLocaleTimeString('fa-IR'); }, 1000);


const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  });
}, { threshold: 0.12 });
$$('.reveal').forEach(el => io.observe(el));
