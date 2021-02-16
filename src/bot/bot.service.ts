import * as youtube from '../youtube/youtube.service';
import * as host from '../youtube';
import { UnknownHostError } from './errors';
import { YoutubeInfo } from '../youtube';
import { InlineKeyboardMarkup } from 'telegraf/typings/telegram-types';
import { logger } from '../config';

const SIZE_MB = 5e7;

export type YoutubeInfoWithKeybord = {
  message: string;
  keyboard: InlineKeyboardMarkup;
};

const getYoutubeInfo = async (url: URL): Promise<YoutubeInfoWithKeybord> => {
  if (!host.checkHost(url)) {
    throw new UnknownHostError(`Unknown host ${url.host}`);
  }

  const info: YoutubeInfo = await youtube.getInfo(url);

  if (info.filesize > SIZE_MB) {
    throw new Error('Long file size');
  }

  const artist = info.artist ? info.artist.split(',').shift() : 'Unknown';
  const message = `${artist} - ${info.title}`;
  const buttons = [
    {
      text: 'Save',
      callback_data: url.toString(),
    },
  ];
  const keyboard: InlineKeyboardMarkup = {
    inline_keyboard: [[...buttons]],
  };
  return {
    message,
    keyboard,
  };
};

const getYoutubeAudio = async (url: URL) => {
  if (!host.checkHost(url)) {
    throw new UnknownHostError(`Unknown host ${url.host}`);
  }
  const info: YoutubeInfo = await youtube.getInfo(url);

  if (info.filesize > SIZE_MB) {
    throw new Error('Long file size');
  }

  const artist = info.artist ? info.artist.split(',').shift() : 'Unknown';
  return {
    stream: { source: youtube.getAudioStream(url) },
    extra: {
      ...info,
      title: info.title,
      performer: artist,
    },
  };
};

export { getYoutubeAudio, getYoutubeInfo };
