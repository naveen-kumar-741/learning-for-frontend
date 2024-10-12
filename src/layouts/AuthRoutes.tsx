import { Outlet, Navigate } from 'react-router-dom';

const AuthRoutes = () => {
  const auth = localStorage.getItem('jwtToken');

  return auth ? <Navigate to="/doc" /> : <Outlet />;
};

export default AuthRoutes;
