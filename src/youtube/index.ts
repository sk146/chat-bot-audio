import youtubedl from "youtube-dl";

const getAudioFromYoutube = (url: URL) => {
  if (!(url.host === "youtu.be")) {
    throw new Error("host not found");
  }

  return getAudioStreamFromYoutube(url);
};

const getAudioStreamFromYoutube = (url: URL) => {
  return youtubedl(
    url.toString(),
    ["--extract-audio", "--audio-format", "mp3"],
    {}
  );
};

export { getAudioFromYoutube };
