import axios from 'axios';
import { useEffect, useState } from 'react'
import { Trash3 } from 'react-bootstrap-icons';
import { IProduct } from '../../../type/product';
import { Modal } from '../components/Modal/Modal';
import Card from '../components/products/Card';
import { decodeJwt } from '../utils/decodeJwt';

export const Store = () => {
  const [productsByStore, setProductsByStore] = useState<IProduct[]>();
  const cookieString = document.cookie;
  const user = decodeJwt(cookieString);

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/store/product/${user.user.storeId}`,
      data: {
        role: user.user.role,
      },
      headers: {
        Authorization: `Bearer ${cookieString.split('=')[1]}`,
      }
    })
      .then(response => setProductsByStore(response.data))
      .catch(err => console.log(err));
  }, [user]);

  return (
    <>
      <div className="bnr max-w-full bg-black px-4 py-1 overflow-hidden bg-gradient-to-br from-red-600 to-blue-900" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1634154369165-cadcd9af7100?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=882&q=80", backgroundSize: "cover" }}>
        <h2 className="text-orange-400 text-2xl text-center text-shadow p-5">This is the list of item you have in your store </h2>
      </div>

      <div className='fixed z-20 bottom-10 right-4 md:right-10 '>
        <Modal type='addProduct' product={null} />
      </div>

      <section className='m-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 place-items-center'>
        {productsByStore?.map((product, index) => <Card key={index} product={product} page='store' />)}
      </section>
    </>
  )
}
