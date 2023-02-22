import { createContext, useState } from "react";
import { IBodyUser } from "../../../type/user";

interface IContextUser {
  user: IBodyUser,
  setUser: React.Dispatch<React.SetStateAction<IBodyUser>>,
}

interface IData {
  children: JSX.Element;
}

export const UserContext = createContext<IContextUser>({} as IContextUser);

export const UserContestProvider = ({ children }: IData) => {
  const [user, setUser] = useState<IBodyUser>({} as IBodyUser);
  return <UserContext.Provider value={{ user, setUser }}> {children} </UserContext.Provider>
};