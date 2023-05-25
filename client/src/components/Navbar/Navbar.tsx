import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import 'animate.css';

import { Role } from 'models';
import {
  userLinksToNavItem,
  adminLinksToNavItem,
  SERVER_URL,
} from 'common/constants';
import { UserContext } from 'common/contexts';
import {
  ActionVariant,
  NavbarAction,
} from './components/NavbarAction/NavbarAction';
import { concatUserNameAndAge } from 'common/helpers';

import styles from './Navbar.module.scss';
import logo from 'assets/images/logo.svg';
import geo from 'assets/images/geo.svg';
import menu from './assets/menu.svg';
import defaultImage from 'assets/images/defaultImage.png';

interface NavbarProps {
  variant: Role;
}

export const Navbar = observer(({ variant }: NavbarProps) => {
  const { user, error } = useContext(UserContext);
  const [openMenu, setOpenMenu] = useState(false);

  if (!user) throw error;

  const linksToNavItem =
    variant === Role.ADMIN ? adminLinksToNavItem : userLinksToNavItem;

  const handleMenuClick = () => {
    setOpenMenu(() => !openMenu);
  };

  return (
    <aside className={styles.aside}>
      <NavLink to="/">
        <img src={logo} alt="Логотип" />
      </NavLink>

      <div className={styles.actionsWrapper}>
        <NavbarAction variant={ActionVariant.NO_TEXT} userRole={user.role} />

        <button className={styles.menuBurger} onClick={handleMenuClick}>
          <img src={menu} alt="" />
        </button>
      </div>

      <NavLink
        to={user.role === Role.ADMIN ? '/admin/profile' : '/profile'}
        className={styles.userProfile}
      >
        <img
          className={styles.userPhoto}
          src={user?.image !== '' ? SERVER_URL + user?.image : defaultImage}
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

      <nav
        className={classNames(
          styles.nav,
          'animate__animated',
          'animate__faster',
          {
            animate__fadeInRight: openMenu,
            [styles.visible]: openMenu,
          },
        )}
      >
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

        <NavLink
          to={user.role === Role.ADMIN ? '/admin/profile' : '/profile'}
          className={styles.userProfileSmall}
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
      </nav>

      <div className={styles.action}>
        <NavbarAction variant={ActionVariant.DEFAULT} userRole={user.role} />
      </div>
    </aside>
  );
});
