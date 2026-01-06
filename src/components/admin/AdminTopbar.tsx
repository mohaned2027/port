import React, { useState, useRef, useEffect } from 'react';
import { useNotifications, Notification } from '@/contexts/NotificationContext';
import { Bell, Check, CheckCheck, Trash2, MessageSquare, AlertCircle, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const AdminTopbar: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'contact':
        return <MessageSquare className="w-5 h-5 text-blue-400" />;
      case 'success':
        return <Check className="w-5 h-5 text-green-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-orange-yellow-crayola" />;
    }
  };

  return (
    <header className="h-16 bg-eerie-black-2 border-b border-jet flex items-center justify-between px-6">
      {/* Page Title */}
      <div>
        <h2 className="text-lg font-semibold text-white-2">Dashboard</h2>
        <p className="text-sm text-light-gray-70">Welcome back!</p>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="relative p-2 rounded-xl bg-smoky-black-1 border border-jet hover:border-orange-yellow-crayola/50 transition-all"
          >
            <Bell className="w-5 h-5 text-light-gray-70" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-yellow-crayola to-vegas-gold text-smoky-black text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-96 bg-eerie-black-2 border border-jet rounded-2xl shadow-shadow-2 overflow-hidden z-50">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-jet">
                <h3 className="font-semibold text-white-2">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-orange-yellow-crayola hover:text-vegas-gold transition-colors flex items-center gap-1"
                    >
                      <CheckCheck className="w-4 h-4" />
                      Mark all read
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAll}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>

              {/* Notification List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-light-gray-70/30 mx-auto mb-3" />
                    <p className="text-light-gray-70">No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-jet/50 hover:bg-jet/30 transition-all cursor-pointer ${
                        !notification.read ? 'bg-orange-yellow-crayola/5' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-smoky-black-1 flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-sm font-medium ${notification.read ? 'text-light-gray-70' : 'text-white-2'}`}>
                              {notification.title}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              className="text-light-gray-70 hover:text-red-400 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-light-gray-70 truncate">{notification.message}</p>
                          <p className="text-xs text-light-gray-70/70 mt-1">
                            {formatDistanceToNow(notification.time, { addSuffix: true })}
                          </p>
                        </div>

                        {/* Unread Indicator */}
                        {!notification.read && (
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-orange-yellow-crayola mt-2" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t border-jet text-center">
                  <a
                    href="/admin/messages"
                    className="text-sm text-orange-yellow-crayola hover:text-vegas-gold transition-colors"
                  >
                    View all messages
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
