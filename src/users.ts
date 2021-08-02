import { OUT_DIR } from './constants';
import { downloadFile, getFileInfoFromFilePath } from './utils/file';
import { getMattermostUsers, setMattermostUserProfile, updateMattermostUser } from './utils/mattermost';
import { getSlackUsers } from './utils/slack';

async function main() {
  const slackUsers = await getSlackUsers();
  const mattermostUsers = await getMattermostUsers();
  console.log(mattermostUsers.length);
  const users =
    slackUsers?.map(user => {
      return {
        slack: user,
        mattermost: mattermostUsers.find(mattermostUser => mattermostUser.email === user.email),
      };
    }) ?? [];

  console.log(users);

  await Promise.all(
    users.map(async ({ slack, mattermost }) => {
      const { extension } = getFileInfoFromFilePath(slack.profileImage);
      const dest = `${OUT_DIR.users}/${slack.name}.${extension}`;
      console.log(dest);

      const name = /[a-zA-Z]/.test(slack?.real_name ?? 'a') ? slack.profile?.display_name : slack.real_name;

      await updateMattermostUser(mattermost?.id ?? '', {
        nickname: name,
        first_name: '',
        last_name: '',
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
