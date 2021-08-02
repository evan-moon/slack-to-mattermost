import fs from 'fs';
import { MattermostUser, ModifiableMattermostUser } from '../models/mattermost';
import fetch, { RequestInit } from 'node-fetch';
import { MATTERMOST_ADMIN_PAT, MATTERMOST_ADMIN_USER_ID, MATTERMOST_HOST } from '../constants';
import { getFileInfoFromFilePath, getFileSizeInBytes } from './file';
import { createMultipartFormData } from './formData';

const mattermostClient = (path: string, options: RequestInit) => {
  return fetch(`${MATTERMOST_HOST}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${MATTERMOST_ADMIN_PAT ?? ''}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};

export async function uploadToMattermostEmoji(filePath: string) {
  const { fileName: emojiName } = getFileInfoFromFilePath(filePath);
  const fileSizeInBytes = getFileSizeInBytes(filePath);
  const fileStream = fs.createReadStream(filePath);

  const { formData, headers } = createMultipartFormData({
    image: {
      value: fileStream,
      options: { knownLength: fileSizeInBytes },
    },
    emoji: {
      value: JSON.stringify({
        name: emojiName,
        creator_id: MATTERMOST_ADMIN_USER_ID,
      }),
    },
  });

  return mattermostClient(`/api/v4/emoji`, {
    method: 'POST',
    headers,
    body: formData,
  });
}

export async function getMattermostUsers(): Promise<MattermostUser[]> {
  const response = await mattermostClient('/api/v4/users?per_page=100', {
    method: 'GET',
  });
  return response.json();
}

export async function updateMattermostUser(userId: string, user: Partial<ModifiableMattermostUser>) {
  return mattermostClient(`/api/v4/users/${userId}/patch`, {
    method: 'PUT',
    body: JSON.stringify(user),
  });
}

export async function setMattermostUserProfile(userId: string, filePath: string) {
  const fileSizeInBytes = getFileSizeInBytes(filePath);
  const fileStream = fs.createReadStream(filePath);

  const { formData, headers } = createMultipartFormData({
    image: {
      value: fileStream,
      options: { knownLength: fileSizeInBytes },
    },
  });

  return mattermostClient(`/api/v4/users/${userId}/image`, {
    method: 'POST',
    headers,
    body: formData,
  });
}
