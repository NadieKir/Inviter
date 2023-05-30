import { useContext } from 'react';
import {
  Button,
  ButtonHeight,
  ButtonVariant,
  CompanionItem,
  Divider,
} from 'components';
import { Invite, InviteStatus } from 'models';
import {
  getInviteCompanionsInfoString,
  lowercaseFirstLetter,
  wordFormatDate,
} from 'common/helpers';
import { UserContext, useInviteDetailsModalContext } from 'common/contexts';
import { InviteModalType } from 'modals';

import styles from './ClosedInviteCard.module.scss';
import calendar from 'assets/images/calendar.svg';
import { markInviteAsPast } from 'api';

interface Props {
  invite: Invite;
  onAction?: (id: string) => void;
}

export function ClosedInviteCard({ invite, onAction }: Props) {
  const { user } = useContext(UserContext);

  const { openModal } = useInviteDetailsModalContext();

  const canMarkAsPast = !invite.date && invite.status !== InviteStatus.PAST;

  const companions = invite.companions.filter(c => c._id !== user?._id);

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
              Хочет{' '}
              <span className="blue">
                {lowercaseFirstLetter(invite.subject)}
              </span>
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
            {invite.creator._id !== user?._id && (
              <li>
                <CompanionItem
                  invite={invite}
                  companion={invite.creator}
                  canDelete={false}
                />
              </li>
            )}
            {companions.map((c) => (
              <CompanionItem
                invite={invite}
                companion={c}
                canDelete={user?._id === invite.creator._id}
              />
            ))}
          </ul>
        </div>
      </div>
      {canMarkAsPast && (
        <Button
          className={styles.button}
          height={ButtonHeight.Small}
          variant={ButtonVariant.Primary}
          onClick={async () => {
            await markInviteAsPast(invite._id);
            onAction?.(invite._id);
          }}
        >
          Пометить как "Прошедший"
        </Button>
      )}
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
