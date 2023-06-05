import { NavLink } from 'react-router-dom';

import { Invite, User } from 'models';
import { concatUserNameAndAge } from 'common/helpers';

import styles from './CompanionItem.module.scss';
import cross from 'assets/images/redCross.svg';
import { SERVER_URL } from 'common/constants';
import { deleteInviteCompanion } from 'api';

type Props = {
  invite: Invite;
  companion: User;
  canDelete?: boolean;
  onDelete?: (user: User) => void;
};

export function CompanionItem({
  invite,
  companion,
  canDelete = false,
  onDelete,
}: Props) {
  return (
    <li title={companion.connectionMethods} className={styles.companionItem}>
      <NavLink
        to={`/user/${companion.login}`}
        className={styles.companionItemInfo}
      >
        <img
          className={styles.companionItemImage}
          src={SERVER_URL + companion.image}
          alt={companion.name}
        />
        <span className={styles.companionItemName}>
          {concatUserNameAndAge(companion)}
        </span>
      </NavLink>
      {canDelete && (
        <img
          className={styles.cross}
          src={cross}
          alt={'Удалить'}
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();

            await deleteInviteCompanion(invite._id, companion._id);

            onDelete?.(companion);
          }}
        />
      )}
    </li>
  );
}
