import { Button } from 'components';

import styles from './Navbar.module.scss';
import logo from 'assets/images/logo.svg';
import plus from './plus.svg';

export const Navbar = () => {
  return (
    <aside className={styles.aside}>
      <img src={logo} alt="Логотип" />
      <div className={styles.userProfile}></div>
      <nav className={styles.nav}></nav>
      <Button>
        <>
          <img src={plus} alt="Плюс" /> Создать инвайт
        </>
      </Button>
    </aside>
  );
};
