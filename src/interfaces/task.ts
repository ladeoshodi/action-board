import { ITag } from "./tag";
import { ITaskList } from "./tasklist";

export interface ITask {
  id: number;
  name: string;
  description: string;
  due_date: string;
  done: boolean;
  tags: ITag[];
  user: number;
  task_list: ITaskList;
  created_at: string;
  updated_at: string;
}
