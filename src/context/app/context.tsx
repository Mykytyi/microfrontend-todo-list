import { createContext, Dispatch } from 'react';
import { initialAppState, InitialAppState } from './reducers';
import { AppActions } from './actions';

export const AppContext = createContext<{
  state: InitialAppState,
  dispatch: Dispatch<AppActions>
}>({
  state: initialAppState,
  dispatch: () => null
});
