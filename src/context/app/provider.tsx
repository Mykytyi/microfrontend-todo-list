import { useReducer } from 'react';

import type { ReactNode } from 'react';

import { AppContext } from './context';
import { appReducer, initialAppState } from './reducers';

type Props = {
  children: ReactNode
}

export const AppProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
}
