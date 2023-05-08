import {
    Divider, InviterItem,
} from 'components';
import { InviteEventResponse } from 'models';

import { wordFormatDate } from 'common/helpers';

import styles from './InviteEventResponseCard.module.scss';
import calendar from 'assets/images/calendar.svg';

interface Props {
    inviteEventResponse: InviteEventResponse;
}

export function InviteEventResponseCard({
    inviteEventResponse,
}: Props) {
    const event = inviteEventResponse.event!;
    const inviters = inviteEventResponse.inviters;
    const invitersAmount = inviters?.length ?? 0;

    return (
        <div className={styles.card}>
            <div className={styles.info}>
                <span className={styles.date}>
                    <img src={calendar} alt="calendar" />
                    {wordFormatDate(event.date, event.time)}
                </span>
                <div className={styles.responseInfo}>
                    <span className={styles.subject}>
                        Событие: <span className={styles.blue}>{event.name}</span>
                    </span>
                </div>
                <Divider />
            </div>
            <div className={styles.invitersBlock}>
                <span className={styles.invitersLabel}>Приглашающие ({invitersAmount})</span>
                <ul className={styles.inviters}>
                    {inviters.map(i => (
                        <InviterItem invite={i} />
                    ))}
                </ul>
            </div>
        </div>
    );
}
