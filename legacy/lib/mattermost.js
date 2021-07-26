const FormData = require('form-data');
const fs = require('fs');
const fetch = require('node-fetch');

const MATTERMOST_HOST = 'https://mattermost.lubycon.io';
const MATTERMOST_ADMIN_PAT = 'Bearer ynyxrf7jgifp7csgjeoit58xky';
const MATTERMOST_ADMIN_USER_ID = 'sa5o7pp3mpgojrjifrrmipwr9y';

async function uploadToMattermostEmoji (filePath) {
    const paths = filePath.split('/');
    const fileName = paths[paths.length - 1];
    const [emojiName] = fileName.split('.');

    const stats = fs.statSync(filePath);
    const fileSizeInBytes = stats.size;
    const fileStream = fs.createReadStream(filePath);

    const formData = new FormData();
    formData.append('image', fileStream, { knownLength: fileSizeInBytes });
    formData.append('emoji', JSON.stringify({
      name: emojiName,
      creator_id: MATTERMOST_ADMIN_USER_ID,
    }));

    const contentType = `multipart/form-data; boundary=${formData.getBoundary()}`;
    const response = await fetch(`${MATTERMOST_HOST}/api/v4/emoji`, {
      method: 'POST',
      headers: {
        Authorization: MATTERMOST_ADMIN_PAT,
        'Content-Type': contentType,
      },
      body: formData,
    });
    console.log('Reponse > ', await (await response).json());
}

module.exports = {
  uploadToMattermostEmoji,
}