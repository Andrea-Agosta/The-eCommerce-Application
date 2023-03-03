import { Menu } from '@headlessui/react'
import { classNames } from './Dropdown'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user';
import { useContext } from 'react';
import { IUserState } from '../../../../type/user';
import { IProduct } from '../../../../type/product';
import { Modal } from '../Modal/Modal';


export const UserMenu = ({ userMenu }: { userMenu: string[] }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser({} as IUserState);
    navigate('/');
    window.location.reload();
  }

  return (
    <div className="py-1">
      {
        userMenu.map((user, index) => (
          <Menu.Item key={index} >
            {({ active }) => (
              user === 'Edit Profile' ? <Modal type='user' data={{} as IProduct} />
                : <a href={`/${user}`} className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>{user} </a>
            )}
          </Menu.Item>
        ))
      }
      {
        {
          'admin': <Menu.Item>
            {({ active }) => (
              <a href={`/admin/store/${user.user.storeId}`} className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')} > Store </a>
            )}
          </Menu.Item>,
          'super-admin': <Menu.Item>
            {({ active }) => (
              <a href='/admin/store' className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')} > Store List</a>
            )}
          </Menu.Item>,
        }[user.user.role]
      }
      <Menu.Item>
        {({ active }) => (
          <button className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')} onClick={logout} >Log Out</button>
        )}
      </Menu.Item>
    </div >
  )
}
