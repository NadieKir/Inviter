import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.scss';

export interface ModalProps {
  isShowing: boolean;
  onClose: () => void;
}

export const Modal = ({
  isShowing,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) => {
  if (!isShowing) {
    return null;
  }

  const handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.currentTarget === event.target) {
      event.stopPropagation();
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modal} onClick={handleClose}>
      {children}
    </div>,
    document.body,
  );
};
