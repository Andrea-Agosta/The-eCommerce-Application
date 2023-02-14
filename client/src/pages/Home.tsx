import { useContext, useEffect } from 'react';
import Section from '../components/products/Section'
import axios from 'axios';
import { ProductContext } from '../context/product';
import { Modal } from '../components/Modal';
import backgroundImage from '../images/sponline_phone114_generated.jpg';


const Hompage = () => {
  const { setProducts } = useContext(ProductContext);

  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/product/`,
    })
      .then(async response => await setProducts(response.data))
  }, []);

  return (
    <div>
      <img src={backgroundImage} alt='background' />
      <h2 className='text-center text-2xl mt-5'>Buy and receive it in 2 days!</h2>
      <Modal />
      {
        // .map((tag, index) => <Section key={index} tag={tag} />)
      }
    </div>
  )
}

export default Hompage