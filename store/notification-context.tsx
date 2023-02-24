"use client";

import Notification from "@/components/ui/notification";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

type NotificationData = {
  title?: string;
  message?: string;
  status?: string;
};

type INotificationContext = {
  notification: NotificationData | undefined;
  showNotification: (notificationData: NotificationData) => void;
  hideNotification: () => void;
};

const NotificationContext = createContext<INotificationContext>({
  notification: {},
  showNotification: function (notificationData: NotificationData) {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props: PropsWithChildren) {
  const [activeNotification, setActiveNotification] =
    useState<NotificationData>();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData: NotificationData) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification({});
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
      {activeNotification && activeNotification.title && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
