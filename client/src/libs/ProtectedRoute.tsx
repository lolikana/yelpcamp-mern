import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

const ProtectedRoute = () => {
  const auth = useContext(AuthContext);
  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
