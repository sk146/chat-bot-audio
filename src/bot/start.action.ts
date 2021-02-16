import { Context } from 'telegraf';
import { bot } from './bot';

bot.start((ctx: Context) =>
  ctx.reply('Welcome, send me a link to YouTube video')
);
export { bot };
