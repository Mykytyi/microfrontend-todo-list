import type { AppActions, Message } from './actions';

export type InitialAppState = {
  messages: Array<Message>,
}

export const initialAppState: InitialAppState = {
  messages: [],
};

export function appReducer(state: typeof initialAppState, action: AppActions) {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.message],
      }
    case "REMOVE_MESSAGE":
      const newArray = [...state.messages];
      newArray.pop();
      return {
      ...state,
      messages: [...newArray],
    }
    default:
      return initialAppState;
  }
}
