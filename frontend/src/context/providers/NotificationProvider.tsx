import React, { useState } from "react";
import { NotificationContext } from "../NotificationContext";
import type { NotificationContextType } from "../NotificationContext";
import type { Notification } from "../NotificationContext";

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleAddNotification: NotificationContextType["notify"] = (
    message,
    type = "info"
  ) => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
    };

    setNotifications((prev) => [...prev, newNotification]);
  };

  const handleRemoveNotification: NotificationContextType["clear"] = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const contextVal: NotificationContextType = {
    notify: handleAddNotification,
    clear: handleRemoveNotification,
    notifications,
  };

  return (
    <NotificationContext.Provider value={contextVal}>
      {children}
    </NotificationContext.Provider>
  );
};
