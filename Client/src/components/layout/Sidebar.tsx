import React from 'react';
import { 
  Home, User, Users, BookOpen, Activity, Calendar, 
  CreditCard, Settings, LogOut, BarChart3, Bell
} from 'lucide-react';
import { User as UserType } from '../../types';

interface SidebarProps {
  currentUser: UserType;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser, activeTab, onTabChange, onLogout }) => {
  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'profile', label: 'Hồ sơ', icon: User }
    ];

    if (currentUser?.role === 'admin') {
      return [
        ...baseItems,
        { id: 'users', label: 'Quản lý người dùng', icon: Users },
        { id: 'courses', label: 'Quản lý khóa học', icon: BookOpen },
        { id: 'trainers', label: 'Quản lý PT', icon: Activity },
        { id: 'reports', label: 'Báo cáo', icon: BarChart3 },
        { id: 'notifications', label: 'Thông báo', icon: Bell }
      ];
    } else if (currentUser?.role === 'trainer') {
      return [
        ...baseItems,
        { id: 'my-courses', label: 'Lớp của tôi', icon: BookOpen },
        { id: 'students', label: 'Học viên', icon: Users },
        { id: 'schedule', label: 'Lịch dạy', icon: Calendar },
        { id: 'notifications', label: 'Thông báo', icon: Bell }
      ];
    } else {
      return [
        ...baseItems,
        { id: 'courses', label: 'Khóa học', icon: BookOpen },
        { id: 'my-enrollments', label: 'Lớp đã đăng ký', icon: Calendar },
        { id: 'payments', label: 'Thanh toán', icon: CreditCard },
        { id: 'notifications', label: 'Thông báo', icon: Bell }
      ];
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin': return 'Quản trị viên';
      case 'trainer': return 'Huấn luyện viên';
      case 'member': return 'Học viên';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'from-red-500 to-pink-500';
      case 'trainer': return 'from-green-500 to-teal-500';
      case 'member': return 'from-blue-500 to-indigo-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="bg-white shadow-xl h-screen w-64 fixed left-0 top-0 z-10 border-r border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
            <User className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            GymMaster
          </h2>
        </div>
        
        <div className="flex items-center">
          {currentUser.avatar && (
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-gray-200"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{currentUser?.name}</p>
            <span className={`text-xs px-2 py-1 rounded-full text-white bg-gradient-to-r ${getRoleColor(currentUser?.role)}`}>
              {getRoleDisplayName(currentUser?.role)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="mt-2 flex-1 overflow-y-auto">
        {getMenuItems().map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center px-6 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-r-4 border-blue-600 text-blue-600' 
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            <item.icon className={`w-5 h-5 mr-3 transition-colors duration-200 ${
              activeTab === item.id ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'
            }`} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      
      {/* Logout Button */}
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;