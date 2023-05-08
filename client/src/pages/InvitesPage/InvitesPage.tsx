import { Outlet } from 'react-router-dom';

import { InviteTabs } from 'components';

import styles from './InvitesPage.module.scss';
import { InvitesDetailsModalProvider } from 'common/contexts';

export function InvitesPage() {
  return (
    <div className={styles.invitesPage}>
      <InvitesDetailsModalProvider>
        <InviteTabs heading="Мои инвайты" />
        <Outlet />
      </InvitesDetailsModalProvider>
    </div>
  );
}
