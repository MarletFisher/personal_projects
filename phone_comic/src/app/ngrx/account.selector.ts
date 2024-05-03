import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginSession } from '../types/LoginSession';

const selectAppState = createFeatureSelector<LoginSession>('userSession');

export const selectUserSession = createSelector(
  selectAppState,
  (state) => state
);

export const selectloginStatus = createSelector(
  selectAppState,
  (state) => state.loginStatus
);
