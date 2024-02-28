import React, { useContext } from 'react';
import { AppContext } from '../context/app';
import { InitialAppState } from '../context/app/reducers';
import { AppActions } from '../context/app/actions';

interface CustomStateProps {
  (): InitialAppState
}

interface AppDispatchProps {
  (): React.Dispatch<AppActions>
}

export const useCustomState: CustomStateProps = () => {
  const { state } = useContext(AppContext);

  if (state === undefined) {
    throw new Error("useCustomState must be used within AppContext")
  }

  return state;
};

export const useAppDispatch: AppDispatchProps = () => {
  const { dispatch } = useContext(AppContext);

  if (dispatch === undefined) {
    throw new Error("useAppState must be used within AppContext")
  }

  return dispatch;
};
