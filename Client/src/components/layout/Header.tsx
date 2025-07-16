import React, { useState } from 'react';
import { Bell, User, Search, MessageSquare } from 'lucide-react';
import { User as UserType, Notification } from '../../types';

interface HeaderProps {
  currentUser: UserType;
  activeTab: string;
  notifications: Notification[];
  onNotificationClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentUser, 
  activeTab, 
  notifications, 
  onNotificationClick 
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getPageTitle = (tab: string) => {
    const titles: { [key: string]: string } = {
      'dashboard': 'Dashboard',
      'users': 'Quản lý người dùng',
      'courses': 'Quản lý khóa học',
      'my-courses': 'Lớp của tôi',
      'my-enrollments': 'Lớp đã đăng ký',
      'profile': 'Hồ sơ cá nhân',
      'trainers': 'Quản lý huấn luyện viên',
      'reports': 'Báo cáo & Thống kê',
      'students': 'Học viên của tôi',
      'schedule': 'Lịch dạy',
      'payments': 'Thanh toán',
      'notifications': 'Thông báo'
    };
    return titles[tab] || 'GymMaster';
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 px-6 py-4 sticky top-0 z-20">
      <div className="flex justify-between items-center">
        {/* Page Title */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{getPageTitle(activeTab)}</h2>
          <p className="text-sm text-gray-600 mt-1">
            Chào mừng trở lại, {currentUser?.name}
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học, học viên..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Messages */}
          <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-30">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Thông báo</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.slice(0, 5).map(notification => (
                    <div 
                      key={notification.id}
                      className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${
                        !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">{formatTime(notification.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100">
                  <button 
                    onClick={onNotificationClick}
                    className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Xem tất cả thông báo
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            {currentUser.avatar ? (
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-800">{currentUser?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{currentUser?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;