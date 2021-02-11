import youtubedl from "youtube-dl";
import { Info } from "youtube-dl";
import { logger } from "../config";
import * as bluebird from "bluebird";

const getAudio = async (url: URL) => {
  const source = getAudioStream(url);
  const info = await new Promise<any>((resolve, reject) => {
    youtubedl.getInfo(url.toString(), [], {}, (err: any, output: Info) => {
      if (err) {
        reject(err); // calling `reject` will cause the promise to fail with or without the error passed as an argument
        return; // and we don't want to go any further
      }
      resolve(output);
    });
  });
  const filename = `${info["fulltitle"]}.mp3`;
  logger.info(filename);
  return { source, filename };
};

// sourc, filename
/*

if (!(url.host === "youtu.be")) {
  throw new Error("host not found");
}

*/
const getAudioStream = (url: URL) => {
  return youtubedl(
    url.toString(), //-o "%(title)s.%(ext)s"
    ["--extract-audio", "--audio-format", "mp3", "-o", "%(title)s.%(ext)s"],
    {}
  );
};

export { getAudio };
