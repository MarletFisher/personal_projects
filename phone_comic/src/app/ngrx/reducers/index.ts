import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { loginReducer } from './account.reducer';
import { AppState } from '../appState';

// import { isDevMode } from '@angular/core';
// import {
//   ActionReducer,
//   ActionReducerMap,
//   createFeatureSelector,
//   createSelector,
//   MetaReducer
// } from '@ngrx/store';
// import { counterReducer } from './counter.reducer';

// export interface State {}

export const reducers: ActionReducerMap<AppState> = {
  counter: counterReducer,
  userSession: loginReducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
