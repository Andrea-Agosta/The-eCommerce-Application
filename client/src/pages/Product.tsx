import axios from 'axios';
import { useContext, useEffect } from 'react'
import Card from '../components/products/Card';
import { ProductContext } from '../context/product';

const Product = () => {
  const { products, setProducts } = useContext(ProductContext);
  const category = window.location.pathname.split('/')[1];

  console.log(category)


  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/product/${category}`,
    })
      .then(async response => setProducts(response.data))
  }, []);

  console.log(products)

  return (
    <section className='bg-white p-4' >
      <div className='grid grid-row-1 md:grid-col-3 gap-6'>
        {products.map((product, index) => <Card key={index} product={product} />)}
      </div>
    </section>
  )
}

export default Product