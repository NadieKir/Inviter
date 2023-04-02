import { NavLink } from 'react-router-dom';

import { Button, ButtonHeight, ButtonVariant } from 'components';
import { User } from 'common/models';

import styles from './UserCard.module.scss';
import mockUser from 'assets/images/mock-user-photo.jpg';
import calendar from 'assets/images/calendar.svg';
import useModal from 'common/hooks/useModal';
import { ViewInviteModal } from 'modals';

interface UserCardProps {
  user: User;
}
export const UserCard = ({ user }: UserCardProps) => {
  const { id, name } = user;

  const [isShowingModal, toggleModal] = useModal();

  return (
    <li>
      <ViewInviteModal
        isShowing={isShowingModal}
        onCloseButtonClick={toggleModal}
      />
      <article className={styles.card}>
        <NavLink to={`/user/${id}`} className={styles.photoNameWrapper}>
          <img className={styles.photo} src={mockUser} alt="Фото" />
          <span>{name}, 33</span>
        </NavLink>
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
  );
};
