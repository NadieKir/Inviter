import { NavLink } from 'react-router-dom';

import { Button, ButtonHeight, ButtonVariant, ButtonWidth } from 'components';
import { Invite } from 'models';
import {
  wordFormatDate,
  getInviteCompanionsInfoString,
  concatUserNameAndAge,
  lowercaseFirstLetter,
} from 'common/helpers';
import { useInviteDetailsModalContext } from 'common/contexts';
import { InviteModalType } from 'modals';

import styles from './InviteResponseCard.module.scss';
import calendar from 'assets/images/calendar.svg';

interface Props {
  invite: Invite;
}

export function InviteResponseCard({ invite }: Props) {
  const { openModal } = useInviteDetailsModalContext();

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.headingInfo}>
          <span className={styles.date}>
            <img src={calendar} alt="calendar" height="13px" />
            {wordFormatDate(invite.date, invite.time)}
          </span>
          <span className={styles.subject}>
            Хочет{' '}
            <span className="blue">{lowercaseFirstLetter(invite.subject)}</span>
          </span>
          <span className={styles.companionsInfo}>
            {getInviteCompanionsInfoString(invite)}
          </span>
        </div>
        <NavLink
          to={`/user/${invite.creator.login}`}
          className={styles.creator}
        >
          <img
            className={styles.creatorImage}
            src={invite.creator.image}
            alt={invite.creator.name}
          />
          <span className={styles.creatorInfo}>
            {concatUserNameAndAge(invite.creator)}
          </span>
        </NavLink>
      </div>
      <div className={styles.actions}>
        <Button
          variant={ButtonVariant.Secondary}
          width={ButtonWidth.Small}
          height={ButtonHeight.Small}
          onClick={() => openModal(invite, InviteModalType.Delete)}
        >
          Подробнее
        </Button>
      </div>
    </div>
  );
}
