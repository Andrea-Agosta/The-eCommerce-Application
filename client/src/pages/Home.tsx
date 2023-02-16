import { useContext } from 'react';
import { Modal } from '../components/Modal';
import { CategoriesContext } from '../context/categories';
import { Category } from '../components/products/Category';
// @ts-ignore
import backgroundImage from '../images/background.jpg';
// @ts-ignore
import mobileBackgroundImage from '../images/mobile_background.png';


const Hompage = () => {
  const { categories } = useContext(CategoriesContext);
  return (
    <div>
      <img src={backgroundImage} alt='background' className='hidden md:block' />
      <img src={mobileBackgroundImage} alt='background' className='md:hidden' />
      <div className='md:hidden'>
        <h2 className='text-center text-2xl mt-5'>Buy and receive it in 2 days!</h2>
        <Modal />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:p-4'>
        {categories?.map((category, index) => <Category key={index} category={category} />)}
      </div>
    </div>
  )
}

export default Hompage