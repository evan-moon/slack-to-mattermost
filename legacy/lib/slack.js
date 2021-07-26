const { WebClient } = require('@slack/web-api');

const SLACK_BOT_TOKEN = 'xoxb-1279458981345-1854914682992-0kcKmpYdEesdCYMaOyx3liDt';
const client = new WebClient(SLACK_BOT_TOKEN);

async function getEmojiList () {
  const { emoji } = await client.emoji.list();
  return emoji;
}

module.exports = {
  getEmojiList,
}