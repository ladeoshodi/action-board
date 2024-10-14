import { ITag } from "./tag";
import { ITask } from "./task";
import { ITaskList } from "./tasklist";

export interface IUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_img?: string;
  date_joined: string;
  updated_at: string;
  lists: ITaskList[];
  tasks: ITask[];
  tags: ITag[];
}
