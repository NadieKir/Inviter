import { useNavigate } from 'react-router-dom';

import { Button } from 'components';

import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return <Button onClick={handleLogout}>Выйти</Button>;
};
