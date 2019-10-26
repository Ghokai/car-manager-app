import { TaskType } from "./TaskType";

export type TaskInput = {
  taskType: TaskType | "";
  comment: string;
};

export type Task = TaskInput & {
  id: string;
  completed: boolean;
};
