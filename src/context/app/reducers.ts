import type { AppActions, Message } from './actions';
import { Task } from '../../type-definitions';
import { LOCAL_STORAGE_ID } from '../../constants/constants';
import { tabTasksHandler } from '../../helpers/tabNumbers';

export type InitialAppState = {
  messages: Array<Message>,
  tasks: Array<Partial<Task>>,
  todayTasks: number,
  allTasks: number,
  completedTasks: number,
  uncompletedTasks: number,
}

export const initialAppState: InitialAppState = {
  messages: [],
  tasks: [],
  todayTasks: 0,
  allTasks: 0,
  completedTasks: 0,
  uncompletedTasks: 0,
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
    case "LOAD_TASKS":
      const dataFromStorage = localStorage.getItem(LOCAL_STORAGE_ID);
      let parsedData;

      try {
        if (dataFromStorage) {
          parsedData = JSON.parse(dataFromStorage)
        }
      } catch (e) {
        console.error('Could not parse data from local storage: ', e);
        return {
          ...state,
        }
      }

      const {
        todayTasks,
        uncompletedTasks,
        completedTasks,
        allTasks,
      } = tabTasksHandler(parsedData)

      return {
        ...state,
        tasks: parsedData,
        todayTasks,
        uncompletedTasks,
        completedTasks,
        allTasks
      };
    default:
      return initialAppState;
  }
}
