import { logger } from "../config";
import { Context } from "telegraf";
import * as service from "./bot.service";
import { bot } from "./bot";

bot.on("message", async (ctx: Context) => {
  const { message }: any = ctx.update;
  const { text } = message;

  try {
    const url = new URL(text);
    await ctx.reply("Wait");
    const audio = service.getYoutubeAudio(url);
    ctx.replyWithAudio(await audio);
  } catch (error) {
    logger.warn(error.message);
    await ctx.reply(error.message);
  }
});
