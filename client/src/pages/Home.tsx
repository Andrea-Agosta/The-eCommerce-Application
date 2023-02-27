import { useContext } from 'react';
import { Modal } from '../components/Modal/Modal';
import { CategoriesContext } from '../context/categories';
import { Category } from '../components/products/Category';
// @ts-ignore
import backgroundImage from '../images/background.jpg';
// @ts-ignore
import mobileBackgroundImage from '../images/mobile_background.png';


const Hompage = () => {
  const { categories } = useContext(CategoriesContext);
  const cookieString = document.cookie;
  return (
    <div>
      <h2 className='text-center text-2xl mt-5 absolute left-5 w-44 bg-white/[.8] rounded-2xl p-2 md:hidden'>Buy and receive it in 2 days!</h2>
      <img src={backgroundImage} alt='background' className='hidden md:block' />
      <img src={mobileBackgroundImage} alt='background' className='md:hidden' />
      <div className='md:hidden'>
        {!cookieString && <Modal type='auth' />}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:p-4'>
        {categories?.map((category, index) => <Category key={index} category={category} />)}
      </div>
    </div>
  )
}

export default Hompage