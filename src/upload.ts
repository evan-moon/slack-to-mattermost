import { OUT_DIR } from './constants';
import { readDir } from './utils/file';
import { uploadToMattermostEmoji } from './utils/mattermost';

async function upload() {
  console.log('Start Uploading...');

  const filePaths = await readDir(OUT_DIR);
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

upload();
