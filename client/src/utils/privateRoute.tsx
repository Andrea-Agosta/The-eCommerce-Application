import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
  const cookieString = document.cookie;
  return (
    cookieString ? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateRoutes