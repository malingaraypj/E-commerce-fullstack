import { createContext } from "react";

export type Notification = {
  id: string | number;
  message: string;
  type: "info" | "error" | "success";
};

export type NotificationContextType = {
  notify: (message: string, type: Notification["type"]) => void;
  clear: (id: string | number) => void;
  notifications: Notification[];
};

export const NotificationContext = createContext<NotificationContextType>({
  notify: () => {},
  clear: () => {},
  notifications: [],
});
