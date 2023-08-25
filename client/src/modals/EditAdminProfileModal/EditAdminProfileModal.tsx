import { useContext } from 'react';

import { UserContext } from 'common/contexts';
import { EditAdminProfileForm } from 'forms';
import { Modal, ModalProps } from 'modals';
import { EditAdminProfileFormData } from 'types';

import styles from './EditAdminProfileModal.module.scss';

interface EditProfileModalProps extends ModalProps {}

export function EditAdminProfileModal({
  isShowing,
  onClose,
}: EditProfileModalProps) {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  const initialValues: EditAdminProfileFormData = {
    ...user,
  };

  return (
    <Modal isShowing={isShowing} onClose={onClose}>
      <div className={styles.modal}>
        <h1 className="heading-H1">Изменить данные профиля</h1>
        <EditAdminProfileForm
          initialValues={initialValues}
          onSubmit={onClose}
        />
      </div>
    </Modal>
  );
}
