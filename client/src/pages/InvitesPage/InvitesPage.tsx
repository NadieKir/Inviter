import { InviteTabs } from "components";

import styles from './InvitesPage.module.scss';
import { Outlet } from "react-router-dom";

export function InvitesPage() {
    return (
        <div className={styles.invitesPage}>
            <InviteTabs heading="Мои инвайты" />
            <Outlet />
        </div>
    )
}