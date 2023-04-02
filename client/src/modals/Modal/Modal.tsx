import React, { PropsWithChildren, useState } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.scss';
import useModal from 'common/hooks/useModal';

interface ModalProps {
  isShowing: boolean;
  onCloseButtonClick: () => void;
}

export const Modal = ({
  isShowing,
  onCloseButtonClick,
  children,
}: PropsWithChildren<ModalProps>) => {
  if (!isShowing) {
    return null;
  }

  const handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.currentTarget === event.target) {
      event.stopPropagation();
      onCloseButtonClick();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modal} onClick={handleClose}>
      {children}
    </div>,
    document.body,
  );
};
