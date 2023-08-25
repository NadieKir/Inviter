import { Modal, ModalProps } from 'modals';
import { CreateInviteForm, EditInviteForm } from 'forms';

import { Invite } from 'models';

import styles from './CreateInviteModal.module.scss';

interface ViewInviteModalProps extends ModalProps {
  invite?: Invite;
  isEdit?: boolean;
  onSubmit?: () => void;
}

export const CreateInviteModal = ({
  isShowing,
  onClose,
  onSubmit,
  invite,
  isEdit = false,
}: ViewInviteModalProps) => (
  <Modal isShowing={isShowing} onClose={onClose}>
    <div className={styles.modal}>
      {isEdit
        ? <EditInviteForm invite={invite!} onSubmit={() => onSubmit?.()} />
        : <CreateInviteForm onSubmit={() => onSubmit?.()} />}
    </div>
  </Modal>
);
