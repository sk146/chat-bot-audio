import youtubedl from "youtube-dl";
import { Info } from "youtube-dl";
import { logger } from "../config";
import * as bluebird from "bluebird";

const getAudio = async (url: URL) => {
  const source = getAudioStream(url);
  const info = await new Promise<any>((resolve, reject) => {
    youtubedl.getInfo(url.toString(), [], {}, (err: any, output: Info) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(output);
    });
  });
  const filename = `${info["fulltitle"]}.mp3`;
  logger.info(filename);
  return { source, filename };
};

const getAudioStream = (url: URL) => {
  return youtubedl(
    url.toString(),
    ["--extract-audio", "--audio-format", "mp3", "-o", "%(title)s.%(ext)s"],
    {}
  );
};

export { getAudio };
