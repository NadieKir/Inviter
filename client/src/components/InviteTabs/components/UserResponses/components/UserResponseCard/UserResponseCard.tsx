import { Button, ButtonHeight, ButtonType, ButtonVariant, ButtonWidth } from "components";
import { Invite } from "models";

import { getUserInfo } from "common/helpers/user";
import { formatInviteDate } from "common/helpers";

import styles from './UserResponseCard.module.scss';
import calendar from 'assets/images/calendar.svg';
import { getInviteCompanionsInfoString } from "common/helpers/invite";

interface Props {
    invite: Invite;
}

export function UserResponseCard({
    invite,
}: Props) {
    return (
        <div className={styles.card}>
            <div className={styles.left}>
                <span className={styles.date}>
                    <img src={calendar} alt="calendar" />
                    {invite.date
                        ? formatInviteDate(new Date(invite.date), invite.time)
                        : 'Любое время'
                    }
                </span>
                <span className={styles.subject}>Хочет{' '}<span className={styles.blue}>{invite.subject}</span></span>
                <span className={styles.companionsInfo}>{getInviteCompanionsInfoString(invite)}</span>
                <div className={styles.creator}>
                    <img className={styles.creatorImage} src={invite.creator.image} alt={invite.creator.name} />
                    <span className={styles.creatorInfo}>{getUserInfo(invite.creator)}</span>
                </div>
            </div>
            <div className={styles.actions}>
                <Button
                    variant={ButtonVariant.Secondary}
                    width={ButtonWidth.Small}
                    height={ButtonHeight.Small}
                >
                    Подробнее
                </Button>
                <Button
                    variant={ButtonVariant.Secondary}
                    width={ButtonWidth.Small}
                    height={ButtonHeight.Small}
                    buttonType={ButtonType.Danger}
                >
                    Удалить
                </Button>
            </div>
        </div>
    )
}