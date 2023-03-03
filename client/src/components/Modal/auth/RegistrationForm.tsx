import { ChangeEvent, useState, useContext } from "react";
import { IRegistrationUser } from "../../../../../type/user";
import axios from 'axios';
import { decodeJwt } from "../../../utils/decodeJwt";
import { UserContext } from "../../../context/user";
import { InputGroup } from "../InputGroup";
import { ButtonGroup } from "../ButtonGroup";

interface IRegistrationState {
  handleClose: () => void;
}

function NewUserForm({ handleClose }: IRegistrationState) {
  const [registration, setRegistration] = useState<IRegistrationUser>({ role: 'user' } as IRegistrationUser);
  const [error, setError] = useState<IRegistrationUser>({} as IRegistrationUser);
  const { setUser } = useContext(UserContext);
  const formInput = ["email", 'password', 'confirmed_password'];
  const inputStyle = 'p-2 border rounded-lg my-1 focus:ring-orange-500 focus:ring-2 focus:outline-none';
  const errorStyle = 'text-red-500 text-xs mb-2';

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
    const { value, id } = event.currentTarget;
    setRegistration(prev => ({ ...prev, [id]: value }));
  };

  const submitData = (): void => {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setError({} as IRegistrationUser);
    if (emailRegex.test(registration.email) && registration.password && registration.password === registration.confirmed_password && registration.role) {
      if (registration.role === "Admin") {
        if (registration.storeName) {
          axios({
            method: 'post',
            url: 'http://localhost:8080/api/auth/signup',
            data: {
              email: registration.email,
              password: registration.password,
              role: registration.role,
              storeName: registration.storeName
            },
            withCredentials: true
          }).then(function (response) {
            const cookieString = document.cookie;
            const data = decodeJwt(cookieString);
            setUser(data);
            response.data ? handleClose() : setError(prev => ({ ...prev, userNotFound: "User Not Found" }));
          }).catch(() => {
            setError({} as IRegistrationUser);
            setError(prev => ({ ...prev, userNotFound: "Somthing goes wrong, please try again!" }));
          });
        }
        return setError(prev => ({ ...prev, storeName: "the store name" }));
      }

      axios({
        method: 'post',
        url: 'http://localhost:8080/api/auth/signup',
        data: {
          email: registration.email,
          password: registration.password,
          role: registration.role
        },
        withCredentials: true
      }).then(function (response) {
        const cookieString = document.cookie;
        const data = decodeJwt(cookieString);
        setUser(data);
        response.data ? handleClose : setError(prev => ({ ...prev, userNotFound: "User Not Found" }));
      }).catch(() => {
        setError({} as IRegistrationUser);
        setError(prev => ({ ...prev, userNotFound: "Somthing goes wrong, please try again!" }));
      });
    };
    !emailRegex.test(registration.email) && setError(prev => ({ ...prev, email: "Plese insert a valid Email value" }));
    !registration.password && setError(prev => ({ ...prev, password: "Plese insert the Password value" }));
    !registration.confirmed_password && setError(prev => ({ ...prev, confirmed_password: "Please confirm your Password" }));
    registration.password !== registration.confirmed_password && setError(prev => ({ ...prev, confirmed_password: "Password are be the same" }));
    (registration.role === 'admin' && !registration.storeName) && setError(prev => ({ ...prev, storeName: "The name of the store can't be Empity" }));
  };

  return (
    <>
      <section className="flex flex-col p-3">
        {formInput.map((input, index) => <InputGroup key={index} input={input} handleChange={handleChange} error={error} defaltValue='' />)}
        <label htmlFor="role">Role:</label>
        <select className={inputStyle} placeholder={"user"} id={"role"} onChange={(e) => handleChange(e)}>
          <option value={"user"}>User</option>
          <option value={"admin"}>Admin</option>
        </select>
        {
          registration.role === 'admin' && <>
            <label htmlFor="storeName">Store Name:</label>
            <input className={inputStyle} placeholder={"Name Store"} id={"storeName"} onChange={handleChange} />
            {error.storeName && <p className={errorStyle}>*{error.storeName}</p>}
          </>
        }
        {error?.userNotFound && <p className="text-red-500 text-sm text-center p-3 border-y border-red-500 bg-red-100 mb-3"> {error.userNotFound} </p>}
      </section >
      <ButtonGroup name='Register' submitData={submitData} handleClose={handleClose} />
    </>
  )
}

export default NewUserForm;