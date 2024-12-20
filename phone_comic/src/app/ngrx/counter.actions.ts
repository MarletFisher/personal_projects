import { createAction, props } from '@ngrx/store';
import { AccountSession } from '../types/AccountSession';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');

export const loginAction = createAction(
  '[Login] Login',
  props<{ account: AccountSession }>()
);

export const logoutAction = createAction('[Login] Logout');
