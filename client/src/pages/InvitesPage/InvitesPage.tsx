import { Outlet } from 'react-router-dom';

import { InviteTabs } from 'components';
import { InvitesDetailsModalProvider } from 'common/contexts';

import styles from './InvitesPage.module.scss';

export function InvitesPage() {
  return (
    <section className={styles.invitesPage}>
      <InvitesDetailsModalProvider>
        <InviteTabs heading="Мои инвайты" />
        <Outlet />
      </InvitesDetailsModalProvider>
    </section>
  );
}
