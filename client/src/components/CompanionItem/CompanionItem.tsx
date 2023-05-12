import React from 'react';

import { User } from 'models';
import { concatUserNameAndAge } from 'common/helpers';

import styles from './CompanionItem.module.scss';
import cross from 'assets/images/redCross.svg';

type Props = {
  companion: User;
  canDelete?: boolean;
  onDelete?: (user: User) => void;
};

export function CompanionItem({
  companion,
  canDelete = false,
  onDelete,
}: Props) {
  return (
    <li title={companion.connectionMethods} className={styles.companionItem}>
      <div className={styles.companionItemInfo}>
        <img
          className={styles.companionItemImage}
          src={companion.image}
          alt={companion.name}
        />
        <span className={styles.companionItemName}>
          {concatUserNameAndAge(companion)}
        </span>
      </div>
      {canDelete && <img className={styles.cross} src={cross} alt={''} />}
    </li>
  );
}
