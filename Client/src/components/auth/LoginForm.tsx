import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { User as UserType } from '../../types';

interface LoginFormProps {
  users: UserType[];
  onLogin: (user: UserType) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ users, onLogin }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const user = users.find(u => u.email === loginData.email);
      if (user && user.status === 'active') {
        onLogin(user);
      } else if (user && user.status !== 'active') {
        setError('Tài khoản chưa được kích hoạt hoặc đã bị khóa');
      } else {
        setError('Email hoặc mật khẩu không đúng');
      }
      setIsLoading(false);
    }, 1000);
  };

  const mockLogins = [
    { email: 'admin@gymmaster.com', role: 'Quản trị viên', color: 'from-red-500 to-pink-500' },
    { email: 'pt1@gymmaster.com', role: 'Huấn luyện viên', color: 'from-green-500 to-teal-500' },
    { email: 'member1@gmail.com', role: 'Học viên', color: 'from-blue-500 to-indigo-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-white opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-white opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            GymMaster
          </h1>
          <p className="text-gray-600 mt-2">Hệ thống quản lý phòng gym chuyên nghiệp</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm animate-shake">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Nhập email của bạn"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Nhập mật khẩu"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Đang đăng nhập...
              </div>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>

        {/* Demo Accounts */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4 font-medium">Tài khoản demo:</p>
          <div className="space-y-2">
            {mockLogins.map((account, index) => (
              <button
                key={index}
                onClick={() => setLoginData({email: account.email, password: '123456'})}
                className="w-full text-left px-4 py-3 bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-lg text-sm transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-sm"
              >
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${account.color} mr-3`}></div>
                  <div>
                    <span className="font-medium text-gray-800">{account.role}</span>
                    <br />
                    <span className="text-gray-600">{account.email}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Mật khẩu cho tất cả tài khoản demo: <strong>123456</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;