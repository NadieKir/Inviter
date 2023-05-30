import { TabDescriptor, Tabs } from 'components';
import { CreatedInvites } from './components/CreatedInvites/CreatedInvites';
import { ClosedInvites } from './components/ClosedInvites/ClosedInvites';
import { UserResponses } from './components/UserResponses/UserResponses';

import styles from './InviteTabs.module.scss';
import { InvitesDetailsModalProvider } from 'common/contexts';
import { PastInvites } from './components';

export const inviteTabs: TabDescriptor[] = [
  {
    label: 'Созданные',
    link: 'created',
    component: <CreatedInvites />,
  },
  {
    label: 'Отклики',
    link: 'responses',
    component: <UserResponses />,
  },
  {
    label: 'Утвержденные',
    link: 'closed',
    component: <ClosedInvites />,
  },
  {
    label: 'Прошедшие',
    link: 'past',
    component: <PastInvites />,
  },
];

export const InviteTabs = () => {
  return (
    <InvitesDetailsModalProvider>
      <div className={styles.tabsWrapper}>
        <h1 className="heading-H1">Мои инвайты</h1>
        <Tabs descriptor={inviteTabs} />
      </div>
    </InvitesDetailsModalProvider>
  );
};
