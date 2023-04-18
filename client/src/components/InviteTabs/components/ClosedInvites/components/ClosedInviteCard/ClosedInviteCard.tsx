import { Invite } from "models";

import { Button, ButtonHeight, ButtonVariant, ButtonWidth } from "components/Button/Button";
import { getUserInfo } from "common/helpers/user";
import { formatInviteDate } from "common/helpers";

import styles from './ClosedInviteCard.module.scss';
import calendar from 'assets/images/calendar.svg';
import cross from 'assets/images/redCross.svg';
import { getInviteCompanionsInfoString } from "common/helpers/invite";


interface Props {
    invite: Invite;
}

export function ClosedInviteCard({
    invite,
}: Props) {
    return (
        <div className={styles.card}>
            <div className={styles.top}>
                <div className={styles.info}>
                    <span className={styles.subject}>Хочет{' '}<span className={styles.blue}>{invite.subject}</span></span>
                    <span className={styles.date}>
                        <img src={calendar} alt="calendar" />
                        {invite.date
                            ? formatInviteDate(new Date(invite.date))
                            : 'Любое время'
                        }
                    </span>
                    <span className={styles.companionsInfo}>{getInviteCompanionsInfoString(invite)}</span>
                </div>
                <div className={styles.companions}>
                    <span>Компания</span>
                    <ul className={styles.companionsUsers}>
                        {(invite.companions ?? []).map(c => (
                            <li className={styles.companion}>
                                <img className={styles.companionImage} src={c.image} alt={c.name} />
                                <span className={styles.companionInfo}>{getUserInfo(c)}</span>
                                <img className={styles.cross} src={cross} alt={''} />
                            </li>
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