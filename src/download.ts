import { OUT_DIR } from './constants';
import { getEmojiList } from './utils/slack';
import { downloadFile } from './utils/file';

const filterAliasEmoji = (emojiUrl: string) => !emojiUrl.includes('alias');

async function download() {
  console.log('Start Downloading....');

  const emojiMap = await getEmojiList();
  if (emojiMap == null) {
    return;
  }

  const emojiList = Object.entries(emojiMap).filter(([, url]: [string, string]) => filterAliasEmoji(url));
  
  await Promise.all(emojiList.map(async ([filename, url]) => {
    const fields = url.split('.');
    const extension = fields[fields.length - 1];
    const dest = `${OUT_DIR}/${filename}.${extension}`;

    await downloadFile(dest, url);
    console.log('Download Finished -> ', dest);
  }));
  
  console.log('All emojis are Downloaded');
}

download();