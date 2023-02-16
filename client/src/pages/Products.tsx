import axios from 'axios';
import { useContext, useEffect } from 'react'
import Card from '../components/products/Card';
import { ProductContext } from '../context/product';


const Product = () => {
  const { products, setProducts } = useContext(ProductContext);
  const category = window.location.pathname.split('/')[1];

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/product/categories/${category}`,
    })
      .then(async response => await setProducts(response.data));
  }, []);

  return (
    <>
      <div className="bnr max-w-full bg-black px-4 py-1 overflow-hidden bg-gradient-to-br from-red-600 to-blue-900" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1634154369165-cadcd9af7100?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=882&q=80", backgroundSize: "cover" }}>
        <h2 className="text-orange-400 text-2xl text-center text-shadow p-5">Buy Now and Redeme the 30% discount! </h2>
      </div>

      <section className='bg-white p-4' >
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {products.map((product, index) => <Card key={index} product={product} />)}
        </div>
      </section>
    </>
  )
}

export default Product