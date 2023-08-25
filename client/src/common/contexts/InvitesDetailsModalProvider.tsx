import { InviteDetailsModal, InviteModalType } from "modals";
import { Invite } from "models";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type InviteModalData = {
  invite: Invite;
  modalType: InviteModalType;
}

type InviteDetailsModalContextData = {
  openModal: (invite: Invite, modalType: InviteModalType) => void;
};

const InviteDetailsModalContext = createContext<InviteDetailsModalContextData>({
  openModal: () => { },
});

export const useInviteDetailsModalContext = () => useContext(InviteDetailsModalContext);

export const InvitesDetailsModalProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [inviteModalData, setInviteModalData] = useState<InviteModalData | null>(null);

  const openModal = (invite: Invite, modalType: InviteModalType) => setInviteModalData({ invite, modalType });

  const closeModal = () => {
    setInviteModalData(null)
  };

  const contextData: InviteDetailsModalContextData = {
    openModal,
  };

  return (
    <InviteDetailsModalContext.Provider value={contextData}>
      {children}
      {inviteModalData && (
        <InviteDetailsModal
          isShowing={true}
          onClose={closeModal}
          {...inviteModalData}
        />
      )}
    </InviteDetailsModalContext.Provider>
  );
};
