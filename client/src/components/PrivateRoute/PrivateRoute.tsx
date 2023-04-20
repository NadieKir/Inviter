import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from 'common/contexts';
import { Role } from 'models';

export enum UserStatus {
  AUTHORIZED = 'Authorized',
  GUEST = 'Guest',
}

type UserRole = UserStatus | Role;

interface PrivateRouteProps {
  roles: UserRole[];
  children: JSX.Element;
}

export const PrivateRoute = ({ roles, children }: PrivateRouteProps) => {
  const { user, isGuest } = useContext(UserContext);

  if (
    (isGuest && roles.includes(Role.ADMIN)) ||
    (user &&
      !roles.some((role) => [user.role, UserStatus.AUTHORIZED].includes(role)))
  ) {
    return <Navigate to="/forbidden" />;
  }

  if (isGuest && roles.includes(UserStatus.AUTHORIZED)) {
    return <Navigate to="/login" />;
  }

  return children;
};
