import { bot } from "./bot";

bot.start((ctx: any) => ctx.reply("Welcome, send me a link to YouTube video"));
bot.help((ctx: any) => ctx.reply("Send me a link to YouTube video"));

export { bot };
