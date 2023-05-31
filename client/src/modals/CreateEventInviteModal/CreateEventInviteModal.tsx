import { Modal, ModalProps } from 'modals';
import { CreateInviteEventForm, EditInviteEventForm } from 'forms';
import { Event, Invite } from 'models';
import { wordFormatDate } from 'common/helpers';

import styles from './CreateEventInviteModal.module.scss';
import { useEvent } from 'common/hooks';
import { Loader } from 'components';

interface ViewInviteEventModalProps extends ModalProps {
  event: string;
  invite?: Invite;
  isEdit?: boolean;
  onSubmit?: () => void;
}

export const CreateEventInviteModal = ({
  isShowing,
  onClose,
  onSubmit,
  event,
  invite,
  isEdit = false,
}: ViewInviteEventModalProps) => {
  const { event: eventModel, isEventLoading } = useEvent(event as string);

  if (!eventModel) {
    return null;
  }

  if (isEventLoading) {
    return <Loader />;
  }

  return (
    <Modal isShowing={isShowing} onClose={onClose}>
      <div className={styles.modal}>
        <h1 className={styles.heading}>
          {isEdit ? 'Редактировать инвайт на событие' : 'Создать инвайт на событие'}
        </h1>
        <div className={styles.eventInfo}>
          <div className={styles.eventInfoRow}>
            <span className={styles.eventInfoRowTitle}>Событие:</span>
            <span>{eventModel.name}</span>
          </div>
          <div className={styles.eventInfoRow}>
            <span className={styles.eventInfoRowTitle}>Где:</span>
            <span>
              {eventModel.city}, {eventModel.address}
            </span>
          </div>
          <div className={styles.eventInfoRow}>
            <span className={styles.eventInfoRowTitle}>Когда:</span>
            <span>{wordFormatDate(eventModel.date, eventModel.time)}</span>
          </div>
        </div>
        {isEdit ? (
          <EditInviteEventForm event={eventModel} invite={invite!} onSubmit={() => onSubmit?.()} />
        ) : (
          <CreateInviteEventForm event={eventModel} onSubmit={() => onSubmit?.()} />
        )}
      </div>
    </Modal>
  );
};
