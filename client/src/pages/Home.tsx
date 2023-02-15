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


const Hompage = () => {
  const { categories, setCategories } = useContext(CategoriesContext);
  const { setProducts } = useContext(ProductContext);

  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/product/`,
    })
      .then(async response => setProducts(response.data))

    axios({
      method: 'get',
      url: `/api/product/categories`,
    })
      .then(async response => {
        const categoriesList: string[] = await response.data.map((category: ICategory) => category.category);
        setCategories(categoriesList);
      });
  }, []);

  console.log(categories, 'categories')

  return (
    <div>
      <img src={backgroundImage} alt='background' className='hidden md:block' />
      <img src={mobileBackgroundImage} alt='background' className='md:hidden' />
      <div className='md:hidden'>
        <h2 className='text-center text-2xl mt-5'>Buy and receive it in 2 days!</h2>
        <Modal />
      </div>
      {
        categories?.map((category, index) => <Section key={index} category={category} />)
      }
    </div>
  )
}

export default Hompage