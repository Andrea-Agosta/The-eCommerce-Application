import axios from 'axios';
import { useContext, useEffect } from 'react';
import Card from '../components/products/Card';
import { ProductContext } from '../context/product';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Product = () => {
  const { products, setProducts } = useContext(ProductContext);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const categoryParams = urlParams.get('category');
    const searchParams = urlParams.get('search');

    if (categoryParams) {
      console.log(searchParams)
      searchParams === '' && navigate('/');
      axios({
        method: 'get',
        url: `http://localhost:8080/api/product`,
        params: {
          category: categoryParams,
          search: searchParams
        }
      })
        .then(res => setProducts(res.data))
        .catch(err => console.error(err))
    } else {
      console.log('here')
      const category = pathname.split('/')[pathname.split('/').length - 1];
      axios({
        method: 'get',
        url: `http://localhost:8080/api/product/categories/${category}`,
      })
        .then(async response => await setProducts(response.data));
    }
  }, [pathname, search]);

  return (
    <>
      <div className="bnr max-w-full bg-black px-4 py-1 overflow-hidden bg-gradient-to-br from-red-600 to-blue-900" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1634154369165-cadcd9af7100?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=882&q=80", backgroundSize: "cover" }}>
        <h2 className="text-orange-400 text-2xl text-center text-shadow p-5">Buy Now and Redeme the 30% discount! </h2>
      </div>

      <section className='bg-white p-4' >
        {
          products.length ?
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
              {products.map((product, index) => <Card key={index} product={product} page='product' />)}
            </div>
            :
            <h2 className='text-2xl text-center mt-28'>Sorry, but the Item is not Avaleible</h2>
        }
      </section>
    </>
  )
}

export default Product;
