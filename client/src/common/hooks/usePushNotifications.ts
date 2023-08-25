import { INotification, NotificationVariant } from "components";
import { useNotificationsContext } from "common/contexts";

type PushNotification = (heading: string, message?: string) => void;

type UsePushNotificationResult = {
  pushSuccess: PushNotification;
  pushInfo: PushNotification;
  pushWarning: PushNotification;
  pushError: PushNotification;
  pushNotification: (arg: INotification) => void;
};

export function usePushNotification(): UsePushNotificationResult {
  const { addNotification } = useNotificationsContext();

  const createPushNotification = (variant: NotificationVariant) => (heading: string, message?: string) => addNotification({
    variant,
    heading,
    message,
  });

  return {
    pushInfo: createPushNotification(NotificationVariant.Info),
    pushWarning: createPushNotification(NotificationVariant.Warning),
    pushError: createPushNotification(NotificationVariant.Error),
    pushSuccess: createPushNotification(NotificationVariant.Success),
    pushNotification: addNotification,
  };
}