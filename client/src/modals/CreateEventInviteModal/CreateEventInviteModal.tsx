import { Modal, ModalProps } from 'modals';
import { CreateInviteEventForm, EditInviteEventForm } from 'forms';
import { Event } from 'models';
import { wordFormatDate } from 'common/helpers';

import styles from './CreateEventInviteModal.module.scss';

interface ViewInviteEventModalProps extends ModalProps {
  event: Event;
  isEdit?: boolean;
}

export const CreateEventInviteModal = ({
  isShowing,
  onClose,
  event,
  isEdit = false,
}: ViewInviteEventModalProps) => {
  return (
    <Modal isShowing={isShowing} onClose={onClose}>
      <div className={styles.modal}>
        <h1 className={styles.heading}>
          {isEdit ? 'Изменить инвайт' : 'Создать инвайт на событие'}
        </h1>
        <div className={styles.eventInfo}>
          <div className={styles.eventInfoRow}>
            <span className={styles.eventInfoRowTitle}>Событие:</span>
            <span>{event.name}</span>
          </div>
          <div className={styles.eventInfoRow}>
            <span className={styles.eventInfoRowTitle}>Где:</span>
            <span>
              {event.city}, {event.address}
            </span>
          </div>
          <div className={styles.eventInfoRow}>
            <span className={styles.eventInfoRowTitle}>Когда:</span>
            <span>{wordFormatDate(event.date, event.time)}</span>
          </div>
        </div>
        {isEdit ? (
          <EditInviteEventForm event={event} onSubmit={onClose} />
        ) : (
          <CreateInviteEventForm event={event} onSubmit={onClose} />
        )}
      </div>
    </Modal>
  );
};
