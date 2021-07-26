import { OUT_DIR } from './constants';
import { getEmojiList } from './utils/slack';
import { downloadFile, getFileInfoFromFilePath } from './utils/file';

const filterAliasEmoji = (emojiUrl: string) => !emojiUrl.includes('alias');

async function download() {
  console.log('Start Downloading....');

  const emojiMap = await getEmojiList();
  if (emojiMap == null) {
    return;
  }

  const emojiList = Object.entries(emojiMap).filter(([, url]: [string, string]) => filterAliasEmoji(url));

  await Promise.all(
    emojiList.map(async ([filename, url]) => {
      const { extension } = getFileInfoFromFilePath(filename);
      const dest = `${OUT_DIR}/${filename}.${extension}`;

      await downloadFile(dest, url);
      console.log('Download Finished -> ', dest);
    })
  );

  console.log('All emojis are Downloaded');
}

download();
