import { Context, Telegraf } from "telegraf";
import * as dotenv from "dotenv";
import { logger } from "../config";
import { getAudio } from "../youtube";
dotenv.config();

const bot_token = String(process.env.BOT_TOKEN);
const bot = new Telegraf(bot_token);

bot.start((ctx: any) => ctx.reply("Привет)"));
bot.help((ctx: any) => ctx.reply("Пришли мне ссылку из ютуба)))"));

bot.on("message", async (ctx: Context) => {
  try {
    const { message }: any = ctx.update;
    const { text } = message;
    const url = new URL(text);
    const audio = getAudio(url);
    await ctx.reply("Подожди минутку");
    ctx.replyWithAudio(await audio);
  } catch (error) {
    logger.error(error);
    await ctx.reply("ERROR");
  }
});

export { bot };
