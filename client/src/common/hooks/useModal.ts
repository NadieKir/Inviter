import { useState } from 'react'

type ModalProps = [
  isShowingModal: boolean, 
  toggleModal: () => void
]

const useModal = (): ModalProps => {
  const [isShowingModal, setIsShowingModal] = useState(false);

  function toggleModal() {
    setIsShowingModal(!isShowingModal);
  }

  return [isShowingModal, toggleModal];
}

export default useModal;