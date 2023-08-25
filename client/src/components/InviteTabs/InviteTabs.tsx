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
    description:
      'Инвайты, которые создал именно ты и которые нуждаются в подборе компании! \nНажми "Утвердить", если компания мечты уже сформирована',
  },
  {
    label: 'Отклики',
    link: 'responses',
    component: <UserResponses />,
    description:
      'Все инвайты, на которые ты откликнулся, но пока не был выбран (или не выбран) как компаньон',
  },
  {
    label: 'Утвержденные',
    link: 'closed',
    component: <ClosedInvites />,
    description:
      'Все твои предстоящие встречи, неважно в качестве создателя или компаньона \nЕсли встреча уже состоялась, отметь её как прошедшую с помощью соответствующей кнопки',
  },
  {
    label: 'Прошедшие',
    link: 'past',
    component: <PastInvites />,
    description: 'Архив всех твоих встреч с приятелями',
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
