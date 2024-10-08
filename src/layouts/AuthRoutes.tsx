import { Outlet, Navigate } from 'react-router-dom';

const AuthRoutes = () => {
  const auth = localStorage.getItem('jwtToken');

  return auth ? <Navigate to="/home" /> : <Outlet />;
};

export default AuthRoutes;
