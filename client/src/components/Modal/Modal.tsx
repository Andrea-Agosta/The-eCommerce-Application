import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Pencil, PersonCircle, Trash3 } from 'react-bootstrap-icons'
import RegistrationForm from './auth/RegistrationForm'
import LoginForm from './auth/LoginForm'
import { AddItemForm } from './StoreItemModal/AddItemForm'
import { UpdateItemForm } from './StoreItemModal/UpdateItemForm'
import { DeleteItemForm } from './StoreItemModal/DeleteItemForm'
import { IProduct } from '../../../../type/product'

export const Modal = ({ type, product }: { type: string, product: IProduct }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isRegistrationButton, setIsRegistrationButton] = useState<boolean>(false);
  const modalAuthButton: string = "p-3 p-lg-1 px-3 bg-white text-violet-500 md:text-black hover:text-orange-400 text:xl w-11/12 my-5 mx-3 md:my-0 border-2 rounded-md border-violet-400 md:border-gray-700 hover:border-orange-400 md:border-none group";
  const modalAddItemButton = "text-4xl font-bold text-white bg-black rounded-full w-14 h-14 pb-1 hover:bg-orange-400";

  const handleClose = () => setOpen(false);

  return (
    <>
      {
        {
          'auth': <button
            className={modalAuthButton}
            onClick={() => setOpen(!open)}
          >
            <span className="flex">
              <PersonCircle className='text-4xl mt-0 md:mt-1 mr-4 md:mr-2 text-orange-400 md:text-gray-700 group-hover:text-orange-400' />
              <div className='flex flex-row md:flex-col text-left mt-1 md:mt-0 group-hover:text-orange-400'>Sign up
                <span className='ml-2 md:ml-0'>or Log In</span>
              </div>
            </span>
          </button>,
          'addProduct': <button className={modalAddItemButton} onClick={() => setOpen(!open)}> + </button>,
          'updateProduct': <Pencil className='text-2xl cursor-pointer hover:text-orange-400' onClick={() => setOpen(!open)} />,
          'deleteProduct': <Trash3 className='cursor-pointer text-2xl ml-4 hover:text-orange-400' onClick={() => setOpen(!open)} />
        }[type]
      }
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
            <div className={`${isRegistrationButton ? 'flex min-h-[90%]' : 'flex min-h-[80%]'} lg:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 w-full`}>
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
                  {
                    {
                      'auth': <div className="bg-white pt-5 sm:p-6 sm:pb-4 px-2 pb-0">
                        <div className='flex flex-row'>
                          <button
                            className={`bg-white  hover:text-orange-400 text:xl w-full py-2 ${isRegistrationButton ? 'text-gray-700 border-b' : 'border border-b-0 rounded-t-lg text-orange-400'}`}
                            onClick={() => setIsRegistrationButton(false)}
                          > Login</button>
                          <button
                            className={`bg-white hover:text-orange-400 text:xl w-full py-2 ${isRegistrationButton ? 'border border-b-0 rounded-t-lg text-orange-400' : 'border-b  text-gray-700'}`}
                            onClick={() => setIsRegistrationButton(true)}
                          > Registration </button>
                        </div>
                        {isRegistrationButton ? <RegistrationForm handleClose={handleClose} /> : <LoginForm handleClose={handleClose} />}
                      </div>,
                      'addProduct': <AddItemForm handleClose={handleClose} />,
                      'updateProduct': <UpdateItemForm product={product} handleClose={handleClose} />,
                      'deleteProduct': <DeleteItemForm product={product} handleClose={handleClose} />,
                    }[type]
                  }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
