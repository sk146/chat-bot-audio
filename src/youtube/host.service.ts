const checkHost = (url: URL) => {
  let res = false;
  const whitelist = [
    'youtu.be',
    'www.youtube.com',
    'music.youtube.com',
    'soundcloud.com',
  ];
  if (whitelist.includes(url.host)) {
    res = true;
  }
  return res;
};

export { checkHost };
