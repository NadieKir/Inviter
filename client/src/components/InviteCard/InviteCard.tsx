import { useContext } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { Button, ButtonHeight, ButtonVariant } from 'components';
import { Invite } from 'models';
import { useModal } from 'common/hooks';
import { InviteDetailsModal } from 'modals';
import {
  concatUserNameAndAge,
  formatInviteDate,
  getInviteCompanionsInfoString,
} from 'common/helpers';
import { UserContext } from 'common/contexts';

import styles from './InviteCard.module.scss';
import calendar from 'assets/images/calendar.svg';

interface InviteCardProps {
  invite: Invite;
  noUserVariant?: boolean;
}

export const InviteCard = ({
  invite,
  noUserVariant = false,
}: InviteCardProps) => {
  const [isShowingModal, toggleModal] = useModal();
  const { userResponses } = useContext(UserContext);

  console.log(invite);
  return (
    <>
      <li>
        <article
          className={classNames(styles.card, {
            [styles.cardWithoutUser]: noUserVariant,
          })}
        >
          {!noUserVariant && (
            <NavLink
              to={`/user/${invite.creator.login}`}
              className={styles.photoNameWrapper}
            >
              <img
                className={styles.photo}
                src={invite.creator.image}
                alt="Фото"
              />
              <span>{concatUserNameAndAge(invite.creator)}</span>
            </NavLink>
          )}
          <div className={styles.inviteInfo}>
            <div className={styles.dateWrapper}>
              <img src={calendar} alt="Календарь" width={'13px'} />
              {formatInviteDate(invite.date, invite.time)}
            </div>
            <h3 className={styles.heading}>
              Хочет <span className={styles.blue}>{invite.subject}</span>
            </h3>
            <p className={styles.description}>
              {getInviteCompanionsInfoString(invite)}
            </p>
          </div>
          {userResponses
            .map((response) => response.invite._id)
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
        </article>
      </li>

      <InviteDetailsModal
        invite={invite}
        isShowing={isShowingModal}
        onClose={toggleModal}
      />
    </>
  );
};
