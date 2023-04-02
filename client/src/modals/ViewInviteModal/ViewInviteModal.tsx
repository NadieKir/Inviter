import { Modal } from 'modals';

import styles from './ViewInviteModal.module.scss';

interface ModalProps {
  isShowing: boolean;
  onCloseButtonClick: () => void;
}

export const ViewInviteModal = ({
  isShowing,
  onCloseButtonClick,
}: ModalProps) => {
  return (
    <Modal isShowing={isShowing} onCloseButtonClick={onCloseButtonClick}>
      <div className={styles.a}>fdfvd</div>
    </Modal>
  );
};
