import fetch from 'node-fetch';

export interface LubyconUser {
  name: string;
  githubUserName: string;
  email: string;
  role: string;
  chapters: string[];
  teams: string[];
}

export async function fetchLubyconUsers(): Promise<LubyconUser[]> {
  const response = await fetch('https://assets.lubycon.io/data/lubyconUsers.json');
  return response.json();
}

export function getMultipleOrganizationString(prefix: string, organizations: string[]) {
  if (organizations.length === 0) {
    return '';
  }

  return `${prefix} ${organizations.join(', ')}`;
}

export function getPositionString(user: LubyconUser) {
  const teams = getMultipleOrganizationString('Team', user.teams);
  const chapters = getMultipleOrganizationString('Chapter', user.chapters);
  const role = user.role;

  return [teams, chapters, role].join(' | ');
}

export function isEmptyName(name: string) {
  return name.trim() === '';
}
export function isEnglishName(name: string) {
  return /[a-zA-Z-_]+/.test(name);
}
