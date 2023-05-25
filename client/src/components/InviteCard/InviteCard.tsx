import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { Button, ButtonHeight, ButtonVariant } from 'components';
import { Invite } from 'models';
import { useModal } from 'common/hooks';
import { InviteDetailsModal, InviteModalType } from 'modals';
import {
  concatUserNameAndAge,
  getInviteCompanionsInfoString,
  lowercaseFirstLetter,
  wordFormatDate,
} from 'common/helpers';
import { UserContext } from 'common/contexts';

import styles from './InviteCard.module.scss';
import calendar from 'assets/images/calendar.svg';
import { SERVER_URL } from 'common/constants';

export enum InviteCardVariant {
  BIG_USER = 'Big User',
  NO_USER = 'No User',
  SMALL_USER = 'Small User',
}

interface InviteCardProps {
  invite: Invite;
  variant?: InviteCardVariant;
  onInviteAction?: (eventId: string) => void;
  isAdmin?: boolean;
}

export const InviteCard = observer(
  ({
    invite,
    onInviteAction,
    variant = InviteCardVariant.BIG_USER,
    isAdmin = false,
  }: InviteCardProps) => {
    const [isShowingModal, toggleModal] = useModal();
    const { userResponses } = useContext(UserContext);

    return (
      <>
        <li
          className={classNames(styles.card, {
            [styles.cardWithoutUser]: variant !== InviteCardVariant.BIG_USER,
            [styles.cardWide]: variant === InviteCardVariant.SMALL_USER,
          })}
        >
          {variant === InviteCardVariant.BIG_USER && (
            <NavLink
              to={`/user/${invite.creator.login}`}
              className={styles.photoNameWrapper}
            >
              <img
                className={styles.photo}
                src={SERVER_URL + invite.creator.image}
                alt="Фото"
              />
              <span>{concatUserNameAndAge(invite.creator)}</span>
            </NavLink>
          )}
          <div className={styles.inviteInfo}>
            <div className={styles.dateWrapper}>
              <img src={calendar} alt="Календарь" width={'13px'} />
              {wordFormatDate(invite.date, invite.time)}
            </div>
            <h3 className={styles.heading}>
              {invite.event ? 'Посетить ' : 'Хочет '}
              <span className={styles.blue}>
                {lowercaseFirstLetter(invite.subject)}
              </span>
            </h3>
            <p className={styles.description}>
              {getInviteCompanionsInfoString(invite)}
            </p>
          </div>
          {variant === InviteCardVariant.SMALL_USER && (
            <NavLink
              to={`/user/${invite.creator.login}`}
              className={styles.creator}
            >
              <img
                className={styles.creatorImage}
                src={SERVER_URL + invite.creator.image}
                alt={invite.creator.name}
              />
              <span className={styles.creatorInfo}>
                {concatUserNameAndAge(invite.creator)}
              </span>
            </NavLink>
          )}
          {userResponses
            .map((response) => response.invite?._id)
            .includes(invite._id) ? (
            <Button
              variant={ButtonVariant.Secondary}
              height={ButtonHeight.Small}
              disabled
            >
              Вы откликнулись
            </Button>
          ) : (
            <Button
              variant={ButtonVariant.Secondary}
              height={ButtonHeight.Small}
              onClick={toggleModal}
            >
              Посмотреть инвайт
            </Button>
          )}
        </li>

        <InviteDetailsModal
          invite={invite}
          isShowing={isShowingModal}
          onClose={toggleModal}
          onInviteAction={onInviteAction}
          modalType={isAdmin ? InviteModalType.Delete : undefined}
        />
      </>
    );
  },
);
