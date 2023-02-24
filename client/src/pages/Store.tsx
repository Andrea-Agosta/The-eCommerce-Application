import axios from 'axios';
import { useContext, useEffect } from 'react'
import { decodeJwt } from '../utils/decodeJwt';

export const Store = () => {
  const cookieString = document.cookie;
  const user = decodeJwt(cookieString);

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/store/product/${user.user.storeId}?secret_token=${cookieString.split('=')[1]}`,
      // data: {
      //   role: user.user.role,
      //   secret_token: cookieString.split('=')[1]
      // },
      // headers: {
      //   header: cookieString.split('=')[1],
      // }

      // headers: { "Authorization": `Bearer ${cookieString.split('=')[1]}` }
    })
      .then(async response => {
        console.log(response, 'response')
      })
      .catch(err => console.log(err));
  }, [user]);

  return (
    <div>Store</div>
  )
}
