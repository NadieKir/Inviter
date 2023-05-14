import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import { Role } from 'models';
import { userLinksToNavItem, adminLinksToNavItem } from 'common/constants';
import { UserContext } from 'common/contexts';
import { AdminNavbarAction } from './components/AdminNavbarAction/AdminNavbarAction';
import { UserNavbarAction } from './components/UserNavbarAction/UserNavbarAction';

import styles from './Navbar.module.scss';
import logo from 'assets/images/logo.svg';
import geo from 'assets/images/geo.svg';
import defaultImage from 'assets/images/defaultImage.png';
import { concatUserNameAndAge } from 'common/helpers';

interface NavbarProps {
  variant: Role;
}

export const Navbar = observer(({ variant }: NavbarProps) => {
  const { user, error } = useContext(UserContext);

  if (!user) throw error;

  const linksToNavItem =
    variant === Role.ADMIN ? adminLinksToNavItem : userLinksToNavItem;

  return (
    <aside className={styles.aside}>
      <NavLink to="/">
        <img src={logo} alt="Логотип" />
      </NavLink>

      <NavLink
        to={user.role === Role.ADMIN ? '/admin/profile' : '/profile'}
        className={styles.userProfile}
      >
        <img
          className={styles.userPhoto}
          src={user?.image !== '' ? user?.image : defaultImage}
          alt="Фото пользователя"
        />
        {user.role === Role.ADMIN ? (
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.name}</span>
            <div className={styles.userCity}>Администратор</div>
          </div>
        ) : (
          <div className={styles.userInfo}>
            <span className={styles.userName}>
              {concatUserNameAndAge(user)}
            </span>
            <div className={styles.userCity}>
              <img src={geo} alt="Локация" width={'10px'} />
              {user.city}
            </div>
          </div>
        )}
      </NavLink>

      <nav className={styles.nav}>
        {linksToNavItem.map((linkToNavItem) => (
          <NavLink
            to={linkToNavItem.link}
            key={linkToNavItem.link}
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

      {variant === Role.ADMIN ? <AdminNavbarAction /> : <UserNavbarAction />}
    </aside>
  );
});
