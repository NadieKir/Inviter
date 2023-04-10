import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { Button } from 'components';
import useModal from 'common/hooks/useModal';
import { CreateInviteModal } from 'modals';
import { Role } from 'models';
import { userLinksToNavItem, adminLinksToNavItem } from 'common/constants';

import styles from './Navbar.module.scss';
import logo from 'assets/images/logo.svg';
import geo from 'assets/images/geo.svg';
import userPhoto from 'assets/images/mock-user-photo.jpg';
import plus from './assets/plus.svg';

interface NavbarProps {
  variant: Role;
}

export function Navbar({ variant }: NavbarProps) {
  const [isShowingModal, toggleModal] = useModal();

  const linksToNavItem =
    variant === Role.ADMIN ? adminLinksToNavItem : userLinksToNavItem;

  return (
    <>
      <aside className={styles.aside}>
        <NavLink to="/">
          <img src={logo} alt="Логотип" />
        </NavLink>

        <NavLink to="/profile" className={styles.userProfile}>
          <img
            className={styles.userPhoto}
            src={userPhoto}
            alt="Фото пользователя"
          />
          <div className={styles.userInfo}>
            <span className={styles.userName}>Надежда, 20</span>
            <div className={styles.userCity}>
              <img src={geo} alt="Локация" width={'10px'} />
              Минск
            </div>
          </div>
        </NavLink>

        <nav className={styles.nav}>
          {linksToNavItem.map((linkToNavItem) => (
            <NavLink
              to={linkToNavItem.link}
              className={({ isActive }) =>
                classNames(styles.navItem, {
                  [styles.active]: isActive,
                })
              }
            >
              <img
                src={linkToNavItem.icon}
                alt="Иконка пункта меню"
                width={'18px'}
              />
              {linkToNavItem.name}
            </NavLink>
          ))}
        </nav>

        <Button onClick={toggleModal}>
          <img src={plus} alt="Плюс" />{' '}
          {variant === Role.ADMIN ? 'Добавить событие' : 'Создать инвайт'}
        </Button>
      </aside>

      <CreateInviteModal isShowing={isShowingModal} onClose={toggleModal} />
    </>
  );
}
