import { Context } from 'telegraf';
import { bot } from './bot';

bot.help((ctx: Context) => ctx.reply('Send me a link to YouTube video'));

export { bot };
