import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Notification {
  id: string;
  type: 'contact' | 'system' | 'success';
  title: string;
  message: string;
  time: Date;
  read: boolean;
  data?: {
    contactId?: number;
    email?: string;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Mock initial notifications for demo
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'contact',
    title: 'New Contact Message',
    message: 'John Doe sent you a message about a project.',
    time: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
    data: { contactId: 1, email: 'john@example.com' }
  },
  {
    id: '2',
    type: 'contact',
    title: 'New Contact Message',
    message: 'Sarah wants to discuss collaboration.',
    time: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    data: { contactId: 2, email: 'sarah@example.com' }
  },
];

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Setup Laravel Echo / Pusher for real-time notifications
  useEffect(() => {
    // Uncomment and configure when connecting to Laravel
    /*
    import Echo from 'laravel-echo';
    import Pusher from 'pusher-js';
    
    window.Pusher = Pusher;
    
    const echo = new Echo({
      broadcaster: 'pusher',
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      forceTLS: true,
      authEndpoint: `${API_URL}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    });

    // Listen for new contact messages
    echo.private('App.Models.User.1')
      .notification((notification: any) => {
        addNotification({
          type: notification.type || 'contact',
          title: notification.title,
          message: notification.message,
          data: notification.data,
        });
      });

    return () => {
      echo.disconnect();
    };
    */
  }, []);

  const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      time: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
