import React from 'react';
import { Navigate } from 'react-router-dom';
import { RouterKeys } from '../../../../../shared/constants/router-keys.const';
import { useAuthStore } from '../../../../store/auth';

interface IAppRequireAuthProps {
  children: React.ReactNode;
  roles?: string[];
  guestOnly?: boolean;
}

export const AppRequireAuth: React.FC<IAppRequireAuthProps> = ({ children, guestOnly = false }) => {
  const { isAuthenticated } = useAuthStore();

  if (guestOnly && isAuthenticated) {
    return <Navigate to={RouterKeys.QUIZ.LIST} replace />;
  }

  if (!guestOnly && !isAuthenticated) {
    return <Navigate to={RouterKeys.AUTH.SIGN_IN} replace />;
  }

  return <>{children}</>;
};
