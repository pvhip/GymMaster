import React, { useEffect, useState } from 'react';
import Homepage from './components/homepage/Homepage';
import LoginForm from './components/auth/LoginForm';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import UserManagement from './components/users/UserManagement';
import CourseManagement from './components/courses/CourseManagement';

import { 
  mockUsers, 
  mockCourses, 
  mockEnrollments, 
  mockNotifications, 
  mockActivities 
} from './data/mockData';
import { User, Course, Enrollment, Notification, Activity } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showHomepage, setShowHomepage] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  
  // State management
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(mockEnrollments);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);

  useEffect(() => {
  fetch(`${API_URL}/api/courses`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error("Lỗi fetch backend:", err));
}, []);
  // User management functions
  const handleUserUpdate = (updatedUser: User) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const handleUserDelete = (userId: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleUserAdd = (newUser: Omit<User, 'id'>) => {
    const id = Math.max(...users.map(u => u.id)) + 1;
    setUsers([...users, { ...newUser, id }]);
  };

  // Course management functions
  const handleCourseUpdate = (updatedCourse: Course) => {
    setCourses(courses.map(course => 
      course.id === updatedCourse.id ? updatedCourse : course
    ));
  };

  const handleCourseDelete = (courseId: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  const handleCourseAdd = (newCourse: Omit<Course, 'id' | 'enrolled'>) => {
    const id = Math.max(...courses.map(c => c.id)) + 1;
    setCourses([...courses, { ...newCourse, id, enrolled: 0 }]);
  };

  const handleEnrollCourse = (courseId: number) => {
    if (!currentUser) return;
    
    const course = courses.find(c => c.id === courseId);
    if (!course || course.enrolled >= course.capacity) {
      alert('Khóa học đã đầy!');
      return;
    }

    const existingEnrollment = enrollments.find(
      e => e.userId === currentUser.id && e.courseId === courseId
    );
    
    if (existingEnrollment) {
      alert('Bạn đã đăng ký khóa học này rồi!');
      return;
    }

    // Create new enrollment
    const newEnrollment: Enrollment = {
      id: Math.max(...enrollments.map(e => e.id)) + 1,
      userId: currentUser.id,
      courseId: courseId,
      status: 'pending',
      enrollDate: new Date().toISOString().split('T')[0],
      paymentStatus: 'pending',
      progress: 0
    };

    setEnrollments([...enrollments, newEnrollment]);
    
    // Update course enrollment count
    setCourses(courses.map(c => 
      c.id === courseId ? { ...c, enrolled: c.enrolled + 1 } : c
    ));

    alert('Đăng ký thành công! Vui lòng kiểm tra mục "Lớp đã đăng ký" để thanh toán.');
  };

  // Navigation functions
  const handleLoginClick = () => {
    setShowHomepage(false);
    setShowLogin(true);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setShowLogin(false);
    setShowHomepage(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowLogin(false);
    setShowHomepage(true);
    setActiveTab('dashboard');
  };

  const handleNotificationClick = () => {
    setActiveTab('notifications');
  };

  // Render homepage first
  if (showHomepage) {
    return <Homepage onLoginClick={handleLoginClick} />;
  }

  // Render login if not authenticated
  if (showLogin || !currentUser) {
    return <LoginForm users={users} onLogin={handleLogin} />;
  }

  // Member enrollments component
  const MemberEnrollments = () => {
    const myEnrollments = enrollments.filter(e => e.userId === currentUser?.id);

    console.log("API URL:", API_URL);
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Lớp đã đăng ký</h1>
            <p className="text-gray-600 mt-1">Theo dõi tiến trình học tập của bạn</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {myEnrollments.map(enrollment => {
            const course = courses.find(c => c.id === enrollment.courseId);
            if (!course) return null;
            
            return (
              <div key={enrollment.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-start">
                      {course.imageUrl && (
                        <img 
                          src={course.imageUrl} 
                          alt={course.name}
                          className="w-16 h-16 rounded-lg object-cover mr-4"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
                        <p className="text-gray-600 mb-2">Giảng viên: {course.instructor}</p>
                        <p className="text-sm text-gray-500 mb-1">Lịch học: {course.schedule}</p>
                        <p className="text-sm text-gray-500">Ngày đăng ký: {new Date(enrollment.enrollDate).toLocaleDateString('vi-VN')}</p>
                        
                        {enrollment.progress !== undefined && enrollment.progress > 0 && (
                          <div className="mt-3">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Tiến độ học tập</span>
                              <span>{enrollment.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${enrollment.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      enrollment.status === 'active' ? 'bg-green-100 text-green-800' :
                      enrollment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      enrollment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {enrollment.status === 'active' ? 'Đang học' :
                       enrollment.status === 'pending' ? 'Chờ duyệt' :
                       enrollment.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                    </span>
                    
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      enrollment.paymentStatus === 'paid' ? 'bg-blue-100 text-blue-800' :
                      enrollment.paymentStatus === 'pending' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {enrollment.paymentStatus === 'paid' ? 'Đã thanh toán' : 
                       enrollment.paymentStatus === 'pending' ? 'Chưa thanh toán' : 'Thanh toán thất bại'}
                    </span>
                    
                    <div className="text-right text-sm text-gray-600">
                      <p className="font-semibold text-lg text-green-600">
                        {(course.price / 1000).toFixed(0)}K VNĐ
                      </p>
                    </div>
                  </div>
                </div>
                
                {enrollment.paymentStatus === 'pending' && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <p className="text-sm text-orange-600 mb-2 sm:mb-0">
                        Vui lòng hoàn tất thanh toán để bắt đầu học
                      </p>
                      <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                        Thanh toán VNPay
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          {myEnrollments.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Chưa có lớp học nào</h3>
              <p className="text-gray-600 mb-4">Hãy khám phá và đăng ký các khóa học thú vị!</p>
              <button 
                onClick={() => setActiveTab('courses')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg"
              >
                Khám phá khóa học
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Profile component
  const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      specialty: currentUser?.specialty || '',
      experience: currentUser?.experience || '',
      membershipType: currentUser?.membershipType || ''
    });

    const handleSave = () => {
      if (currentUser) {
        const updatedUser = { ...currentUser, ...profileData };
        handleUserUpdate(updatedUser);
        setCurrentUser(updatedUser);
        setIsEditing(false);
      }
    };

    return (
      <div className="p-6">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Hồ sơ cá nhân</h1>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            {/* Avatar Section */}
            <div className="flex items-center mb-6">
              {currentUser?.avatar ? (
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name}
                  className="w-20 h-20 rounded-full object-cover mr-4"
                />
              ) : (
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-2xl">
                    {currentUser?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{currentUser?.name}</h2>
                <p className="text-gray-600 capitalize">{currentUser?.role}</p>
                <p className="text-sm text-gray-500">Tham gia từ {currentUser?.joinDate && new Date(currentUser.joinDate).toLocaleDateString('vi-VN')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
                  <input 
                    type="text" 
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                <input 
                  type="tel" 
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50" 
                />
              </div>

              {currentUser?.role === 'trainer' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên môn</label>
                    <input 
                      type="text" 
                      value={profileData.specialty}
                      onChange={(e) => setProfileData({...profileData, specialty: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kinh nghiệm</label>
                    <input 
                      type="text" 
                      value={profileData.experience}
                      onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50" 
                    />
                  </div>
                </div>
              )}

              {currentUser?.role === 'member' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại thành viên</label>
                  <select 
                    value={profileData.membershipType}
                    onChange={(e) => setProfileData({...profileData, membershipType: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  >
                    <option value="">Chọn loại thành viên</option>
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 pt-4">
                {isEditing ? (
                  <>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Hủy
                    </button>
                    <button 
                      onClick={handleSave}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg"
                    >
                      Lưu thay đổi
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg"
                  >
                    Chỉnh sửa
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar 
        currentUser={currentUser} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 ml-64">
        <Header 
          currentUser={currentUser}
          activeTab={activeTab}
          notifications={notifications}
          onNotificationClick={handleNotificationClick}
        />

        <main className="flex-1">
          {activeTab === 'dashboard' && (
            <Dashboard 
              currentUser={currentUser}
              users={users}
              courses={courses}
              enrollments={enrollments}
              activities={activities}
            />
          )}
          
          {activeTab === 'users' && currentUser?.role === 'admin' && (
            <UserManagement 
              users={users}
              onUserUpdate={handleUserUpdate}
              onUserDelete={handleUserDelete}
              onUserAdd={handleUserAdd}
            />
          )}
          
          {(activeTab === 'courses' || activeTab === 'my-courses') && (
            <CourseManagement 
              courses={courses}
              users={users}
              currentUser={currentUser}
              onCourseUpdate={handleCourseUpdate}
              onCourseDelete={handleCourseDelete}
              onCourseAdd={handleCourseAdd}
              onEnrollCourse={handleEnrollCourse}
            />
          )}
          
          {activeTab === 'my-enrollments' && currentUser?.role === 'member' && (
            <MemberEnrollments />
          )}
          
          {activeTab === 'profile' && <Profile />}
          
          {activeTab === 'notifications' && (
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Thông báo</h1>
              <div className="space-y-4">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-4 bg-white rounded-lg shadow border border-gray-100 ${
                      !notification.read ? 'border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(notification.timestamp).toLocaleString('vi-VN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;