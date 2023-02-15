import { ChangeEvent, useState } from "react";
import { IRegistrationUser } from "../../../../type/user";

interface IRegistrationState {
  handleChangeRegistration(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void;
  error: IRegistrationUser;
}

function NewUserForm({ handleChangeRegistration, error }: IRegistrationState) {
  const [role, setRole] = useState<string>("user")
  const inputStyle = 'p-2 border rounded-lg my-1 focus:ring-orange-500 focus:ring-2 focus:outline-none';
  const errorStyle = 'text-red-500 text-xs mb-2';

  return (
    <div className="flex flex-col p-3">
      <label htmlFor="email_input">Email:</label>
      <input className={inputStyle} placeholder={"email"} id={"email"} onChange={handleChangeRegistration} />
      {error.email && <p className={errorStyle}>*please insert a valid {error.email}</p>}
      <label htmlFor="password_input">Password:</label>
      <input className={inputStyle} type='password' placeholder={"password"} id={"password"} onChange={handleChangeRegistration} />
      {error.password && <p className={errorStyle}>*please insert correct {error.password}</p>}
      <label htmlFor="confirmed_password_input">Confirm password:</label>
      <input className={inputStyle} placeholder={"confirm password"} type='password' id={"confirmed_password"} onChange={handleChangeRegistration} />
      {error.confirmed_password && <p className={errorStyle}>*{error.confirmed_password}</p>}
      <label htmlFor="type_input">Type of User:</label>
      <select className={inputStyle} placeholder={"user"} id={"role"} onChange={(e) => { setRole(e.currentTarget.value), handleChangeRegistration(e) }}>
        <option value={"user"}>User</option>
        <option value={"admin"}>Admin</option>
      </select>
      {
        role === 'admin' && <>
          <label htmlFor="storeName">Store Name:</label>
          <input className={inputStyle} placeholder={"Name Store"} id={"storeName"} onChange={handleChangeRegistration} />
          {error.storeName && <p className={errorStyle}>*{error.storeName}</p>}
        </>
      }
    </div >
  )
}

export default NewUserForm;