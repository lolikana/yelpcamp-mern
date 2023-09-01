import { Navigate, Outlet } from 'react-router-dom';

import checkToken from './../../utils/checkToken';

const ProtectedRoute = () => {
  const token = checkToken.isAuthenticated()?.token;
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
