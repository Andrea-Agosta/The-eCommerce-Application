import { ChangeEvent } from "react";
import { IUser } from "../../../../../type/user";

interface ILoginState {
  handleChangeLogin(event: ChangeEvent<HTMLInputElement>): void;
  error: IUser;
}

function LoginForm({ handleChangeLogin, error }: ILoginState) {
  const inputStyle = "border p-2 rounded-lg my-1 focus:ring-orange-500 focus:ring-2 focus:outline-none"
  return (
    <div className="flex flex-col p-5 pb-0">
      <label htmlFor="email">Email:</label>
      <input placeholder={"email"} id="email" type="email" className={inputStyle} onChange={handleChangeLogin} />
      {error.email && <p className="text-red-500 text-xs mb-4">*please insert correct {error.email} </p>}
      <label htmlFor="password">Password:</label>
      <input placeholder={"password"} id="password" type='password' className={inputStyle} onChange={handleChangeLogin} />
      {error.password && <p className="text-red-500 text-xs">*please insert correct {error.password} </p>}
    </div>
  )
}

export default LoginForm;