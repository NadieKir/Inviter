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
  getOverlapPercent,
  lowercaseFirstLetter,
  wordFormatDate,
} from 'common/helpers';
import { UserContext } from 'common/contexts';
import { SERVER_URL } from 'common/constants';

import styles from './InviteCard.module.scss';
import calendar from 'assets/images/calendar.svg';

export enum InviteCardVariant {
  BIG_USER = 'Big User',
  NO_USER = 'No User',
  SMALL_USER = 'Small User',
  EVENT_INVITE = 'Event Invite',
}

interface InviteCardProps {
  invite: Invite;
  variant?: InviteCardVariant;
  onInviteAction?: (eventId: string) => void;
}

export const InviteCard = observer(
  ({
    invite,
    onInviteAction,
    variant = InviteCardVariant.BIG_USER,
  }: InviteCardProps) => {
    const [isShowingModal, toggleModal] = useModal();
    const { user, userResponses, userIsAdmin, userInvites } =
      useContext(UserContext);

    const inviteSubject = invite.event ? invite.event.name : invite.subject;
    const inviteDate = invite.event ? invite.event.date : invite.date;
    const inviteTime = invite.event ? invite.event.time : invite.time;

    const renderButton = () => {
      if (
        userResponses
          .map((response) => response.invite?._id)
          .includes(invite._id)
      )
        return (
          <Button
            variant={ButtonVariant.Secondary}
            height={ButtonHeight.Small}
            disabled
          >
            Вы откликнулись
          </Button>
        );

      if (userInvites.map((i) => i._id).includes(invite._id))
        return (
          <Button
            variant={ButtonVariant.Secondary}
            height={ButtonHeight.Small}
            disabled
          >
            Вы уже компаньон
          </Button>
        );

      return (
        <Button
          variant={ButtonVariant.Secondary}
          height={ButtonHeight.Small}
          onClick={toggleModal}
        >
          Посмотреть инвайт
        </Button>
      );
    };

    if (variant === InviteCardVariant.EVENT_INVITE)
      return (
        <>
          <li
            className={classNames(
              styles.card,
              styles.cardWide,
              styles.cardWithoutUser,
            )}
          >
            <div className={styles.wrapper}>
              <div className={styles.userCommonWrapper}>
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
                <div className={styles.commonWrapper}>
                  <span className={styles.bold}>
                    {getOverlapPercent(
                      invite.creator.interests,
                      user!.interests,
                    )}
                  </span>
                  <span>общего</span>
                </div>
              </div>

              <div className={styles.inviteInfo}>
                <h3 className={styles.heading}>
                  Посетит{' '}
                  <span className="blue">
                    {getInviteCompanionsInfoString(invite).toLowerCase()}
                  </span>
                </h3>
                <p
                  className={classNames(
                    styles.description,
                    styles.inviteDescription,
                  )}
                >
                  {invite.description}
                </p>
              </div>
            </div>
            {renderButton()}
            {/* {userResponses
              .map((response) => response.invite?._id)
              .includes(invite._id) ? (
              <Button
                variant={ButtonVariant.Secondary}
                height={ButtonHeight.Small}
                disabled
              >
                Вы откликнулись
              </Button>
            ) : userInvites.map((invite) =>
                invite.companions.map((c) => c._id).includes(user!._id),
              ) ? (
              <Button
                variant={ButtonVariant.Secondary}
                height={ButtonHeight.Small}
                disabled
              >
                Вы уже компаньон
              </Button>
            ) : (
              <Button
                variant={ButtonVariant.Secondary}
                height={ButtonHeight.Small}
                onClick={toggleModal}
              >
                Посмотреть инвайт
              </Button>
            )} */}
            {/* {userResponses
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
            )} */}
          </li>

          <InviteDetailsModal
            invite={invite}
            isShowing={isShowingModal}
            onClose={toggleModal}
            onInviteAction={onInviteAction}
            modalType={userIsAdmin ? InviteModalType.Delete : undefined}
          />
        </>
      );

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
              to={`${userIsAdmin ? '/admin' : ''}/user/${invite.creator.login}`}
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
              {wordFormatDate(inviteDate, inviteTime)}
            </div>
            <h3 className={styles.heading}>
              {invite.event ? 'Посетить ' : 'Хочет '}
              <span className={styles.blue}>
                {lowercaseFirstLetter(inviteSubject)}
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
          {renderButton()}
          {/* {userResponses
            .map((response) => response.invite?._id)
            .includes(invite._id) ? (
            <Button
              variant={ButtonVariant.Secondary}
              height={ButtonHeight.Small}
              disabled
            >
              Вы откликнулись
            </Button>
          ) : userInvites.map((invite) =>
              invite.companions.map((c) => c._id).includes(user!._id),
            ) ? (
            <Button
              variant={ButtonVariant.Secondary}
              height={ButtonHeight.Small}
              disabled
            >
              Вы уже компаньон
            </Button>
          ) : (
            <Button
              variant={ButtonVariant.Secondary}
              height={ButtonHeight.Small}
              onClick={toggleModal}
            >
              Посмотреть инвайт
            </Button>
          )} */}
        </li>

        <InviteDetailsModal
          invite={invite}
          isShowing={isShowingModal}
          onClose={toggleModal}
          onInviteAction={onInviteAction}
          modalType={userIsAdmin ? InviteModalType.Delete : undefined}
        />
      </>
    );
  },
);
