import { WebClient } from '@slack/web-api';
import { SLACK_TOKEN } from '../constants';

const client = new WebClient(SLACK_TOKEN);

export async function getSlackEmojiList() {
  const { emoji } = await client.emoji.list();
  return emoji;
}

const excludedMember = ['Evan Test', '박수민2'];
export async function getSlackUsers() {
  const { members } = await client.users.list();
  return members
    ?.filter(member => {
      return (
        member.is_bot === false &&
        member.is_app_user === false &&
        member.profile?.email != null &&
        !excludedMember.includes(member.profile.display_name ?? '')
      );
    })
    .map(member => ({
      ...member,
      profileImage: (member.profile?.image_original ?? member.profile?.image_512 ?? '').replace(/\?s=.*$/, ''),
      email: member.profile?.email,
    }));
}
