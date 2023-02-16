import { useContext, useEffect } from 'react';
import Section from '../components/products/Section'
import axios from 'axios';
import { ProductContext } from '../context/product';
import { Modal } from '../components/Modal';
import { CategoriesContext } from '../context/categories';
import { ICategory } from '../../../type/product';
// @ts-ignore
import backgroundImage from '../images/background.jpg';
// @ts-ignore
import mobileBackgroundImage from '../images/mobile_background.png';
import { Category } from '../components/products/Category';


const Hompage = () => {
  const { categories, setCategories } = useContext(CategoriesContext);

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/product/categories`,
    })
      .then(async response => {
        const categoriesList: string[] = await response.data.map((category: ICategory) => category.category);
        setCategories(categoriesList);
      });
  }, []);

  return (
    <div>
      <img src={backgroundImage} alt='background' className='hidden md:block' />
      <img src={mobileBackgroundImage} alt='background' className='md:hidden' />
      <div className='md:hidden'>
        <h2 className='text-center text-2xl mt-5'>Buy and receive it in 2 days!</h2>
        <Modal />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:p-4'>
        {
          // categories?.map((category, index) => <Section key={index} category={category} />)
          categories?.map((category, index) => <Category key={index} category={category} />)
        }
      </div>
    </div>
  )
}

export default Hompage