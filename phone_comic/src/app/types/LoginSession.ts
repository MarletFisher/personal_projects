import { AccountSession } from './AccountSession';

export interface LoginSession {
  account: AccountSession | null;
  loginStatus: boolean;
}
