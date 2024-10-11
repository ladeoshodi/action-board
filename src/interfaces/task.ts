export interface ITask {
  id: string;
  name: string;
  description: string;
  due_date: string;
  done: boolean;
  tags: number[];
  user: number;
  task_list: boolean;
  created_at: string;
  updated_at: string;
}
