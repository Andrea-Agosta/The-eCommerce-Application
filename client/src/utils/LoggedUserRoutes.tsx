import { Outlet, Navigate } from 'react-router-dom'
import { decodeJwt } from './decodeJwt';

const LoggedUserRoutes = () => {
  const cookieString = document.cookie;
  return cookieString ? <Outlet /> : <Navigate to="/" />
}

export default LoggedUserRoutes;