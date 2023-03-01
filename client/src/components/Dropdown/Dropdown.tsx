import { Fragment, useContext } from 'react'
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Category } from './Category';
import { PersonCircle } from 'react-bootstrap-icons';
import { UserContext } from '../../context/user';
import { UserMenu } from './UserMenu';

export const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

export const Dropdown = ({ props, name }: { props: string[], name: string }) => {
  const { user } = useContext(UserContext);

  return (
    <Menu as="div" className={name === 'user' ? 'm-5' : "relative inline-block text-left"} >
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          {(name === 'user' && user.user) ? <> <PersonCircle className='text-xl mt-0 mr-4 md:mr-2 text-orange-400 md:text-gray-700 hover:text-orange-400' /> {user.user.email.split('@')[0]}</> : '...more'}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {(name === 'user' && user.user) ? <UserMenu userMenu={props} /> : <Category props={props} />}
        </Menu.Items>
      </Transition>
    </Menu >
  )
}
