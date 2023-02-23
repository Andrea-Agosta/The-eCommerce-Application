import { Menu } from '@headlessui/react'
import { classNames } from './Dropdown'

export const Category = ({ props }: { props: string[] }) => {
  return (
    <div className="py-1">
      {
        props.map((category, index) => (
          <Menu.Item key={index}>
            {({ active }) => (
              <a href={`/${category}`} className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>{category} </a>
            )}
          </Menu.Item>
        ))}
    </div>
  )
}
