import { v4 } from 'uuid';
import { Task } from '../../type-definitions';
import { LOCAL_STORAGE_ID } from '../../constants/constants';
import { tabTasksHandler } from '../../helpers/tabNumbers';

import type { AppActions } from './actions';

export type InitialAppState = {
  tasks: Array<Partial<Task>>,
  todayTasks: number,
  allTasks: number,
  completedTasks: number,
  uncompletedTasks: number,
}

export const initialAppState: InitialAppState = {
  tasks: [],
  todayTasks: 0,
  allTasks: 0,
  completedTasks: 0,
  uncompletedTasks: 0,
};

export function appReducer(state: typeof initialAppState, action: AppActions) {
  switch (action.type) {
    case "ADD_TASK":
      const newTasks = [...state.tasks];
      newTasks.push({
        id: v4(),
        task: '',
        completed: false,
        createdAt: new Date(),
      });

      localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(newTasks));

      return {
        ...state,
        tasks: newTasks,
        todayTasks: state.todayTasks + 1,
        uncompletedTasks: state.uncompletedTasks + 1,
        allTasks: state.allTasks + 1,
      }
    case "LOAD_TASKS":
      const dataFromStorage = localStorage.getItem(LOCAL_STORAGE_ID);
      let parsedData = [];

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
