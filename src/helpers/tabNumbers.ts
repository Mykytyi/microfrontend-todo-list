import { Task } from '../type-definitions';

type TabTasksHandler = {
  todayTasks: number,
  allTasks: number,
  completedTasks: number,
  uncompletedTasks: number,
}

export const tabTasksHandler = (tasks: Array<Partial<Task>> | undefined): TabTasksHandler => {
  let todayTasks = 0;
  let allTasks = tasks?.length || 0;
  let completedTasks = 0;
  let uncompletedTasks = 0;

  tasks?.forEach((element) => {
    const today = new Date().getDate();
    if (element.completed) {
      completedTasks += 1;
    } else {
      uncompletedTasks += 1;
    }

    if (element.createdAt && new Date(element.createdAt).getDate() === today) {
      todayTasks += 1;
    }
  });

  return {
    todayTasks,
    allTasks,
    completedTasks,
    uncompletedTasks,
  }
}
