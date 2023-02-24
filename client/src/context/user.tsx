import { createContext, useState } from "react";
import { IUserState } from "../../../type/user";

interface IContextUser {
  user: IUserState,
  setUser: React.Dispatch<React.SetStateAction<IUserState>>,
}

interface IData {
  children: JSX.Element;
}

export const UserContext = createContext<IContextUser>({} as IContextUser);

export const UserContestProvider = ({ children }: IData) => {
  const [user, setUser] = useState<IUserState>({} as IUserState);
  return <UserContext.Provider value={{ user, setUser }}> {children} </UserContext.Provider>
};