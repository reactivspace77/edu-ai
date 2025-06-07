import React, { useEffect, useState } from 'react';
import { Bell, Check } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { Notification } from '../../types';
import supabase from '../../config/supabase';

const NotificationsList: React.FC = () => {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('userId', user.id)
          .order('createdAt', { ascending: false })
          .limit(5);
        
        if (error) {
          throw error;
        }
        
        setNotifications(data as Notification[]);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user]);

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);
      
      if (error) {
        throw error;
      }
      
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true } 
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notificări</h3>
        
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`flex items-center p-3 rounded-md ${
                  notification.read ? 'bg-gray-50' : 'bg-indigo-50'
                }`}
              >
                <div className={`flex-shrink-0 p-1 rounded-full ${
                  notification.read ? 'bg-gray-200' : 'bg-indigo-200'
                }`}>
                  <Bell className={`h-4 w-4 ${
                    notification.read ? 'text-gray-500' : 'text-indigo-600'
                  }`} />
                </div>
                <div className="ml-3 flex-1">
                  <p className={`text-sm ${
                    notification.read ? 'text-gray-600' : 'text-gray-800 font-medium'
                  }`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.createdAt).toLocaleDateString('ro-RO')}
                  </p>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                    title="Marchează ca citit"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
            Nu ai nicio notificare.
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsList;