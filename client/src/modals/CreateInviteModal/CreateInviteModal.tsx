import { Modal, ModalProps } from 'modals';
import { CreateInviteForm, EditInviteForm } from 'forms';

import styles from './CreateInviteModal.module.scss';

interface ViewInviteModalProps extends ModalProps {
  isEdit?: boolean;
}

export const CreateInviteModal = ({
  isShowing,
  onClose,
  isEdit = false,
}: ViewInviteModalProps) => (
  <Modal isShowing={isShowing} onClose={onClose}>
    <div className={styles.modal}>
      {isEdit ? <EditInviteForm /> : <CreateInviteForm />}
    </div>
  </Modal>
);
