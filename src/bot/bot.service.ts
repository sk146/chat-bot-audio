import * as youtube from '../youtube/youtube.service';
import * as host from '../youtube';
import { UnknownHostError } from './errors';
import { YoutubeInfo } from '../youtube';
import { InlineKeyboardMarkup } from 'telegraf/typings/telegram-types';

export type YoutubeInfoWithKeybord = {
  message: string;
  keyboard: InlineKeyboardMarkup;
};

const getYoutubeInfo = async (url: URL): Promise<YoutubeInfoWithKeybord> => {
  if (!host.checkHost(url)) {
    throw new UnknownHostError(`Unknown host ${url.host}`);
  }

  const info: YoutubeInfo = await youtube.getInfo(url);
  const artist = info.artist.split(',').shift();
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
  return {
    stream: { source: youtube.getAudioStream(url) },
    extra: {
      ...info,
      title: info.title,
      performer: info.artist.split(',').shift(),
    },
  };
};

export { getYoutubeAudio, getYoutubeInfo };
