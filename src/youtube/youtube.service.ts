import youtubedl from "youtube-dl";

const getInfo: any = async (url: URL) => {
  return new Promise<youtubedl.Info>((resolve: any, reject: any) => {
    youtubedl.getInfo(
      url.toString(),
      [],
      {},
      (err: any, output: youtubedl.Info) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(output);
      }
    );
  });
};

const getAudioStream: any = (url: URL) => {
  return youtubedl(
    url.toString(),
    ["--extract-audio", "--audio-format", "mp3", "-o", "%(title)s.%(ext)s"],
    {}
  );
};

export { getAudioStream, getInfo };
