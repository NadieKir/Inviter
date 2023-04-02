import { Modal, ModalProps } from 'modals';

import styles from './ViewInviteModal.module.scss';

export const ViewInviteModal = ({ isShowing, onClose }: ModalProps) => (
  <Modal isShowing={isShowing} onClose={onClose}>
    <div className={styles.a}>fdfvd</div>
  </Modal>
);
