import { Modal, ModalProps } from 'modals';

import { EditEventForm } from 'forms/EventForm/components/EditEventForm';
import { CreateEventForm } from 'forms/EventForm/components/CreateEventForm';

import styles from './CreateEventModal.module.scss';

interface ViewEventModalProps extends ModalProps {
  isEdit?: boolean;
}

export const CreateEventModal = ({
  isShowing,
  onClose,
  isEdit = false,
}: ViewEventModalProps) => (
  <Modal isShowing={isShowing} onClose={onClose}>
    <div className={styles.modal}>
      {isEdit ? (
        <EditEventForm onSubmit={onClose} />
      ) : (
        <CreateEventForm onSubmit={onClose} />
      )}
    </div>
  </Modal>
);
