const { Converter } = require("ffmpeg-stream");
const { createReadStream, createWriteStream } = require("fs");

async function convert() {
  const converter = new Converter();

  // get a writable input stream and pipe an image file to it
  const input = converter.createInputStream({
    f: "image2pipe",
    vcodec: "mjpeg",
  });
  createReadStream(`${__dirname}/cat.jpg`).pipe(input);

  // create an output stream, crop/scale image, save to file via node stream
  converter
    .createOutputStream({
      f: "image2",
      vcodec: "mjpeg",
      vf: "crop=300:300,scale=100:100",
    })
    .pipe(createWriteStream(`${__dirname}/cat_thumb.jpg`));

  // same, but save to file directly from ffmpeg
  converter.createOutputToFile(`${__dirname}/cat_full.jpg`, {
    vf: "crop=300:300",
  });

  // start processing
  await converter.run();
}
