import React from 'react';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <p>Unauthorized</p>;
  if (role && user.role !== role) return <p>Access denied</p>;
  return children;
};
export default PrivateRoute;
