import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ element: Component, roles, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  // Show a loading indicator or nothing while user data is being fetched
  if (loading) {
    return <div>Loading...</div>; 
  }

  // Check if the user is authenticated
  if (!user) {
    return <Navigate to="/" />;
  }

  // Check if roles are specified and validate user's access
  if (roles) {
    const hasAccess = roles.some(role => {
      if (role === 'isOwner') return user.isOwner;
      if (role === 'isWorker') return user.isWorker;
      return false;
    });

    if (!hasAccess) {
      return <Navigate to="/" />;
    }
  }

  // User is authenticated and has the right roles
  return <Component {...rest} />;
};

export default ProtectedRoute;
