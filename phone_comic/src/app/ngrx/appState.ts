import { AccountSession } from '../types/AccountSession';
import { LoginSession } from '../types/LoginSession';
import { counterState } from './counterState';

export interface AppState {
  counter: counterState;
  userSession: LoginSession;
}
