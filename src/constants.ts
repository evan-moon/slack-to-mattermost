import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../.env' });

export const OUT_DIR = path.join(__dirname, '../out');
export const MATTERMOST_HOST = process.env.MATTERMOST_HOST;
export const MATTERMOST_ADMIN_PAT = process.env.MATTERMOST_ADMIN_PAT;
export const MATTERMOST_ADMIN_USER_ID = process.env.MATTERMOST_ADMIN_USER_ID;
export const SLACK_TOKEN = process.env.SLACK_TOKEN;
