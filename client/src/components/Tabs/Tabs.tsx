import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { NavTabs } from 'components';

import styles from './Tabs.module.scss';

export type TabDescriptor = {
  label: string;
  link: string;
  component: JSX.Element;
  description?: string;
};

interface TabsProps {
  descriptor: TabDescriptor[];
}

export const Tabs = ({ descriptor }: TabsProps) => {
  return (
    <NavTabs className={styles.tabs}>
      {descriptor.map((tab) => (
        <NavLink
          key={tab.link}
          to={tab.link}
          title={tab.description}
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
  );
};
