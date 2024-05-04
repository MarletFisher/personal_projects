import { createReducer, on } from '@ngrx/store';
import { LoginSession } from 'src/app/types/LoginSession';
import { loginAction, logoutAction } from '../counter.actions';

export const initialState: LoginSession = {
  account: null,
  loginStatus: false,
};

export const loginReducer = createReducer(
  initialState,
  on(loginAction, (state, { account }) => ({
    ...state,
    account,
    loginStatus: true,
  })),
  on(logoutAction, (state) => ({ ...state, account: null, loginStatus: false }))
);
