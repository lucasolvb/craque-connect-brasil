
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Eye, Trophy, Users, Check } from 'lucide-react';

interface Notification {
  id: string;
  type: 'view' | 'ranking' | 'club' | 'challenge';
  message: string;
  time: string;
  read: boolean;
}

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'club',
      message: 'Clube Santos demonstrou interesse no seu perfil',
      time: '5 min',
      read: false
    },
    {
      id: '2',
      type: 'ranking',
      message: 'Você subiu para 4º lugar no ranking regional',
      time: '1h',
      read: false
    },
    {
      id: '3',
      type: 'challenge',
      message: 'Novo desafio disponível: Mostre Seus Dribles',
      time: '2h',
      read: false
    },
    {
      id: '4',
      type: 'view',
      message: 'Seu perfil foi visualizado 15 vezes hoje',
      time: '3h',
      read: true
    },
    {
      id: '5',
      type: 'club',
      message: 'Palmeiras salvou você nos favoritos',
      time: '1d',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'view': return <Eye className="h-4 w-4 text-blue-600" />;
      case 'ranking': return <Trophy className="h-4 w-4 text-yellow-600" />;
      case 'club': return <Users className="h-4 w-4 text-green-600" />;
      case 'challenge': return <Trophy className="h-4 w-4 text-purple-600" />;
      default: return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-900">Notificações</h3>
          <p className="text-sm text-gray-600">{unreadCount} não lidas</p>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {notifications.slice(0, 5).map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3 w-full">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${!notification.read ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        
        <div className="p-3 border-t">
          <Button variant="ghost" className="w-full text-sm">
            Ver todas as notificações
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
