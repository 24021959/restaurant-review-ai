
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useNotifications = () => {
  // Notifiche vuote: nessun dato finto mai!
  const [notifications] = useState<any[]>([]);
  const [unreadCount] = useState(0);

  // Funzioni stub senza effetto. Potranno essere collegate a dati veri in futuro.
  const markAsRead = () => {};
  const markAllAsRead = () => {};
  const deleteNotification = () => {};
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
