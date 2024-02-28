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
    case "ADD_TASK": {
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
      }
    }
    case "LOAD_TASKS": {
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

      return {
        ...state,
        tasks: parsedData,
      };
    }
    case "UPDATE_STATUS": {
      const newTasks = state.tasks.map((item) => {
        if (item.id === action.id) {
          if (!item.completed) {
            return {
              ...item,
              completed: !item.completed,
              updatedAt: new Date(),
              completedAt: new Date(),
            }
          }
          return {
            ...item,
            completed: !item.completed,
            updatedAt: new Date(),
            completedAt: '',
          }
        }
        return item;
      });

      localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(newTasks));

      return {
        ...state,
        tasks: newTasks,
      }
    }
    case "UPDATE_TASK": {
      const newTasks = state.tasks.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            task: action.task,
          }
        }
        return item;
      });

      localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(newTasks));

      return {
        ...state,
        tasks: newTasks
      }
    }
    case "REMOVE_TASK": {
      const newTasks = state.tasks.filter((item) => item.id !== action.id);

      localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(newTasks));

      return {
        ...state,
        tasks: newTasks,
      }
    }
    case 'UPDATE_TABS_NUMBERS': {
      const {
        todayTasks,
        uncompletedTasks,
        completedTasks,
        allTasks,
      } = tabTasksHandler(state.tasks);

      return {
        ...state,
        todayTasks,
        uncompletedTasks,
        completedTasks,
        allTasks,
      }
    }
    default:
      return initialAppState;
  }
}
