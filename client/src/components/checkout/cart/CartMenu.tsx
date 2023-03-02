import { Fragment, useContext, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Cart4 } from 'react-bootstrap-icons'
import { CartItemsContext } from '../../../context/cart'
import { CartItem } from './CartItem'
import { UserContext } from '../../../context/user'
import { Modal } from '../../Modal/Modal'
import { IProduct } from '../../../../../type/product'
import { Link } from 'react-router-dom'

export const CartMenu = () => {
  const [open, setOpen] = useState(false)
  const [numberItems, setNumberItems] = useState<number>(0);
  const { cartItems } = useContext(CartItemsContext);
  const [total, setTotal] = useState<string>('$ 0');
  const { user } = useContext(UserContext);
  const linkStyleCheckout: string = "p-3 p-lg-1 px-3 text-white hover:text-orange-400 w-11/12 my-5 mx-3 border-2 rounded-md bg-orange-400 hover:bg-white border-transparent hover:border-orange-400 flex justify-center";

  const setNumberOfItemsOnCart = async () => {
    let countItems = 0
    await cartItems.map(item => countItems += item.quantity);
    return countItems;
  }

  useEffect(() => {
    setNumberOfItemsOnCart().then(resp => setNumberItems(resp));
    setTotal(cartItems.reduce((acc, item) => acc + Number(item.total.slice(2)), 0).toFixed(2));
  }, [cartItems])

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <Cart4 className='text-3xl ml-4' />
        {numberItems > 0 && <span className='relative bottom-4 left-7 bg-red-500 text-white py-1 px-2 rounded-full'>{numberItems}</span>}
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-lg font-medium text-gray-900 flex justify-between">Your Cart <Cart4 className='mt-1' /></Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6 border-t-2">
                        {cartItems.map((item, index) => <CartItem key={index} item={item} />)}
                      </div>
                      <div className='border-t-2'>
                        <div className='flex font-bold justify-between p-5 pb-0'>
                          <h3>Total</h3>
                          <h3>{total}</h3>
                        </div>
                        {user.user ? <Link to={'/checkout'} className={linkStyleCheckout} onClick={() => setOpen(false)}> Checkout </Link> : <Modal type='checkout' data={{} as IProduct} />}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}


