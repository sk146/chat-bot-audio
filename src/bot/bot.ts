import * as dotenv from "dotenv";
import { Telegraf } from "telegraf";
dotenv.config();

const bot_token = String(process.env.BOT_TOKEN);
const bot = new Telegraf(bot_token);

export { bot };
