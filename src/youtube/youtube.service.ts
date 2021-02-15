import { Readable } from 'stream';
import youtubedl, { Info } from 'youtube-dl';
import { YoutubeInfo } from './types';

const getInfo = (url: URL): Promise<YoutubeInfo> => {
  return new Promise<YoutubeInfo>((resolve: any, reject: any) => {
    youtubedl.getInfo(url.toString(), (err: any, output: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(output as YoutubeInfo);
    });
  });
};

const getAudioStream = (url: URL): Readable => {
  const arg = ['--extract-audio', '--audio-format', 'mp3'];
  const opt = {};

  return youtubedl(url.toString(), arg, opt);
};

export { getAudioStream, getInfo };
