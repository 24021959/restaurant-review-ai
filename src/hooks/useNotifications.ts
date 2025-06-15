
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useNotifications = () => {
  // Notifiche vuote: nessun dato finto mai!
  const [notifications] = useState<any[]>([]);
  const [unreadCount] = useState(0);

  // Funzioni stub aggiornate per accettare un ID come parametro.
  const markAsRead = (id?: string) => {};
  const markAllAsRead = () => {};
  const deleteNotification = (id?: string) => {};
  const loadNotifications = () => {};

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    loadNotifications
  };
};
