
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Notification {
  id: string;
  type: 'review' | 'api_limit' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadNotifications();
      // Simula notifiche in tempo reale
      const interval = setInterval(checkForNewNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const loadNotifications = () => {
    // Simula notifiche di esempio
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'review',
        title: 'Nuova recensione',
        message: 'Hai ricevuto una nuova recensione a 5 stelle!',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false,
        actionUrl: '/dashboard?tab=reviews'
      },
      {
        id: '2',
        type: 'api_limit',
        title: 'Limite API raggiunto',
        message: 'Una delle tue chiavi API ha raggiunto il 80% del limite giornaliero',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: false,
        actionUrl: '/dashboard?tab=settings'
      },
      {
        id: '3',
        type: 'success',
        title: 'Risposta pubblicata',
        message: 'La tua risposta è stata pubblicata con successo su Google',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        read: true
      }
    ];
    setNotifications(mockNotifications);
  };

  const checkForNewNotifications = () => {
    // Simula controllo per nuove notifiche
    const shouldAddNotification = Math.random() > 0.8;
    
    if (shouldAddNotification) {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: 'review',
        title: 'Nuova recensione',
        message: 'Hai ricevuto una nuova recensione da gestire',
        timestamp: new Date(),
        read: false,
        actionUrl: '/dashboard?tab=reviews'
      };
      
      setNotifications(prev => [newNotification, ...prev]);
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    loadNotifications
  };
};
