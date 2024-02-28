type LoadTasks = {
  type: 'LOAD_TASKS',
}

type AddTask = {
  type: 'ADD_TASK',
}

type RemoveTask = {
  type: 'REMOVE_TASK',
  id: string,
}

type UpdateStatus = {
  type: 'UPDATE_STATUS',
  id: string,
}


type UpdateTask = {
  type: 'UPDATE_TASK',
  id: string,
  task: string,
}

type UpdateTabsNumbers = {
  type: 'UPDATE_TABS_NUMBERS',
}

export type AppActions = LoadTasks
  | AddTask
  | RemoveTask
  | UpdateStatus
  | UpdateTabsNumbers
  | UpdateTask;

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

export const removeTask = (id: string): RemoveTask => {
  return {
    type: 'REMOVE_TASK',
    id,
  }
};

export const updateStatus = (id: string): UpdateStatus => {
  return {
    type: 'UPDATE_STATUS',
    id,
  }
};
export const updateTask = (id: string, task: string): UpdateTask => {
  return {
    type: 'UPDATE_TASK',
    id,
    task,
  }
};

export const updateTabsNumbers = (): UpdateTabsNumbers => {
  return {
    type: 'UPDATE_TABS_NUMBERS'
  }
};
