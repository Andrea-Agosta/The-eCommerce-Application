import { Outlet, Navigate } from 'react-router-dom'
import { decodeJwt } from './decodeJwt';

const AdminRoutes = () => {
  const cookieString = document.cookie;
  const cookieInfo = decodeJwt(cookieString);
  return cookieInfo.user.role === 'super-admin' ? <Outlet /> : <Navigate to="/" />
}

export default AdminRoutes;