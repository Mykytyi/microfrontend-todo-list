type LoadTasks = {
  type: 'LOAD_TASKS',
}

type AddTask = {
  type: 'ADD_TASK',
}

export type AppActions = LoadTasks | AddTask;

export const loadTasks = (): LoadTasks => {
  return {
    type: 'LOAD_TASKS',
  }
};

export const addTask = (): AddTask => {
  return {
    type: 'ADD_TASK',
  }
};

