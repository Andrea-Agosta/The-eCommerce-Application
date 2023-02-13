import { ChangeEvent, Fragment, InputHTMLAttributes, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PersonCircle } from 'react-bootstrap-icons'
import RegistrationForm from './auth/RegistrationForm'
import LoginForm from './auth/LoginForm'
import { IBodyUserLogin } from '../../../type/user';

export const Modal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isRegisterrationButton, setIsRegisterrationButton] = useState<boolean>(false);
  const [login, setLogin] = useState<IBodyUserLogin>({} as IBodyUserLogin);
  const [registration, setRegistration] = useState<IBodyUserLogin>({} as IBodyUserLogin);

  const cancelButtonRef = useRef(null)

  const handleChangeLogin = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, id } = event.currentTarget;
    setLogin(prev => ({ ...prev, [id]: value }));
  };

  const handleChangeRegistration = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, id } = event.currentTarget;
    setRegistration(prev => ({ ...prev, [id]: value }));
  };

  return (
    <>
      <button
        className="p-3 p-lg-1 px-3 bg-white text-gray-700 hover:text-orange-400 text:xl w-11/12 my-5 mx-3 md:my-0 border-2 rounded-md border-orange-400 md:border-gray-700 hover:border-orange-400 md:border-none"
        onClick={() => setOpen(!open)}
      >
        <span className="flex">
          <PersonCircle className='text-4xl mt-0 md:mt-1 mr-4 md:mr-2 text-orange-400 hover:text-orange-600 md:text-gray-700' />
          <div className='flex flex-row md:flex-col text-left mt-1 md:mt-0'>Sign up
            <span className='ml-2 md:ml-0'>or Log In</span>
          </div>
        </span>
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto w-full">
            <div className={`${isRegisterrationButton ? 'flex min-h-[90%]' : 'flex min-h-[80%]'} lg:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 w-full`}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                  <div className="bg-white pt-5 sm:p-6 sm:pb-4 px-2 pb-0">
                    <div className='flex flex-row'>
                      <button
                        className={`bg-white  hover:text-orange-400 text:xl w-full py-2 ${isRegisterrationButton ? 'text-gray-700 border-b' : 'border border-b-0 rounded-t-lg text-orange-400'}`}
                        onClick={() => setIsRegisterrationButton(false)}
                      > Login</button>
                      <button
                        className={`bg-white hover:text-orange-400 text:xl w-full py-2 ${isRegisterrationButton ? 'border border-b-0 rounded-t-lg text-orange-400' : 'border-b  text-gray-700'}`}
                        onClick={() => setIsRegisterrationButton(true)}
                      > Registration </button>
                    </div>

                    {isRegisterrationButton ? <RegistrationForm handleChangeRegistration={handleChangeRegistration} /> : <LoginForm handleChangeLogin={handleChangeLogin} />}
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      {isRegisterrationButton ? 'Register' : 'LogIn'}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
