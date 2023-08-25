import { createContext, PropsWithChildren, useContext, useState } from "react";

import { INotification, Notification } from "components";

type NotificationsContextData = {
  notification: INotification | null;
  addNotification: (notification: INotification) => void;
  cancelNotification: () => void;
};

const NotificationsContext = createContext<NotificationsContextData>({
  notification: null,
  addNotification: () => {},
  cancelNotification: () => {},
});

export const useNotificationsContext = () => useContext(NotificationsContext);

export const NotificationsProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [notification, setNotification] = useState<INotification | null>(null);

  const addNotification = (notification: INotification) => setNotification(notification);

  const cancelNotification = () => setNotification(null);

  const contextData: NotificationsContextData = {
    notification,
    addNotification,
    cancelNotification,
  };

  return (
    <NotificationsContext.Provider value={contextData}>
      {children}
      <Notification />
    </NotificationsContext.Provider>
  );
};
