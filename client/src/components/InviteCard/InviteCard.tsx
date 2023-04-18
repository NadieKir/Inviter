import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { Button, ButtonHeight, ButtonVariant } from 'components';
import { Invite } from 'models';
import useModal from 'common/hooks/useModal';
import { InviteDetailsModal } from 'modals';

import styles from './InviteCard.module.scss';
import mockUser from 'assets/images/mock-user-photo.jpg';
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
              to={`/user/${invite.creator.id}`}
              className={styles.photoNameWrapper}
            >
              <img className={styles.photo} src={mockUser} alt="Фото" />
              <span>{invite.creator.name}, 33</span>
            </NavLink>
          )}
          <div className={styles.inviteInfo}>
            <div className={styles.dateWrapper}>
              <img src={calendar} alt="Календарь" width={'13px'} />
              {invite.date} {invite.time}
            </div>
            <h3 className={styles.heading}>
              Хочет <span className={styles.blue}>{invite.subject}</span>
            </h3>
            <p className={styles.description}>
              {invite.companionGender} {invite.companionAge}
            </p>
          </div>
          <Button
            variant={ButtonVariant.Secondary}
            height={ButtonHeight.Small}
            onClick={toggleModal}
          >
            Посмотреть инвайт
          </Button>
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
