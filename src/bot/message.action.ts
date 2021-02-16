import { logger } from '../config';
import { Context } from 'telegraf';
import * as service from './bot.service';
import { bot } from './bot';

type UpdateContext = Context & {
  update: {
    callback_query: any;
  };
};

bot.on('message', async (ctx: Context) => {
  const { message }: any = ctx.update;
  const { text } = message;

  try {
    const url = new URL(text);
    const info = await service.getYoutubeInfo(url);
    await ctx.reply(info.message, {
      reply_markup: info.keyboard,
    });
  } catch (error) {
    logger.warn(error.message);
    await ctx.reply(error.message);
  }
});

bot.on('callback_query', async (ctx: UpdateContext) => {
  try {
    const { data, message } = ctx.update.callback_query;
    const url = new URL(data);
    const audio = await service.getYoutubeAudio(url);
    ctx.deleteMessage(message.message_id);
    ctx.replyWithAudio(audio.stream, audio.extra);
  } catch (error) {
    logger.warn(error.message);
    await ctx.reply(error.message);
  }
});
