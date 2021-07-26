const { OUT_DIR } = require('./lib/constants');
const { readDir } = require('./lib/file');
const { uploadToMattermostEmoji } = require('./lib/mattermost');

async function upload () {
  console.log('Start Uploading...');
  const filePaths = await readDir(OUT_DIR);
  await Promise.all(filePaths.map(filename => {
    const path =`${OUT_DIR}/${filename}`;
    return uploadToMattermostEmoji(path);
  }))
  console.log('All emojis are uploaded');
}

upload();