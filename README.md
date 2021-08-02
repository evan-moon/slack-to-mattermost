# Slack to Mattermost 📦
Small script to move to Mattermost from Slack.

## Installation
```sh
$ git clone https://github.com/evan-moon/slack-to-mattermost.git
$ cd slack-emoji-to-mattermost
$ yarn
```

## Set your own environment
This script uses Slack and Mattermost's API to move your emojis.
Therefore you have to provide some variables to authenticate before move your emojis.

```sh
$ cd slack-to-mattermost
$ touch .env
```

```env
# .env

MATTERMOST_HOST=https://your.mattermost.host
MATTERMOST_ADMIN_PAT=123123
MATTERMOST_ADMIN_USER_ID=123123
SLACK_TOKEN=123123
```

| Name | Description |
|:---|:---|
| `MATTERMOST_HOST` | Your Mattermost server host |
| `MATTERMOST_ADMIN_PAT` | Your Mattermost user's Personal Access Token. |
| `MATTERMOST_ADMIN_USER_ID` |  Your Mattermost user Id |
| `SLACK_TOKEN` | Bot Token or User Token. Bot Tokens start with `xoxb` and User Tokens are `xoxp`. This token must contain `emoji:read` scope. | 

If you don't know how to generate this tokens, please check these docs.
- [Mattermost Personal Access Tokens](https://docs.mattermost.com/developer/personal-access-tokens.html) (If you can't issue a token in your Mattermost app, contact your system administrator.)
- [Slack Tokens](https://api.slack.com/authentication/token-types)

# Migration
```sh
$ yarn migrate:emoji
# or...
$ yarn migrate:users
```
