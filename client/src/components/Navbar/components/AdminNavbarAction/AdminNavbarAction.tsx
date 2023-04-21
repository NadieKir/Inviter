import { Button } from 'components/Button/Button';
import { useModal } from 'common/hooks';
import { CreateEventModal } from 'modals';

import plus from '../../assets/plus.svg';

export function AdminNavbarAction() {
  const [isShowingModal, toggleModal] = useModal();

  return (
    <>
      <Button onClick={toggleModal}>
        <img src={plus} alt="Плюс" /> {'Добавить событие'}
      </Button>

      <CreateEventModal isShowing={isShowingModal} onClose={toggleModal} />
    </>
  );
}
