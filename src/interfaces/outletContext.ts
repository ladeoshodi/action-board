import { IUser } from "./user";

export interface IOutletContext {
  user: IUser | null;
  setShouldRefreshUser: (arg: boolean) => void;
}
