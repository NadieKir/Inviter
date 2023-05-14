import { Outlet } from 'react-router-dom';

import { InviteTabs } from 'components';

import styles from './InvitesPage.module.scss';

export function InvitesPage() {
  return (
    <section className={styles.invitesPage}>
      <InviteTabs heading="Мои инвайты" />
      <Outlet />
    </section>
  );
}
