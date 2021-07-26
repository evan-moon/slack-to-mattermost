const { OUT_DIR } = require('./lib/constants');
const { getEmojiList } = require('./lib/slack');
const { downloadFile } = require('./lib/file');

async function download() {
  console.log('Start....');
  const emojiMap = await getEmojiList();
  const emojiList = Object.entries(emojiMap).filter(([,url]) => !url.includes('alias'));
  
  await Promise.all(emojiList.map(([filename, url]) => {
    const fields = url.split('.');
    const extension = fields[fields.length - 1];
    const dest = `${OUT_DIR}/${filename}.${extension}`;

    downloadFile(dest, url);
  }));
  console.log('All emojis are Downloaded');
}

download();