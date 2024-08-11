import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ForbiddenRoute = ({ element: Component, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  // Show a loading indicator or nothing while user data is being fetched
  if (loading) {
    return <div>Loading...</div>; 
  }

  // If user is not authenticated, allow access to public pages
  if (!user) {
    return <Component {...rest} />;
  }

  // Redirect authenticated users with forbidden roles to /admin
  if (user.isOwner || user.isWorker) {
    return <Navigate to="/admin" />;
  }

  // If user is authenticated and does not have forbidden roles, allow access
  return <Component {...rest} />;
};

export default ForbiddenRoute;
