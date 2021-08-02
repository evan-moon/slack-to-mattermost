export interface ModifiableMattermostUser {
  email: string;
  first_name: string;
  last_name: string;
  nickname: string;
  locale: string;
  position: string;
}

export interface MattermostUser extends ModifiableMattermostUser {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  username: string;
  auth_data: string;
  auth_service: string;
  roles: string;
  timezone: {
    automaticTimezone: string;
    manualTimezone: string;
    useAutomaticTimezone: string;
  };
  disable_welcome_email: boolean;
}
