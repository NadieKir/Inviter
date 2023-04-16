import { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import { Typography, NavTabs, MeetupTabContent } from 'components';
import { UserContext } from 'common/contexts';
import { MeetupTab, MeetupTabDescriptor } from 'common/types';
import { UserRole } from 'common/model';

import styles from './EventTabs.module.scss';

export const meetupTabs: MeetupTabDescriptor[] = [
  {
    label: <FormattedMessage id="topics" />,
    link: MeetupTab.Topics,
    component: <MeetupTabContent variant={MeetupTab.Topics} />,
    canAccess: [UserRole.CHIEF, UserRole.EMPLOYEE, UserRole.GUEST],
  },
  {
    label: <FormattedMessage id="onModeration" />,
    link: MeetupTab.OnModeration,
    component: <MeetupTabContent variant={MeetupTab.OnModeration} />,
    canAccess: [UserRole.CHIEF],
  },
  {
    label: <FormattedMessage id="upcoming" />,
    link: MeetupTab.Upcoming,
    component: <MeetupTabContent variant={MeetupTab.Upcoming} />,
    canAccess: [UserRole.CHIEF, UserRole.EMPLOYEE, UserRole.GUEST],
  },
  {
    label: <FormattedMessage id="finished" />,
    link: MeetupTab.Finished,
    component: <MeetupTabContent variant={MeetupTab.Finished} />,
    canAccess: [UserRole.CHIEF, UserRole.EMPLOYEE, UserRole.GUEST],
  },
];

export const EventTabs = observer(() => {
  const { currentUserMeetupTabs } = useContext(UserContext);

  if (currentUserMeetupTabs.length === 0) return null;

  return (
    <>
      <NavTabs className={styles.tabs}>
        {currentUserMeetupTabs.map((tab) => (
          <NavLink
            key={tab.link}
            to={tab.link}
            className={({ isActive }) =>
              classNames(styles.tab, {
                [styles.active]: isActive,
              })
            }
          >
            <Typography>{tab.label}</Typography>
          </NavLink>
        ))}
      </NavTabs>
      <Outlet />
    </>
  );
});
