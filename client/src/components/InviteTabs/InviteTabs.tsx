import { TabDescriptor, Tabs } from 'components';
import { CreatedInvites } from './components/CreatedInvites/CreatedInvites';
import { ClosedInvites } from './components/ClosedInvites/ClosedInvites';
import { UserResponses } from './components/UserResponses/UserResponses';

import styles from './InviteTabs.module.scss';

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
    component: <ClosedInvites />,
  },
];

export const InviteTabs = () => {
  return (
    <div className={styles.tabsWrapper}>
      <h1 className="heading-H1">Мои инвайты</h1>
      <Tabs descriptor={inviteTabs} />
    </div>
  );
};
