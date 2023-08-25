import { Button } from 'components';
import { useModal } from 'common/hooks';
import { CreateEventModal, CreateInviteModal } from 'modals';
import { Role } from 'models';

import styles from './NavbarAction.module.scss';
import plus from '../../assets/plus.svg';
import plusBlue from 'assets/images/plus-blue.svg';

export enum ActionVariant {
  DEFAULT = 'Default',
  NO_TEXT = 'No text',
}

interface NavbarActionProps {
  variant: ActionVariant;
  userRole: Role;
}

export function NavbarAction({ variant, userRole }: NavbarActionProps) {
  const [isShowingModal, toggleModal] = useModal();

  return (
    <>
      {variant === ActionVariant.DEFAULT ? (
        <Button onClick={toggleModal}>
          <img src={plus} alt="Плюс" />{' '}
          {userRole === Role.ADMIN ? 'Добавить событие' : 'Создать инвайт'}
        </Button>
      ) : (
        <button className={styles.btn} onClick={toggleModal}>
          <img src={plusBlue} alt="" height={'23px'} />
        </button>
      )}

      {userRole === Role.ADMIN ? (
        <CreateEventModal
          isShowing={isShowingModal}
          onClose={toggleModal}
          onSubmit={toggleModal}
        />
      ) : (
        <CreateInviteModal
          isShowing={isShowingModal}
          onClose={toggleModal}
          onSubmit={toggleModal}
        />
      )}
    </>
  );
}
