// --- Чат-бот ассистент ---
const botWindow = document.getElementById('bot-window');
const botMessages = document.getElementById('bot-messages');
const botInput = document.getElementById('bot-input');

const botKnowledge = {
  "больно ли": "На наших аппаратах Apilus (Канада) длительность импульса составляет тысячные доли секунды. Ощущается легкое покалывание или тепло. При необходимости мы наносим крем-анестетик Акриол Про.",
  "противопоказания": "Основные противопоказания: наличие кардиостимулятора, онкологические заболевания, сахарный диабет в стадии декомпенсации, беременность и воспаления в зоне обработки.",
  "подготов": "За 2-3 дня отрастите длину волосков до 3-4 мм (не выщипывать пинцетом и воском). Пейте больше чистой воды, чтобы кожа была увлажненной — это снизит чувствительность.",
  "запис": "Чтобы записаться, оставьте ваш телефон и желаемое время, либо напишите администратору в Telegram: @epilux_admin."
};

function toggleBot(forceOpen = null) {
  if (forceOpen === true) {
    botWindow.classList.remove('hidden');
  } else if (forceOpen === false) {
    botWindow.classList.add('hidden');
  } else {
    botWindow.classList.toggle('hidden');
  }
  if (!botWindow.classList.contains('hidden') && botMessages.children.length === 0) {
    appendBotMsg("Здравствуйте! Я онлайн-ассистент студии EPILUX. Подскажу по ценам, подготовке или отвечу на любые вопросы по электроэпиляции.");
  }
}

function appendBotMsg(text, isUser = false) {
  const msg = document.createElement('div');
  msg.className = isUser 
    ? "ml-auto bg-amber-500 text-black p-2.5 rounded-lg max-w-[80%] text-right font-medium" 
    : "mr-auto bg-[#1a1d28] border border-gray-700 text-gray-200 p-2.5 rounded-lg max-w-[85%]";
  msg.innerText = text;
  botMessages.appendChild(msg);
  botMessages.scrollTop = botMessages.scrollHeight;
}

function sendBotMessage() {
  const text = botInput.value.trim();
  if (!text) return;
  appendBotMsg(text, true);
  botInput.value = '';

  setTimeout(() => {
    const lower = text.toLowerCase();
    let reply = "Спасибо за вопрос! Вы можете выбрать быструю тему внизу или написать администратору студии напрямую.";

    for (const [key, val] of Object.entries(botKnowledge)) {
      if (lower.includes(key)) {
        reply = val;
        break;
      }
    }
    appendBotMsg(reply);
  }, 400);
}

function sendQuickMessage(text) {
  if (botWindow.classList.contains('hidden')) toggleBot(true);
  botInput.value = text;
  sendBotMessage();
}

if (botInput) {
  botInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBotMessage();
  });
}
