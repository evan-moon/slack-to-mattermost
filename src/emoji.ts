import { OUT_DIR } from './constants';
import { getSlackEmojiList } from './utils/slack';
import { downloadFile, getFileInfoFromFilePath, readDir } from './utils/file';
import { uploadToMattermostEmoji } from './utils/mattermost';

const filterAliasEmoji = (emojiUrl: string) => !emojiUrl.includes('alias');

async function download() {
  console.log('Start Downloading....');

  const emojiMap = await getSlackEmojiList();
  if (emojiMap == null) {
    return;
  }

  const emojiList = Object.entries(emojiMap).filter(([, url]: [string, string]) => filterAliasEmoji(url));

  await Promise.all(
    emojiList.map(async ([filename, url]) => {
      const { extension } = getFileInfoFromFilePath(url);
      const dest = `${OUT_DIR.emoji}/${filename}.${extension}`;

      await downloadFile(dest, url);
      console.log('Download Finished -> ', dest);
    })
  );

  console.log('All emojis are Downloaded');
}

async function upload() {
  console.log('Start Uploading...');

  const filePaths = await readDir(OUT_DIR.emoji);
  await Promise.all(
    filePaths.map(async filename => {
      const path = `${OUT_DIR}/${filename}`;
      const response = await uploadToMattermostEmoji(path);
      console.log(response);
      console.log('Upload Finished -> ', path);
    })
  );

  console.log('All emojis are uploaded');
}

async function main() {
  await download();
  await upload();
}

main();
