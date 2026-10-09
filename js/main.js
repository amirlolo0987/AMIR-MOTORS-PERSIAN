let cat = 'all';
let query = '';
const cards = $$('.card');
const empty = $('.empty');

function applyFilters() {
  let visible = 0;
  cards.forEach(card => {
    const okCat = cat === 'all' || card.dataset.cat === cat;
    const okText = card.querySelector('h3').textContent.toLowerCase().includes(query);
    card.hidden = !(okCat && okText);
    if (!card.hidden) visible++;
  });
  empty.hidden = visible > 0;
}

$$('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    cat = chip.dataset.cat;
    $$('.chip').forEach(c => c.classList.toggle('on', c === chip));
    applyFilters();
  });
});

$('.search').addEventListener('input', e => {
  query = e.target.value.trim().toLowerCase();
  applyFilters();
});
