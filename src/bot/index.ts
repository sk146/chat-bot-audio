import { Context, Telegraf } from "telegraf";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { logger } from "../config";
import { getAudioFromYoutube } from "../youtube";
// process.env.BOT_TOKEN
dotenv.config();
const bot_token = String(process.env.BOT_TOKEN);
const pathDir = `/home/sk146/projects/nodejs-test/data`;
const pathFille = `${pathDir}/myvideo.mp3`;
const bot = new Telegraf(bot_token);

bot.start((ctx: any) => ctx.reply("Welcom"));
bot.help((ctx: any) => ctx.reply("Send me a link from youtube"));

bot.on("message", async (ctx: Context) => {
  try {
    const { message }: any = ctx.update;
    const { text } = message;
    const url = new URL(text);
    const audio = getAudioFromYoutube(url);

    audio.on("info", (info: any) => {
      logger.info("Download started");
      logger.info("filename: " + info._filename);
      logger.info("size: " + info.size);
    });

    ctx.replyWithAudio({ source: audio });
  } catch (error) {
    logger.error(error);
    await ctx.reply("ERROR");
  }
});

/*


 const { message }: any = ctx.update;
    const { text } = message;
    //const video = getVideoStream("https://youtu.be/wFkp1-vJhfo");
    //ctx.replyWithAudio({ source: video }); www.youtube.com https://youtu.be/wFkp1-vJhfo
    const url = new URL(text);
    logger.info(url.host);
    logger.info("Download started");
    await ctx.reply("Send me a link from youtube");

bot.hears("hi", (ctx: any) => {
  const video = getVideoStream("https://youtu.be/wFkp1-vJhfo");
  video.on("info", (info: any) => {
    logger.info("Download started");
    logger.info("filename: " + info._filename);
    logger.info("size: " + info.size);
  });
  ctx.replyWithAudio({ source: video });
});
*/
export { bot };
