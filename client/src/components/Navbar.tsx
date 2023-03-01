import { useState, useContext, ChangeEvent } from 'react';
import { Search } from 'react-bootstrap-icons';
import { CategoriesContext } from '../context/categories';
import { Select } from './Select';
import { Modal } from './Modal/Modal';
import { Dropdown } from './Dropdown/Dropdown';
import { CartMenu } from './checkout/CartMenu';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const { categories } = useContext(CategoriesContext);
  const [isClicked, setIsClicked] = useState<string>('hidden md:block');
  const [search, setSearch] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('All');
  const userMenu: string[] = ['Edit Profile', 'history'];
  const navigate = useNavigate();

  const handleClick = () => {
    isClicked === 'block md:hidden' ? setIsClicked('hidden md:block') : setIsClicked('block md:hidden')
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchCategory(event.target.value);
  };

  const submitWithEnterKey = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      !search && navigate(`/`);
      navigate(`/category/${searchCategory}?category=${searchCategory}&search=${search}`);
    }
  };

  return (
    <>
      <nav className="bg-white border-gray-200 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
          <a href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap font-mono text-orange-400">SaltZone</span>
          </a>
          <div className='md:hidden mt-1'>
            <CartMenu />
          </div>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400" aria-controls="navbar-default" aria-expanded="false" onClick={handleClick}>
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
          <form className='mt-4 md:mt-0'>
            <div className="flex flex-row w-full border rounded-lg border-gray-300 bg-[#f2f2f2]">
              <div className='border-r'>
                <Select handleCategoryChange={handleCategoryChange} name='search' />
              </div>
              <Search className='text-3xl pt-2 ml-3 text-[#757575]' />
              <input type="search" id="search-dropdown" className="block p-2.5 w-full z-5 text-sm placeholder:text-[#757575] bg-[#f2f2f2] rounded-r-lg focus:outline-none focus:ring-0 focus:border-transparent border-0" placeholder="Search for items" required onChange={e => setSearch(e.currentTarget.value)} onKeyDown={event => submitWithEnterKey(event)} />
            </div>
          </form>
          <div className="items-center hidden md:flex flex-row">
            {document.cookie ? <Dropdown props={userMenu} name={'user'} /> : <Modal type='auth' product={null} />}
            <CartMenu />
          </div>
        </div>
      </nav >
      <nav className={`border ${isClicked}`} >
        <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6" >
          <div className="flex flex-col md:flex-row md:items-center">
            <span className='block md:hidden'>
              {document.cookie ? <Dropdown props={userMenu} name={'user'} /> : <Modal type='auth' product={null} />}
            </span>
            <ul className="flex flex-col mt-0 mr-lg-6 space-y-3 text-sm font-medium md:hidden">
              {categories.map((category, index) => <li key={index}><a href={`/category/${category}`} className="text-gray-900 hover:underline items-start">{category}</a></li>)}
            </ul>
            <ul className="hidden md:flex flex-row mt-0 lg:mr-6 space-x-8 text-sm font-medium">
              {categories.slice(0, 7).map((category, index) => <li key={index}><a href={`/category/${category}`} className="text-gray-900 hover:underline">{category}</a></li>)}
            </ul>
            <div className='ml-10 hidden md:block'>
              <Dropdown props={categories.slice(7)} name={'menu'} />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar;