import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IStore } from '../../../type/store'
import { Modal } from '../components/Modal/Modal';
import { decodeJwt } from '../utils/decodeJwt';
import { restCall } from '../utils/restCall';

export const StoreList = () => {
  const [store, setStore] = useState<IStore[]>();
  const cookieString = document.cookie;
  const cookieInfo = decodeJwt(cookieString);
  const headers = { Authorization: `Bearer ${cookieString.split('=')[1]}` }

  useEffect(() => {
    restCall('get', `store?role=${cookieInfo.user.role}`, {}, headers)
      .then(response => setStore(response.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <section className='p-4 md:p-10'>
      <ul className='max-w-xs'>
        {store?.map((storeName, index) => <li key={index} className={`flex justify-between items-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
          <Link to={`${storeName.uniquestoreid}`} className='text-xl p-2 w-60'> {storeName.name}</Link>
          <Modal type='deleteStore' data={storeName} />
        </li>)}
      </ul>
      {/* <Route path={`${match?.pathname}/:id`}> <StoreProducts /></Route> */}
      {/* <StoreProducts /> */}
    </section>
  )
};
