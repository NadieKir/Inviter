import { useContext } from 'react';
import {
  Button,
  ButtonHeight,
  ButtonVariant,
  CompanionItem,
  Divider,
} from 'components';
import { Invite } from 'models';
import { getInviteCompanionsInfoString, wordFormatDate } from 'common/helpers';
import { UserContext, useInviteDetailsModalContext } from 'common/contexts';

import styles from './ClosedInviteCard.module.scss';
import calendar from 'assets/images/calendar.svg';
import { InviteModalType } from 'modals';

interface Props {
  invite: Invite;
}

export function ClosedInviteCard({ invite }: Props) {
  const { user } = useContext(UserContext);

  const { openModal } = useInviteDetailsModalContext();

  return (
    <div className={styles.card}>
      <div className={styles.a}>
        <div className={styles.info}>
          <div className={styles.headingInfo}>
            <span className={styles.date}>
              <img src={calendar} alt="calendar" height="13px" />
              {wordFormatDate(invite.date, invite.time)}
            </span>
            <span className={styles.subject}>
              Хочет <span className="blue">{invite.subject}</span>
            </span>
            <span className={styles.companionsInfo}>
              {getInviteCompanionsInfoString(invite)}
            </span>
          </div>
          <Divider />
        </div>
        <div className={styles.invitersBlock}>
          <span className={styles.invitersLabel}>Компания</span>
          <ul className={styles.inviters}>
            {invite.companions.map((c) => (
              <CompanionItem
                companion={c}
                canDelete={user?._id === invite.creator._id}
              />
            ))}
          </ul>
        </div>
      </div>
      <Button
        className={styles.button}
        height={ButtonHeight.Small}
        variant={ButtonVariant.Secondary}
        onClick={() => openModal(invite, InviteModalType.Delete)}
      >
        Подробнее
      </Button>
    </div>
  );
}
