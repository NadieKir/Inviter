import { useContext } from "react";

import { UserContext } from "common/contexts";
import { EditProfileForm } from "forms/EditProfileForm/EditProfileForm";
import { Modal, ModalProps } from "modals/Modal/Modal";
import { EditProfileFormData } from "types";

import styles from './EditProfileModal.module.scss';


interface EditProfileModalProps extends ModalProps {
};

export function EditProfileModal({
    isShowing,
    onClose
}: EditProfileModalProps) {
    const { user } = useContext(UserContext);

    if (!user) {
        return null;
    }

    const initialValues: EditProfileFormData = {
        ...user,
    };

    return (
        <Modal isShowing={isShowing} onClose={onClose}>
            <div className={styles.modal}>
                <EditProfileForm
                    initialValues={initialValues}
                    onSubmit={onClose}
                />
            </div>
        </Modal>
    )
}