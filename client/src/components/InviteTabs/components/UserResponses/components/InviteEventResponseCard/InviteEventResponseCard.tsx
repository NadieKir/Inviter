import { Divider, InviterItem } from 'components';
import { InviteEventResponse } from 'models';

import { lowercaseFirstLetter, wordFormatDate } from 'common/helpers';

import styles from './InviteEventResponseCard.module.scss';
import calendar from 'assets/images/calendar.svg';

interface Props {
  inviteEventResponse: InviteEventResponse;
}

export function InviteEventResponseCard({ inviteEventResponse }: Props) {
  const event = inviteEventResponse.event!;
  const inviters = inviteEventResponse.inviters;
  const inviteInfo = inviters[0];
  const invitersAmount = inviters?.length ?? 0;

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.headingInfo}>
          <span className={styles.date}>
            <img src={calendar} alt="calendar" height="13px" />
            {wordFormatDate(inviteInfo.date, inviteInfo.time)}
          </span>
          <span className={styles.subject}>
            Хочет{' '}
            <span className="blue">
              {lowercaseFirstLetter(inviteInfo.subject)}
            </span>
          </span>
        </div>
        <Divider />
      </div>
      <div className={styles.invitersBlock}>
        <span className={styles.invitersLabel}>
          Приглашающие <span className="amount"> ({invitersAmount})</span>
        </span>
        <ul className={styles.inviters}>
          {inviters.map((i) => (
            <InviterItem invite={i} />
          ))}
        </ul>
      </div>
    </div>
  );
}
