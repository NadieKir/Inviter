import { Invite } from 'models';

import {
  Button,
  ButtonHeight,
  ButtonVariant,
  ButtonWidth,
  CompanionItem,
  Divider,
  IconButton,
  IconButtonColor,
} from 'components';
import { concatUserNameAndAge } from 'common/helpers/user';
import { getInviteCompanionsInfoString } from 'common/helpers/invite';

import styles from './CreatedInviteCard.module.scss';
import check from 'assets/images/greenCheck.svg';
import cross from 'assets/images/redCross.svg';
import { useInviteDetailsModalContext } from 'common/contexts';
import { InviteModalType } from 'modals';


interface Props {
  invite: Invite;
}

export function CreatedInviteCard({ invite }: Props) {
  const { openModal } = useInviteDetailsModalContext();

  const { companions, responses } = invite;

  const event = invite.event;

  const companionsAmount = companions?.length ?? 0;
  const responsesAmount = responses?.length ?? 0;

  const renderResponses = () => {
    if (!responses || responses.length === 0) {
      return (
        <span className={styles.noResponses}>Новых откликов пока нет</span>
      );
    }

    return responses.map((r) => (
      <div className={styles.response}>
        <img className={styles.responseImage} src={r.user.image} alt="" />
        <div className={styles.responseInfo}>
          <span className={styles.responseInfoName}>
            {concatUserNameAndAge(r.user)}
          </span>
          <span>{r.message}</span>
        </div>
        <div className={styles.responseActions}>
          <IconButton buttonColor={IconButtonColor.Green} icon={check} />
          <IconButton buttonColor={IconButtonColor.Red} icon={cross} />
        </div>
      </div>
    ));
  };

  return (
    <li className={styles.card}>
      <div className={styles.info}>
        <div className={styles.headingInfo}>
          <span className={styles.subject}>
            {event
              ? (
                <>
                  Событие: <span className={styles.blue}>{event.name}</span>
                </>
              )
              : (
                <>
                  Хочет <span className={styles.blue}>{invite.subject}</span>
                </>
              )
            }
          </span>
          <span className={styles.companionsInfo}>
            {getInviteCompanionsInfoString(invite)}
          </span>
        </div>
        <Divider />
        <div className={styles.companions}>
          <span className={styles.companionsAmount}>
            Компания ({companionsAmount})
          </span>
          <ul className={styles.companionsUsers}>
            {(companions ?? []).map((c) => (
              <CompanionItem companion={c} component='li' canDelete />
            ))}
          </ul>
        </div>
        <div className={styles.actions}>
          <Button
            variant={ButtonVariant.Secondary}
            width={ButtonWidth.Small}
            height={ButtonHeight.Small}
            onClick={() => openModal(invite, InviteModalType.Edit)}
          >
            Подробнее
          </Button>
          <Button
            variant={ButtonVariant.Primary}
            width={ButtonWidth.Small}
            height={ButtonHeight.Small}
          >
            Утвердить
          </Button>
        </div>
      </div>
      <div className={styles.responses}>
        <span>Хотят с вами <span>({responsesAmount})</span></span>
        {renderResponses()}
      </div>
    </li >
  );
}
