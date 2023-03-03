import { useState, ChangeEvent, useContext } from 'react'
import { PersonCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { IRegistrationUser, IUser, IUserState } from '../../../../../type/user';
import { UserContext } from '../../../context/user';
import { restCall } from '../../../utils/restCall';
import { ButtonGroup } from '../ButtonGroup';
import { InputGroup } from '../InputGroup';

export const UpdateUserData = ({ handleClose }: { handleClose: () => void }) => {
  const formInput = ["email", 'password'];
  const [updateData, setUpdateData] = useState<IUser>({ role: 'user' } as IUser);
  const [error, setError] = useState<IRegistrationUser>({} as IRegistrationUser);
  const inputStyle = 'p-2 border rounded-lg my-1 focus:ring-orange-500 focus:ring-2 focus:outline-none';
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
    const { value, id } = event.currentTarget;
    setUpdateData(prev => ({ ...prev, [id]: value }));
  };

  const submitData = () => {
    event?.preventDefault();
    console.log(updateData, 'updateData')

    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setError({} as IRegistrationUser);
    if (emailRegex.test(updateData.email) && updateData.password && updateData.role) {
      if (updateData.role === "admin") {
        const cookieString = document.cookie;
        const headers = { Authorization: `Bearer ${cookieString.split('=')[1]}` }
        if (updateData.storeName) {
          restCall('get', `user/email/${updateData.email}`, { role: updateData.role }, headers)
            //   axios({
            //     method: 'post',
            //     url: 'http://localhost:8080/api/auth/signup',
            //     data: {
            //       email: updateData.email,
            //       password: updateData.password,
            //       role: updateData.role,
            //       storeName: updateData.storeName
            //     }
            // })
            .then(() => {
              // document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // setUser({} as IUserState);
              // navigate('/');
              // window.location.reload();

            }).catch(() => {
              setError({} as IRegistrationUser);
              setError(prev => ({ ...prev, userNotFound: "Somthing goes wrong, please try again!" }));
            });
          // }
          // return setError(prev => ({ ...prev, storeName: "the store name" }));
        }

        // axios({
        //   method: 'post',
        //   url: 'http://localhost:8080/api/auth/signup',
        //   data: {
        //     email: updateData.email,
        //     password: updateData.password,
        //     role: updateData.role
        //   },
        // }).then(() => {
        //   document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        //   setUser({} as IUserState);
        //   navigate('/');
        //   window.location.reload();
        // }).catch(() => {
        //   setError({} as IRegistrationUser);
        //   setError(prev => ({ ...prev, userNotFound: "Somthing goes wrong, please try again!" }));
        // });
      };
      !emailRegex.test(updateData.email) && setError(prev => ({ ...prev, email: "Plese insert a valid Email value" }));
      !updateData.password && setError(prev => ({ ...prev, password: "Plese insert the Password value" }));
      (updateData.role === 'admin' && !updateData.storeName) && setError(prev => ({ ...prev, storeName: "The name of the store can't be Empity" }));
    };
  }

  return (
    <>
      <header className='flex p-5 border bg-gray-50'>
        <PersonCircle className='text-3xl text-orange-400 mr-4' />
        <h1 className='text-xl pt-[2px]'>Update your data</h1>
      </header>
      <section className="flex flex-col py-5 px-10">
        {formInput.map((input, index) => <InputGroup key={index} input={input} handleChange={handleChange} error={error} defaltValue='' />)}
        <label htmlFor="role">Role:</label>
        <select className={inputStyle} placeholder={"user"} id={"role"} onChange={(e) => handleChange(e)}>
          <option value={"user"}>User</option>
          <option value={"admin"}>Admin</option>
        </select>
        {
          user.user.role === 'admin' && <>
            <label htmlFor="storeName">Store Name:</label>
            <input className={inputStyle} placeholder={"Name Store"} id={"storeName"} onChange={handleChange} />
            {error.storeName && <p className='text-red-500 text-xs mb-2'>*{error.storeName}</p>}
          </>
        }
        {error?.userNotFound && <p className="text-red-500 text-sm text-center p-3 border-y border-red-500 bg-red-100 mb-3"> {error.userNotFound} </p>}
      </section >
      <ButtonGroup name='Update' submitData={submitData} handleClose={handleClose} />
    </>
  )
}
