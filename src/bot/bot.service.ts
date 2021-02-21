import * as youtube from '../youtube/youtube.service';
import * as host from '../youtube';
import { UnknownHostError } from './errors';
import { YoutubeInfo } from '../youtube';

const SIZE_MB = 5e7;

const getYoutubeAudio = async (url: URL) => {
  if (!host.checkHost(url)) {
    throw new UnknownHostError(`Unknown host ${url.host}`);
  }
  const info: YoutubeInfo = await youtube.getInfo(url);
  const artist = info.artist ? info.artist.split(',').shift() : '';
  return {
    stream: { source: youtube.getAudioStream(url) },
    extra: {
      ...info,
      title: info.title,
      performer: artist,
    },
  };
};

export { getYoutubeAudio };

// DEf
// 20MB ============================================ ЛСИП.mp3 
// 20MB =====================X 



//  Stream 
// 20MB ===*===*===*
// 20MB ===*===*===*===*===*===*===*===*===*===*===*===*===*===*===*===*===*===*===*===*
// 100KB 
// 20MB / 100KB = 20 Chank 
// 10 Chank XXXX 10 Chank