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
      url: `http://localhost:8080/api/product/categories/${category}`,
    })
      .then(async response => await setProducts(response.data));
  }, []);

  console.log(products)

  return (
    <section className='bg-white p-4' >
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {products.map((product, index) => <Card key={index} product={product} />)}
      </div>
    </section>
  )
}

export default Product