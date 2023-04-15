import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { Button, ButtonHeight, ButtonVariant } from 'components';
import { MockedUser, User } from 'models';
import useModal from 'common/hooks/useModal';
import { InviteDetailsModal } from 'modals';

import styles from './InviteCard.module.scss';
import mockUser from 'assets/images/mock-user-photo.jpg';
import calendar from 'assets/images/calendar.svg';

interface InviteCardProps {
  user: MockedUser;
  noUserVariant?: boolean;
}

export const InviteCard = ({
  user,
  noUserVariant = false,
}: InviteCardProps) => {
  const [isShowingModal, toggleModal] = useModal();

  const { id, name } = user;

  return (
    <>
      <li>
        <article
          className={classNames(styles.card, {
            [styles.cardWithoutUser]: noUserVariant,
          })}
        >
          {!noUserVariant && (
            <NavLink to={`/user/${id}`} className={styles.photoNameWrapper}>
              <img className={styles.photo} src={mockUser} alt="Фото" />
              <span>{name}, 33</span>
            </NavLink>
          )}
          <div className={styles.inviteInfo}>
            <div className={styles.dateWrapper}>
              <img src={calendar} alt="Календарь" width={'13px'} /> 21 января в
              18:30
            </div>
            <h3 className={styles.heading}>
              Хочет{' '}
              <span className={styles.blue}>сходить в театр юного зрителя</span>
            </h3>
            <p className={styles.description}>С девушкой 18-22 лет</p>
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

      {user && (
        <InviteDetailsModal isShowing={isShowingModal} onClose={toggleModal} />
      )}
    </>
  );
};
