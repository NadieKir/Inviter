import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from 'common/contexts';
import { Button, ButtonHeight, ButtonVariant, Loader } from 'components';
import { ChangePasswordForm } from 'forms';

import styles from './AdminProfilePage.module.scss';
import defaultImage from 'assets/images/defaultImage.png';
import at from 'assets/images/at.svg';

export const AdminProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, isLoading, error } = useContext(UserContext);

  if (isLoading) return <Loader />;
  if (!user) throw error;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChange = () => {};

  return (
    <section className={styles.section}>
      <div className={styles.adminInfoWrapper}>
        <img
          className={styles.image}
          src={user.image || defaultImage}
          alt="Фото пользователя"
        />
        <div className={styles.infoActionWrapper}>
          <div className={styles.info}>
            <h1 className="heading-H1">Администратор {user.name}</h1>
            <div className={styles.loginWrapper}>
              <img src={at} alt="" />
              <span>{user.login}</span>
            </div>
          </div>
          <div className={styles.actions}>
            {/* TODO: onclick */}
            <Button
              onClick={handleChange}
              variant={ButtonVariant.Secondary}
              height={ButtonHeight.Small}
            >
              Изменить
            </Button>
            <Button onClick={handleLogout} height={ButtonHeight.Small}>
              Выйти
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.passwordFormSection}>
        <h2 className={styles.passwordFormHeading}>Изменить пароль</h2>
        <ChangePasswordForm user={user} />
      </div>
    </section>
  );
};
