import { logger } from "../config";
import * as youtube from "../youtube/youtube.service";
import * as host from "../youtube/host.service";
import { UnknownHost } from "./errors";

const getYoutubeAudio = async (url: URL) => {
  if (!host.checkHost(url)) {
    throw new UnknownHost(`Unknown host ${url.host}`);
  }
  const info = await youtube.getInfo(url);
  const name = info["fulltitle"] ? info["fulltitle"] : "audio";
  const filename = `${name}.mp3`;

  return { filename, source: youtube.getAudioStream(url) };
};

export { getYoutubeAudio };
