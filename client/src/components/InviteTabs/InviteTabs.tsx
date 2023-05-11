import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import { NavTabs } from 'components';
import { InviteTabDescriptor } from './types';
import { CreatedInvites } from './components/CreatedInvites/CreatedInvites';
import { ClosedInvites } from './components/ClosedInvites/ClosedInvites';
import { UserResponses } from './components/UserResponses/UserResponses';

import styles from './InviteTabs.module.scss';

export const inviteTabs: InviteTabDescriptor[] = [
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

interface Props {
  heading?: string;
}

export const InviteTabs = observer(({ heading }: Props) => {
  return (
    <div className={styles.tabsWrapper}>
      {heading && <h1 className="heading-H1">{heading}</h1>}
      <NavTabs className={styles.tabs}>
        {inviteTabs.map((tab) => (
          <NavLink
            key={tab.link}
            to={tab.link}
            className={({ isActive }) =>
              classNames(styles.tab, {
                [styles.active]: isActive,
              })
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </NavTabs>
    </div>
  );
});
