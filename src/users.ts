import { fetchLubyconUsers, getPositionString, isEmptyName, isEnglishName } from './utils/users';
import { OUT_DIR } from './constants';
import { downloadFile, getFileInfoFromFilePath } from './utils/file';
import { getMattermostUsers, setMattermostUserProfile, updateMattermostUser } from './utils/mattermost';
import { getSlackUsers } from './utils/slack';

function getSlackUsername(displayName?: string, realName?: string) {
  return isEnglishName(displayName ?? 'a') || isEmptyName(displayName ?? '') ? realName : displayName;
}

async function main() {
  const slackUsers = await getSlackUsers();
  const mattermostUsers = await getMattermostUsers();
  const lubyconUsers = await fetchLubyconUsers();

  const users =
    slackUsers?.map(slackUsers => {
      return {
        slack: slackUsers,
        mattermost: mattermostUsers.find(user => user.email === slackUsers.email),
        lubycon: lubyconUsers.find(user => user.email === slackUsers.email),
      };
    }) ?? [];

  console.log(users);

  await Promise.all(
    users.map(async ({ slack, mattermost, lubycon }) => {
      const { extension } = getFileInfoFromFilePath(slack.profileImage);
      const dest = `${OUT_DIR.users}/${slack.name}.${extension}`;
      const name = lubycon?.name ?? getSlackUsername(slack.profile?.display_name, slack.real_name);
      const [lastName, ...firstNames] = name?.split('') ?? [];

      await updateMattermostUser(mattermost?.id ?? '', {
        nickname: name,
        first_name: firstNames.join(''),
        last_name: lastName,
        position: lubycon != null ? getPositionString(lubycon) : '',
      });

      try {
        await downloadFile(dest, slack.profileImage);
        await setMattermostUserProfile(mattermost?.id ?? '', dest);
        console.log('Migratioin Finished -> ', name);
      } catch {
        console.log('Download Failed -> ', name);
      }
    }) ?? []
  );
}

main();
