const botWindow = document.getElementById('bot-window');
const botMessages = document.getElementById('bot-messages');
const botInput = document.getElementById('bot-input');

const botKnowledge = {
  "больно ли": "На канадских аппаратах Apilus длительность импульса измеряется тысячными долями секунды. Ощущается легкое тепло или покалывание. При повышенной чувствительности используем аппликационную анестезию.",
  "противопоказания": "Основные ограничения: кардиостимулятор, онкология, сахарный диабет в стадии декомпенсации, беременность и острые дерматологические высыпания в зоне воздействия.",
  "подготов": "Не используйте воск и пинцет за 3 недели до визита. Отрастите волоски до 3–4 мм и выпейте стакан чистой воды перед приемом для лучшей проводимости кожи.",
  "запис": "Записаться на удобное время можно у нашего администратора в Telegram: @epilux_admin."
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
    appendBotMsg("Здравствуйте! Я ассистент студии EPILUX. Готов ответить на вопросы по подготовке, противопоказаниям и стоимости процедур.");
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
    let reply = "Спасибо за обращение! Выберите готовую тему ниже или свяжитесь с нашим мастером напрямую.";

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
