import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { Button } from 'components';

import styles from './Navbar.module.scss';

import logo from 'assets/images/logo.svg';
import geo from 'assets/images/geo.svg';
import calendar from 'assets/images/calendar.svg';
import userPhoto from 'assets/images/mock-user-photo.jpg';
import bell from './assets/bell.svg';
import follower from './assets/follower.svg';
import people from './assets/people.svg';
import search from './assets/search.svg';
import ticket from './assets/ticket.svg';
import plus from './assets/plus.svg';

type LinkToNavItem = {
  name: string;
  link: string;
  icon: string;
};

const linksToNavItem: LinkToNavItem[] = [
  {
    name: 'Поиск инвайта',
    link: '/search',
    icon: search,
  },
  {
    name: 'Афиша города',
    link: '/events',
    icon: calendar,
  },
  {
    name: 'Мои инвайты',
    link: '/invites',
    icon: ticket,
  },
  {
    name: 'Контакты',
    link: '/contacts',
    icon: people,
  },
  {
    name: 'Подписки',
    link: '/following',
    icon: follower,
  },
  {
    name: 'Уведомления',
    link: '/notifications',
    icon: bell,
  },
];

export const Navbar = () => {
  return (
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

      <Button>
        <img src={plus} alt="Плюс" /> Создать инвайт
      </Button>
    </aside>
  );
};
