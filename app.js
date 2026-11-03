// --- Переключение страниц (вкладок) ---
function showTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  const activeTab = document.getElementById(`tab-${tabName}`);
  if (activeTab) {
    activeTab.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// --- Калькулятор сеанса ---
const zoneSelect = document.getElementById('calc-zone');
const minutesInput = document.getElementById('calc-minutes');
const minutesVal = document.getElementById('calc-minutes-val');
const totalVal = document.getElementById('calc-total');

function updateCalc() {
  if (!zoneSelect || !minutesInput) return;
  const rate = parseInt(zoneSelect.value);
  const mins = parseInt(minutesInput.value);
  minutesVal.innerText = `${mins} мин`;
  totalVal.innerText = `${(rate * mins).toLocaleString('ru-RU')} ₽`;
}

if (zoneSelect && minutesInput) {
  zoneSelect.addEventListener('change', updateCalc);
  minutesInput.addEventListener('input', updateCalc);
}

// --- Интерактивный слайдер До/После ---
const sliderRange = document.getElementById('slider-range');
const sliderOverlay = document.getElementById('slider-overlay');

if (sliderRange && sliderOverlay) {
  sliderRange.addEventListener('input', (e) => {
    sliderOverlay.style.width = `${e.target.value}%`;
  });
}

// --- Магазин и корзина ---
const products = [
  { id: 1, name: 'Крем регенерирующий Цикапласт B5+', price: 1850, img: 'https://images.unsplash.com/photo-1608248597359-5033c5e8c45f?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Гель охлаждающий с алоэ вера 99%', price: 950, img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Крем анестетик Akriol Pro 30г', price: 1400, img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80' }
];

let cart = JSON.parse(localStorage.getItem('epilux_cart')) || [];

function renderProducts() {
  const container = document.getElementById('products-container');
  if (!container) return;
  container.innerHTML = products.map(prod => `
    <div class="bg-[#14161f] border border-gray-800 rounded-xl overflow-hidden flex flex-col justify-between">
      <img src="${prod.img}" alt="${prod.name}" class="h-44 w-full object-cover">
      <div class="p-4 flex flex-col flex-grow justify-between">
        <h4 class="font-bold text-white text-sm mb-2">${prod.name}</h4>
        <div class="flex items-center justify-between mt-4">
          <span class="text-amber-400 font-bold">${prod.price.toLocaleString('ru-RU')} ₽</span>
          <button onclick="addToCart(${prod.id})" class="bg-gray-800 hover:bg-amber-500 hover:text-black text-white text-xs px-3 py-2 rounded-lg font-semibold transition">
            В корзину
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  saveCart();
}

function saveCart() {
  localStorage.setItem('epilux_cart', JSON.stringify(cart));
  updateCartCounter();
}

function updateCartCounter() {
  const badge = document.getElementById('cart-counter');
  if (badge) badge.innerText = cart.length;
}

function openCart() {
  renderCartItems();
  document.getElementById('cart-modal').classList.remove('hidden');
}

function closeCart() {
  document.getElementById('cart-modal').classList.add('hidden');
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  const total = document.getElementById('cart-total-price');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-gray-500 text-sm">Ваша корзина пуста</p>`;
    if (total) total.innerText = '0 ₽';
    return;
  }

  let sum = 0;
  container.innerHTML = cart.map((item, index) => {
    sum += item.price;
    return `
      <div class="flex justify-between items-center text-sm border-b border-gray-800 pb-2">
        <span class="text-gray-200">${item.name}</span>
        <div class="flex items-center gap-3">
          <span class="text-amber-400 font-bold">${item.price} ₽</span>
          <button onclick="removeFromCart(${index})" class="text-gray-500 hover:text-red-400"><i class="fa-solid fa-trash text-xs"></i></button>
        </div>
      </div>
    `;
  }).join('');
  if (total) total.innerText = `${sum.toLocaleString('ru-RU')} ₽`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCartItems();
}

function checkoutOrder() {
  if (cart.length === 0) return alert('Корзина пуста');
  alert('Заказ оформлен! Администратор свяжется с вами для подтверждения.');
  cart = [];
  saveCart();
  closeCart();
}

// --- Отзывы (LocalStorage) ---
const defaultReviews = [
  { name: 'Алина К.', zone: 'Зона: Подмышки', text: 'За 5 сеансов ушло 90% волос. Аппарат Apilus действительно мягче старых моделей!' },
  { name: 'Екатерина В.', zone: 'Зона: Лицо и брови', text: 'Убирали пушок над верхней губой. Следов и ожогов нет, идеальная гладкость.' }
];

let reviews = JSON.parse(localStorage.getItem('epilux_reviews')) || defaultReviews;

function renderReviews() {
  const container = document.getElementById('reviews-container');
  if (!container) return;
  container.innerHTML = reviews.map(r => `
    <div class="bg-[#14161f] p-5 rounded-xl border border-gray-800">
      <div class="flex items-center justify-between mb-2">
        <span class="font-bold text-white text-sm">${r.name}</span>
        <div class="text-amber-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
      </div>
      <span class="text-[11px] text-amber-500 block mb-2">${r.zone}</span>
      <p class="text-gray-400 text-xs">${r.text}</p>
    </div>
  `).join('');
}

const reviewForm = document.getElementById('review-form');
if (reviewForm) {
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('rev-name').value;
    const zone = document.getElementById('rev-zone').value;
    const text = document.getElementById('rev-text').value;

    reviews.unshift({ name, zone, text });
    localStorage.setItem('epilux_reviews', JSON.stringify(reviews));
    renderReviews();
    reviewForm.reset();
  });
}

// --- Новости ---
const newsData = [
  { title: 'Как подготовить кожу к первому сеансу', date: '28 Октября 2026', desc: 'Длина волосков должна составлять от 3 до 4 мм. Рекомендуется обильное питье за сутки до процедуры для гидратации фолликула.' },
  { title: 'Сравнение методов: Термолиз vs Flash 27 МГц', date: '15 Октября 2026', desc: 'Почему сверхбыстрый импульс частотой 27.12 МГц снижает болевые ощущения в 3 раза по сравнению с классическим термолизом.' }
];

function renderNews() {
  const container = document.getElementById('news-container');
  if (!container) return;
  container.innerHTML = newsData.map(n => `
    <div class="bg-[#14161f] p-6 rounded-xl border border-gray-800">
      <span class="text-xs text-amber-400 mb-2 block font-medium">${n.date}</span>
      <h3 class="text-lg font-bold text-white mb-2">${n.title}</h3>
      <p class="text-gray-400 text-xs leading-relaxed">${n.desc}</p>
    </div>
  `).join('');
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderReviews();
  renderNews();
  updateCartCounter();
  updateCalc();
});
