import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginSession } from '../types/LoginSession';

const selectLoginState = createFeatureSelector<LoginSession>('appState');

export const selectLoginStatus = createSelector(
  selectLoginState,
  (state) => state.loginStatus
);

export const selectAccount = createSelector(
  selectLoginState,
  (state) => state.account
);
