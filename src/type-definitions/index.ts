
export interface Task {
  id: string;
  task: string;
  completed: boolean;
  createdAt: string | Date;
  updatedAt: null | string | Date;
  completedAt: null | string | Date;
}


