import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from 'common/contexts';
import { Button, Loader } from 'components';

export const AdminProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, isLoading, error } = useContext(UserContext);

  if (isLoading) return <Loader />;
  if (!user) throw error;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return <Button onClick={handleLogout}>Выйти</Button>;
};
