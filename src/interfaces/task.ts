export interface ITask {
  id: number;
  name: string;
  description: string;
  due_date: string;
  done: boolean;
  tags: number[];
  user: number;
  task_list: number;
  created_at: string;
  updated_at: string;
}
