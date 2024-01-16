import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { getUser } from '../service/AuthService';

const PublicRoute = ({ element, ...rest }) => {
  const user = getUser();

  return (
    <Route
      {...rest}
      element={!user ? element : <Navigate to="/premiun-content" replace />}
    />
  );
};

export default PublicRoute;
