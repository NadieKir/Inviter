import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import { NavTabs } from 'components';

import { InviteTabDescriptor } from './types';
import { CurrentInvites } from './components/CurrentInvites/CurrentInvites';
import { ClosedInvites } from './components/ClosedInvites/ClosedInvites';

import styles from './InviteTabs.module.scss';
import { UserResponses } from './components/UserResponses/UserResponses';

export const inviteTabs: InviteTabDescriptor[] = [
  {
    label: "Текущие",
    link: "current",
    component: <CurrentInvites />
  },
  {
    label: "Закрытые",
    link: "closed",
    component: <ClosedInvites />
  },
  {
    label: "Мои отклики",
    link: "responses",
    component: <UserResponses />
  },
];

interface Props {
  heading?: string;
}

export const InviteTabs = observer(({
  heading,
}: Props) => {
  return (
    <div className={styles.tabsWrapper}>
      {heading && (<h1 className='heading-H1'>{heading}</h1>)}
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
