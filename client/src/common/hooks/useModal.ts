import { useState } from 'react'

type ModalProps = [
  isShowingModal: boolean, 
  toggleModal: () => void
]

export const useModal = (): ModalProps => {
  const [isShowingModal, setIsShowingModal] = useState(false);

  function toggleModal() {
    setIsShowingModal(!isShowingModal);
  }

  return [isShowingModal, toggleModal];
}
