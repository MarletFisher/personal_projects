import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { LoginSession } from '../types/LoginSession';

const selectLoginState = createFeatureSelector<any>('userSession');

export const selectLoginStatus = createSelector(
  selectLoginState,
  (state) => state.loginStatus
);

export const selectAccountSession = createSelector(
  selectLoginState,
  (state) => state.account
);
