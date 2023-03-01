import { ChangeEvent, useContext, useEffect, useState } from "react";
import { IBodyUserLogin, IRegistrationUser } from "../../../../../type/user";
import { UserContext } from "../../../context/user";
import axios from 'axios';
import { decodeJwt } from "../../../utils/decodeJwt";
import { InputGroup } from "../InputGroup";
import { ButtonGroup } from "../ButtonGroup";


function LoginForm({ handleClose }: { handleClose: () => void }) {
  const [login, setLogin] = useState<IBodyUserLogin>({} as IBodyUserLogin);
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState<IRegistrationUser>({} as IRegistrationUser);
  const formInput = ["email", 'password'];

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, id } = event.currentTarget;
    setLogin(prev => ({ ...prev, [id]: value }));
  };

  const submitData = (): void => {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setError({} as IRegistrationUser);
    if (emailRegex.test(login.email) && login.password) {
      axios({
        method: 'post',
        url: 'http://localhost:8080/api/auth/login',
        data: login,
        withCredentials: true
      }).then((response) => {
        const cookieString = document.cookie;
        const data = decodeJwt(cookieString);
        setUser(data);
        response.data ? handleClose() : setError(prev => ({ ...prev, userNotFound: 'User Not Found' }));
      }).catch(() => {
        setError({} as IRegistrationUser);
        setError(prev => ({ ...prev, userNotFound: 'User Not Found' }));
      });
    };
    !emailRegex.test(login.email) && setError(prev => ({ ...prev, email: 'Plese insert a valid Email value' }));
    !login.password && setError(prev => ({ ...prev, password: 'Plese insert the Password value' }));
  }

  return (
    <>
      <section className="flex flex-col p-5">
        {formInput.map((input, index) => <InputGroup key={index} input={input} handleChange={handleChange} error={error} />)}
        {error?.userNotFound && <p className="text-red-500 text-sm text-center p-3 border-y border-red-500 bg-red-100 mb-3"> {error.userNotFound} </p>}
      </section>
      <ButtonGroup name='LogIn' submitData={submitData} handleClose={handleClose} />
    </>
  )
}

export default LoginForm;