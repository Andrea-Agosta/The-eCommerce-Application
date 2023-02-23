import { Menu } from '@headlessui/react'
import { classNames } from './Dropdown'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user';
import { useContext } from 'react';


export const UserDashboard = ({ userMenu }: { userMenu: string[] }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const logout = () => {
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate('/');
    window.location.reload();
  }

  return (
    <div className="py-1">
      {
        userMenu.map((user, index) => (
          <Menu.Item key={index}>
            {({ active }) => (
              <a href={`/${user}`} className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>{user} </a>
            )}
          </Menu.Item>
        ))}
      {
        user.user.role === 'admin' && <Menu.Item>
          {({ active }) => (
            <Link to={'/store'} className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')} > Store </Link>
          )}
        </Menu.Item>
      }
      <Menu.Item>
        {({ active }) => (
          <button className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')} onClick={logout} >Log Out</button>
        )}
      </Menu.Item>
    </div>
  )
}
