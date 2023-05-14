import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import "animate.css";

import { useNotificationsContext } from "common/contexts";

import styles from "./Notification.module.scss";
import successIcon from "./assets/success.svg";
import warningIcon from "./assets/warning.svg";
import errorIcon from "./assets/error.svg";
import infoIcon from "./assets/info.svg";
import redCross from 'assets/images/redCross.svg';

export enum NotificationVariant {
  Success = "success",
  Warning = "warning",
  Error = "error",
  Info = "info",
}

const notificationVariantToIcon: Record<NotificationVariant, string> = {
  [NotificationVariant.Success]: successIcon,
  [NotificationVariant.Warning]: warningIcon,
  [NotificationVariant.Error]: errorIcon,
  [NotificationVariant.Info]: infoIcon,
};

export interface INotification {
  variant: NotificationVariant;
  heading: string;
  message?: string;
}

const idleDuration = 3200;
const animationDuration = 600;

export const Notification = () => {
  const { notification, cancelNotification } = useNotificationsContext();
  const [isStartAnimation, setIsStartAnimation] = useState(true);

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const resetNotification = () => {
    setIsStartAnimation(false);

    setTimeout(() => {
      cancelNotification();
    }, animationDuration);
  };

  useEffect(() => {
    setIsStartAnimation(true);

    timerRef.current = setTimeout(() => {
      setTimeout(() => {
        resetNotification();
      }, animationDuration);
    }, idleDuration);

    return () => clearTimeout(timerRef.current);
  }, [notification]);

  if (!notification) return null;

  const { heading, variant, message } = notification;

  return (
    <article
      className={classNames(styles.notification, styles[variant], "animate__animated", {
        animate__backInRight: isStartAnimation,
        animate__backOutRight: !isStartAnimation,
      })}
    >
      <img src={notificationVariantToIcon[variant]} alt="Иконка" />
      <div className={styles.informationWrapper}>
        <h2>{heading}</h2>
        {message && <p className={styles.description}>{message}</p>}
      </div>

      <img src={redCross} className={styles.closeBtn} onClick={resetNotification} alt='cross' />
    </article>
  );
};
