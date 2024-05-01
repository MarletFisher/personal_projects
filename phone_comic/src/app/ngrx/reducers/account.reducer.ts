import { createReducer, on } from '@ngrx/store';
import { LoginSession } from 'src/app/types/LoginSession';
import { login, logout } from '../counter.actions';

export const initialState: LoginSession = {
  account: null,
  loginStatus: false,
};

export const loginReducer = createReducer(
  initialState,
  on(login, (state, { account }) => ({ ...state, account, loginStatus: true })),
  on(logout, (state) => ({ ...state, account: null, loginStatus: false }))
);
