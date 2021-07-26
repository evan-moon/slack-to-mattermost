import { WebClient } from '@slack/web-api';
import { SLACK_TOKEN } from '../constants';

const client = new WebClient(SLACK_TOKEN);

export async function getEmojiList() {
  const { emoji } = await client.emoji.list();
  return emoji;
}
