import { Modal, ModalProps } from 'modals';
import { Event } from 'models';

import { EditEventForm } from 'forms/EventForm/components/EditEventForm';
import { CreateEventForm } from 'forms/EventForm/components/CreateEventForm';

import styles from './CreateEventModal.module.scss';

interface ViewEventModalProps extends ModalProps {
  event?: Event;
  isEdit?: boolean;
  onSubmit?: () => void;
}

export const CreateEventModal = ({
  isShowing,
  onClose,
  onSubmit,
  isEdit = false,
  event,
}: ViewEventModalProps) => (
  <Modal isShowing={isShowing} onClose={onClose}>
    <div className={styles.modal}>
      {isEdit ? (
        <EditEventForm event={event!} onSubmit={() => onSubmit?.()} />
      ) : (
        <CreateEventForm onSubmit={() => onSubmit?.()} />
      )}
    </div>
  </Modal>
);
