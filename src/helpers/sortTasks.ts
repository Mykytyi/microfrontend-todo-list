import { Task } from '../type-definitions';

export const sortTasksByDate = (one: Partial<Task>, two: Partial<Task>) => {
  if (one.createdAt && two.createdAt) {
    if (one?.createdAt > two.createdAt) return 1;
    if (one?.createdAt === two.createdAt) return 0;
    if (one?.createdAt < two.createdAt) return -1;
  }
  return 0;
}

export const sortTasksByDateAndCompletion = (one: Partial<Task>, two: Partial<Task>) => {
  if (one.createdAt && two.createdAt) {
    if (one.completed && two.completed) {
      if (one?.createdAt > two.createdAt) return 1;
      if (one?.createdAt === two.createdAt) return 0;
      if (one?.createdAt < two.createdAt) return -1;
    }
    if (one.completed && !two.completed) return 1
    if (!one.completed && two.completed) return -1
  }
  return 0;
}
