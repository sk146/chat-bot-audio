import { logger } from "../config";
import * as youtube from "../youtube/youtube.service";
import { UnknownHost } from "./errors";

const getYoutubeAudio = async (url: URL) => {
  const whitelist = ["youtu.be", "www.youtube.com"];
  if (!whitelist.includes(url.host)) {
    throw new UnknownHost(`Unknown host ${url.host}`);
  }
  const info = await youtube.getInfo(url);
  const source = youtube.getAudioStream(url);
  const filename = `${info["fulltitle"]}.mp3`;
  logger.info(filename);
  return { source, filename };
};

export { getYoutubeAudio };

/**
 errors 

 Video unavailable
 
 */
