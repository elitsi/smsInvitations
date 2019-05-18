
export type ENV_VARIABLES = 'MONGO_URL' | 'ACCOUNT_TOKEN' | 'ACCOUNT_SID' | 'ENV_NAME';

export type InvitedUserItem = {
    firstName: string
    lastName: string
    phoneNumber: string
    invited: number
  };