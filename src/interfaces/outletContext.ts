import { IUser } from "./user";

export interface IOutletContext {
  user: IUser | null;
  setIsUserRefresh: (arg:boolean) => void;
}
