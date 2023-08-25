import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from 'common/contexts';
import { Button, ButtonHeight, ButtonVariant, Loader } from 'components';
import { ChangePasswordForm } from 'forms';
import { useModal } from 'common/hooks';
import { EditAdminProfileModal } from 'modals';

import styles from './AdminProfilePage.module.scss';
import defaultImage from 'assets/images/defaultImage.png';
import at from 'assets/images/at.svg';
import { SERVER_URL } from 'common/constants';

export const AdminProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, isLoading, error } = useContext(UserContext);

  const [isEditProfileModalOpen, toggleEditProfileModal] = useModal();

  if (isLoading) return <Loader />;
  if (!user) throw error;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.adminInfoWrapper}>
          <img
            className={styles.image}
            src={user?.image !== '' ? SERVER_URL + user?.image : defaultImage}
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
              <Button
                variant={ButtonVariant.Secondary}
                height={ButtonHeight.Small}
                onClick={() => toggleEditProfileModal()}
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

      <EditAdminProfileModal
        isShowing={isEditProfileModalOpen}
        onClose={toggleEditProfileModal}
      />
    </>
  );
};
