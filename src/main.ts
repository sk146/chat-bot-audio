import { Info } from 'youtube-dl';
import { bot } from './bot';
import { logger } from './config';
import { getInfo } from './youtube';
import { YoutubeInfo } from './youtube/types';

async function main() {
  bot.launch();
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

main();
