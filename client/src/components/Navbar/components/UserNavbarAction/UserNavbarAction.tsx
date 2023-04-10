import { Button } from "components/Button/Button";
import useModal from "common/hooks/useModal";
import { CreateInviteModal } from "modals";

import plus from '../../assets/plus.svg';

export function UserNavbarAction() {
    const [isShowingModal, toggleModal] = useModal();

    return (
        <>
            <Button onClick={toggleModal}>
                <img src={plus} alt="Плюс" />{' '}
                {'Создать инвайт'}
            </Button>

            <CreateInviteModal isShowing={isShowingModal} onClose={toggleModal} />
        </>
    );
}