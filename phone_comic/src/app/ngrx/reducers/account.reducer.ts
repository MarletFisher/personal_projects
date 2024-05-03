import { createReducer, on } from '@ngrx/store';
import { LoginSession } from 'src/app/types/LoginSession';
import { loginAction, logout } from '../counter.actions';

export const initialState: LoginSession = {
  account: null,
  loginStatus: false,
};

export const loginReducer = createReducer(
  initialState,
  on(loginAction, (state, { account }) => ({
    ...state,
    account: account,
    loginStatus: true,
  })),
  on(logout, (state) => ({ ...state, account: null, loginStatus: false }))
);
