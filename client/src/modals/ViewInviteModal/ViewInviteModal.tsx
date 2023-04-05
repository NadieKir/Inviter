import { Modal, ModalProps } from 'modals';
import { CreateInviteForm, EditInviteForm } from 'forms';

import styles from './ViewInviteModal.module.scss';

interface ViewInviteModalProps extends ModalProps {
  isEdit?: boolean;
}

export const ViewInviteModal = ({
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
