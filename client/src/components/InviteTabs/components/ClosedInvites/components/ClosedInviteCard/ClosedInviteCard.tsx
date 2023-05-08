import { useContext } from 'react';
import { Button, ButtonHeight, ButtonVariant, ButtonWidth, CompanionItem } from 'components';
import { Invite } from 'models';
import {
  getInviteCompanionsInfoString,
  wordFormatDate,
} from 'common/helpers';
import { UserContext } from 'common/contexts';

import styles from './ClosedInviteCard.module.scss';
import calendar from 'assets/images/calendar.svg';

interface Props {
  invite: Invite;
}

export function ClosedInviteCard({ invite }: Props) {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.info}>
          <span className={styles.subject}>
            Хочет <span className={styles.blue}>{invite.subject}</span>
          </span>
          <span className={styles.date}>
            <img src={calendar} alt="calendar" />
            {wordFormatDate(invite.date, invite.time)}
          </span>
          <span className={styles.companionsInfo}>
            {getInviteCompanionsInfoString(invite)}
          </span>
        </div>
        <div className={styles.companions}>
          <span>Компания</span>
          <ul className={styles.companionsUsers}>
            {(invite.companions ?? []).map((c) => (
              <CompanionItem companion={c} canDelete={user?._id === invite.creator._id} />
            ))}
          </ul>
        </div>
      </div>
      <Button
        className={styles.actions}
        variant={ButtonVariant.Secondary}
        width={ButtonWidth.Small}
        height={ButtonHeight.Small}
      >
        Подробнее
      </Button>
    </div>
  );
}
