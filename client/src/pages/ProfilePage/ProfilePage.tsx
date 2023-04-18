import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'components';
import { UserContext } from 'common/contexts/UserProvider';

import styles from './ProfilePage.module.scss';
import { UpdateProfileForm } from 'forms/UpdateProfileForm/UpdateProfileForm';

export const ProfilePage = () => {
  const navigate = useNavigate();

  const { logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.wrapper}>
      <UpdateProfileForm />
      <Button onClick={handleLogout}>Выйти</Button>
    </div>
  );
};
