import { createReducer, on } from '@ngrx/store';
import { decrement, increment, reset } from '../counter.actions';

export const initialState = { count: 0 };

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, action) => ({ ...state, count: state.count + 1 })),
  on(decrement, (state, action) => ({ ...state, count: state.count - 1 })),
  on(decrement, (state, action) => ({ ...state, count: 0 }))
);
