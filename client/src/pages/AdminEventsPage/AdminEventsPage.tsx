import { Outlet } from 'react-router-dom';

import { TabDescriptor, Tabs } from 'components';
import { CurrentEvents, DraftEvents, PastEvents } from './components';

import styles from './AdminEventsPage.module.scss';

export const eventsTabs: TabDescriptor[] = [
  {
    label: 'Текущие',
    link: 'current',
    component: <CurrentEvents />,
  },
  {
    label: 'Прошедшие',
    link: 'past',
    component: <PastEvents />,
  },
  {
    label: 'Черновики',
    link: 'drafts',
    component: <DraftEvents />,
  },
];

export const AdminEventsPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.tabsWrapper}>
        <h1 className="heading-H1">События</h1>
        <Tabs descriptor={eventsTabs} />
      </div>
      <Outlet />
    </section>
  );
};
