import { Outlet } from 'react-router-dom';

import styles from './AdminEventsPage.module.scss';

export const AdminEventsPage = () => {
  return (
    <section className={styles.section}>
      {/* <InviteTabs heading="Мои инвайты" /> */}
      <Outlet />
    </section>
  );
};
