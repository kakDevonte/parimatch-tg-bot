import { config } from 'dotenv';
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';

config();

const token = process.env.TELEGRAM_API_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const app = express();

//const TELEGRAM_URI = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage`;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const opt = {
  parse_mode: 'markdown',
  disable_web_page_preview: false,
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: `Играть`,
          web_app: { url: 'https://wheel-of-fortune-theta.vercel.app/' },
        },
        { text: `Забрать приз`, url: 'https://www.youtube.com/' },
      ],
    ],
  }),
};

bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp =
    'Привет! \n' +
    'Уже 17 сентября в Лас-Вегасе состоится исторический поединок между\nГеннадием Головкиным и Саулем Альваресом.\n' +
    '\n' +
    'В честь этого события Parimatch подготовили для тебя игру, где ты можешь\nотправить Канело в нокаут, а также выиграть 3 iPhone 14 Pro Max и 2 000 000\nбонусов!';

  bot.sendMessage(chatId, resp, opt);
});

bot.on('message', (msg) => {
  if (msg.text === '/start') return;
  const chatId = msg.chat.id;
  const resp =
    'Чтобы перейти к игре или принять участие в конкурсе – нажми на кнопку ниже';
  bot.sendMessage(chatId, resp, opt);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
