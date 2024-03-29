import { NavLink } from 'react-router-dom';

import { Event, Invite } from 'models';
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
import {
  concatUserNameAndAge,
  getInviteCompanionsInfoString,
  lowercaseFirstLetter,
} from 'common/helpers';
import { useInviteDetailsModalContext } from 'common/contexts';
import { InviteModalType } from 'modals';
import { wordFormatDate } from 'common/helpers';
import { SERVER_URL } from 'common/constants';
import {
  approveInvite,
  approveOtherInviteResponse,
  deleteOtherInviteResponse,
} from 'api';

import styles from './CreatedInviteCard.module.scss';
import check from 'assets/images/greenCheck.svg';
import cross from 'assets/images/redCross.svg';
import calendar from 'assets/images/calendar.svg';

interface Props {
  invite: Invite;
  onAction?: () => void;
}

export function CreatedInviteCard({ invite, onAction }: Props) {
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
      <NavLink to={`/user/${r.user.login}`} className={styles.response}>
        <img
          className={styles.responseImage}
          src={SERVER_URL + r.user.image}
          alt=""
        />
        <div className={styles.responseInfo}>
          <span className={styles.responseInfoName}>
            {concatUserNameAndAge(r.user)}
          </span>
          <span>{r.message}</span>
        </div>
        <div className={styles.responseActions}>
          <IconButton
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();

              await approveOtherInviteResponse(r._id);

              onAction?.();
            }}
            buttonColor={IconButtonColor.Green}
            icon={check}
          />
          <IconButton
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();

              await deleteOtherInviteResponse(r._id);

              onAction?.();
            }}
            buttonColor={IconButtonColor.Red}
            icon={cross}
          />
        </div>
      </NavLink>
    ));
  };

  return (
    <li className={styles.card}>
      <div className={styles.info}>
        <div className={styles.a}>
          <div className={styles.headingInfo}>
            <span className={styles.date}>
              <img src={calendar} alt="calendar" />
              {wordFormatDate(invite.date, invite.time)}
            </span>
            <span className={styles.subject}>
              {event ? 'Посетить ' : 'Хочет '}
              <span className={styles.blue}>
                {lowercaseFirstLetter(invite.subject)}
              </span>
            </span>
            <span className={styles.companionsInfo}>
              {getInviteCompanionsInfoString(invite)}
            </span>
          </div>

          <div className={styles.actionsSmallBp}>
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
              disabled={companionsAmount === 0}
            >
              Утвердить
            </Button>
          </div>
        </div>
        <Divider />
        <div className={styles.companions}>
          <span className={styles.companionsAmount}>
            Компания <span className="amount">({companionsAmount})</span>
          </span>
          <ul className={styles.companionsUsers}>
            {(companions ?? []).map((c) => (
              <CompanionItem
                invite={invite}
                companion={c}
                canDelete
                onDelete={onAction}
              />
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
            disabled={companionsAmount === 0}
            onClick={async () => {
              await approveInvite(invite._id);

              onAction?.();
            }}
          >
            Утвердить
          </Button>
        </div>
      </div>
      <div className={styles.responses}>
        <span>
          Хотят с вами <span className="amount">({responsesAmount})</span>
        </span>
        {renderResponses()}
      </div>
    </li>
  );
}
