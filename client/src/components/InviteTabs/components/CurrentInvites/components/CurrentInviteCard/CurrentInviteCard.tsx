import { Invite } from "models";

import { Button, ButtonHeight, ButtonType, ButtonVariant, ButtonWidth, IconButton, IconButtonColor } from "components";

import styles from './CurrentInviteCard.module.scss';
import check from 'assets/images/greenCheck.svg';
import cross from 'assets/images/redCross.svg';
import { getUserInfo } from "common/helpers/user";
import { getInviteCompanionsInfoString } from "common/helpers/invite";

interface Props {
    invite: Invite;
}

export function CurrentInviteCard({
    invite,
}: Props) {
    const { companions, companionsAmount, responses } = invite;
    const plannedCompanions = companionsAmount ?? 0;
    const currentCompanions = companions?.length ?? 0;

    const companionsLeft = plannedCompanions - currentCompanions;

    const renderResponses = () => {
        if (!responses || responses.length === 0) {
            return (
                <span className={styles.noResponses}>Новых откликов пока нет</span>
            );
        }

        return (
            responses.map(r => (
                <div className={styles.response}>
                    <img className={styles.responseImage} src={r.user.image} alt='' />
                    <div className={styles.responseInfo}>
                        <span className={styles.responseInfoName}>{getUserInfo(r.user)}</span>
                        <span>{r.message}</span>
                    </div>
                    <div className={styles.responseActions}>
                        <IconButton buttonColor={IconButtonColor.Green} icon={check} />
                        <IconButton buttonColor={IconButtonColor.Red} icon={cross} />
                    </div>
                </div>
            ))
        );
    }

    return (
        <li className={styles.card}>
            <div className={styles.info}>
                <div className={styles.headingInfo}>
                    <span className={styles.subject}>Хочет{' '}<span className={styles.blue}>{invite.subject}</span></span>
                    <span className={styles.companionsInfo}>{getInviteCompanionsInfoString(invite)}</span>
                </div>
                <div className={styles.companions}>
                    <span className={styles.companionsAmount}>Осталось найти:{' '}<span className={styles.blue}>{companionsLeft} человек(а)</span></span>
                    <ul className={styles.companionsUsers}>
                        {(companions ?? []).map(c => (
                            <li className={styles.companion}>
                                <img className={styles.companionImage} src={c.image} alt={c.name} />
                                <span className={styles.companionInfo}>{getUserInfo(c)}</span>
                                <img className={styles.cross} src={cross} alt={''} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.actions}>
                    <Button
                        variant={ButtonVariant.Secondary}
                        width={ButtonWidth.Small}
                        height={ButtonHeight.Small}
                    >
                        Cмотреть
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
            <div className={styles.responses}>
                {renderResponses()}
            </div>
        </li>
    );
}