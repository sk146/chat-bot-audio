import * as fs from "fs";
import youtubedl from "youtube-dl";
import { logger } from "./config";
import * as dotenv from "dotenv";
import { bot } from "./bot";

//const bot = startBot(bot_token);

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

/*
const pathDir = `/home/sk146/projects/nodejs-test/data`;
const pathFille = `${pathDir}/myvideo.mp3`;
const video = getVideoStream("http://www.youtube.com/watch?v=rCiBgLOcuKU");

// Will be called when the download starts.
video.on("info", (info: any) => {
  logger.info("Download started");
  logger.info("filename: " + info._filename);
  logger.info("size: " + info.size);
});

const audio = videoToAudio(video);
audio.pipe(fs.createWriteStream(`${pathFille}`));
*/
