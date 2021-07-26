import fs from 'fs';
import fetch from 'node-fetch';
import { MATTERMOST_ADMIN_PAT, MATTERMOST_ADMIN_USER_ID, MATTERMOST_HOST } from '../constants';
import { getFileInfoFromFilePath, getFileSizeInBytes } from './file';
import { createMultipartFormData } from './formData';

export async function uploadToMattermostEmoji (filePath: string) {
    const {fileName: emojiName} = getFileInfoFromFilePath(filePath);
    const fileSizeInBytes = getFileSizeInBytes(filePath);
    const fileStream = fs.createReadStream(filePath);

    const { formData, headers } = createMultipartFormData({
      image: {
        value: fileStream,
        options: { knownLength: fileSizeInBytes }
      },
      emoji: {
        value: JSON.stringify({
          name: emojiName,
          creator_id: MATTERMOST_ADMIN_USER_ID
        })
      }
    });

    return fetch(`${MATTERMOST_HOST}/api/v4/emoji`, {
      method: 'POST',
      headers: {
        Authorization: MATTERMOST_ADMIN_PAT ?? '',
        ...headers
      },
      body: formData,
    });
    
}
