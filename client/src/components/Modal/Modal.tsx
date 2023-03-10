import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Pencil, PersonCircle, Trash3 } from 'react-bootstrap-icons'
import { AddItemForm } from './StoreItemModal/AddItemForm'
import { UpdateItemForm } from './StoreItemModal/UpdateItemForm'
import { DeleteItem } from './StoreItemModal/DeleteItem'
import { IProduct } from '../../../../type/product'
import { DeleteStore } from './StoreItemModal/DeleteStore'
import { IStore } from '../../../../type/store'
import { AuthModalBody } from './auth/AuthModalBody'
import { IUser } from '../../../../type/user'
import { UpdateUserData } from './auth/UpdateUserData'

export const Modal = ({ type, data }: { type: string, data: IProduct | IStore | IUser }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isRegistrationButton, setIsRegistrationButton] = useState<boolean>(false);
  const modalAuthButton: string = "p-3 p-lg-1 px-3 bg-white text-violet-500 md:text-black hover:text-orange-400 w-11/12 my-5 mx-3 md:my-0 border-2 rounded-md border-violet-400 md:border-gray-700 hover:border-orange-400 md:border-none group";
  const modalAddItemButton = "text-4xl font-bold text-white bg-black rounded-full w-14 h-14 pb-1 hover:bg-orange-400";
  const modalCheckoutButton = "p-3 p-lg-1 px-3 bg-white text-violet-500 hover:text-orange-400 w-11/12 my-5 mx-3 border-2 rounded-md border-violet-400 hover:border-orange-400 flex justify-center md:text-orange-400 md:border-orange-400 md:hover:bg-orange-400 md:hover:text-white"

  const handleClose = () => setOpen(false);
  const buttonClick = (event: React.MouseEvent<HTMLButtonElement>) => event.currentTarget.name === 'registation' ? setIsRegistrationButton(true) : setIsRegistrationButton(false);

  return (
    <>
      {
        {
          'auth': <button className={modalAuthButton} onClick={() => setOpen(!open)}>
            <span className="flex">
              <PersonCircle className='text-4xl mt-0 md:mt-1 mr-4 md:mr-2 text-orange-400 md:text-gray-700 group-hover:text-orange-400' />
              <div className='flex flex-row md:flex-col text-left mt-1 md:mt-0 group-hover:text-orange-400'>Sign up
                <span className='ml-2 md:ml-0'>or Log In</span>
              </div>
            </span>
          </button>,
          'addProduct': <button className={modalAddItemButton} onClick={() => setOpen(!open)}> + </button>,
          'updateProduct': <Pencil className='text-2xl cursor-pointer hover:text-orange-400' onClick={() => setOpen(!open)} />,
          'deleteProduct': <Trash3 className='cursor-pointer text-2xl ml-4 hover:text-orange-400' onClick={() => setOpen(!open)} />,
          'deleteStore': <Trash3 className='cursor-pointer text-2xl relative right-5 hover:text-orange-400' onClick={() => setOpen(!open)} />,
          'checkout': <button className={modalCheckoutButton} onClick={() => setOpen(!open)} >,
            <PersonCircle className='text-4xl mt-0 mr-4 group-hover:text-orange-400' />
            <div className='flex flex-row text-left mt-1 group-hover:text-orange-400'>Sign up or Log In</div>
          </button>,
          // 'user': <button className='text-gray-700 block px-4 py-2 text-sm' onClick={() => setOpen(!open)} > Edit Profile </button>,
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
                      'auth': <AuthModalBody handleClose={handleClose} buttonClick={buttonClick} isRegistrationButton={isRegistrationButton} />,
                      'addProduct': <AddItemForm handleClose={handleClose} />,
                      'updateProduct': <UpdateItemForm product={data as IProduct} handleClose={handleClose} />,
                      'deleteProduct': <DeleteItem product={data as IProduct} handleClose={handleClose} />,
                      'deleteStore': <DeleteStore store={data as IStore} handleClose={handleClose} />,
                      'checkout': <AuthModalBody handleClose={handleClose} buttonClick={buttonClick} isRegistrationButton={isRegistrationButton} />,
                      // 'user': <UpdateUserData handleClose={handleClose} />,
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
