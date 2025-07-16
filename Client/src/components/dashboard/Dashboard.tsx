import React from 'react';
import { 
  Users, BookOpen, TrendingUp, DollarSign, 
  Activity, Calendar, Star, Award, 
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { User, Course, Enrollment, Activity as ActivityType } from '../../types';

interface DashboardProps {
  currentUser: User;
  users: User[];
  courses: Course[];
  enrollments: Enrollment[];
  activities: ActivityType[];
}

const Dashboard: React.FC<DashboardProps> = ({ 
  currentUser, 
  users, 
  courses, 
  enrollments, 
  activities 
}) => {
  const getStats = () => {
    if (currentUser?.role === 'admin') {
      const totalRevenue = enrollments
        .filter(e => e.paymentStatus === 'paid')
        .reduce((sum, e) => {
          const course = courses.find(c => c.id === e.courseId);
          return sum + (course?.price || 0);
        }, 0);

      return [
        { 
          label: 'Tổng học viên', 
          value: users.filter(u => u.role === 'member').length,
          change: 12,
          changeType: 'increase' as const,
          color: 'blue',
          icon: Users
        },
        { 
          label: 'Huấn luyện viên', 
          value: users.filter(u => u.role === 'trainer').length,
          change: 2,
          changeType: 'increase' as const,
          color: 'green',
          icon: Activity
        },
        { 
          label: 'Khóa học hoạt động', 
          value: courses.filter(c => c.status === 'active').length,
          change: 1,
          changeType: 'increase' as const,
          color: 'purple',
          icon: BookOpen
        },
        { 
          label: 'Doanh thu tháng', 
          value: `${(totalRevenue / 1000000).toFixed(1)}M`,
          change: 8.5,
          changeType: 'increase' as const,
          color: 'yellow',
          icon: DollarSign
        }
      ];
    } else if (currentUser?.role === 'trainer') {
      const myCourses = courses.filter(c => c.instructorId === currentUser.id);
      const totalStudents = myCourses.reduce((sum, course) => sum + course.enrolled, 0);
      const myRevenue = enrollments
        .filter(e => {
          const course = courses.find(c => c.id === e.courseId);
          return course?.instructorId === currentUser.id && e.paymentStatus === 'paid';
        })
        .reduce((sum, e) => {
          const course = courses.find(c => c.id === e.courseId);
          return sum + (course?.price || 0) * 0.6; // 60% commission
        }, 0);

      return [
        { 
          label: 'Lớp đang dạy', 
          value: myCourses.length,
          change: 0,
          changeType: 'increase' as const,
          color: 'blue',
          icon: BookOpen
        },
        { 
          label: 'Tổng học viên', 
          value: totalStudents,
          change: 15,
          changeType: 'increase' as const,
          color: 'green',
          icon: Users
        },
        { 
          label: 'Đánh giá trung bình', 
          value: '4.8',
          change: 0.2,
          changeType: 'increase' as const,
          color: 'yellow',
          icon: Star
        },
        { 
          label: 'Thu nhập tháng', 
          value: `${(myRevenue / 1000000).toFixed(1)}M`,
          change: 12,
          changeType: 'increase' as const,
          color: 'purple',
          icon: DollarSign
        }
      ];
    } else {
      const myEnrollments = enrollments.filter(e => e.userId === currentUser.id);
      const completedCourses = myEnrollments.filter(e => e.status === 'completed').length;
      const totalSpent = myEnrollments
        .filter(e => e.paymentStatus === 'paid')
        .reduce((sum, e) => {
          const course = courses.find(c => c.id === e.courseId);
          return sum + (course?.price || 0);
        }, 0);

      return [
        { 
          label: 'Lớp đã đăng ký', 
          value: myEnrollments.length,
          change: 1,
          changeType: 'increase' as const,
          color: 'blue',
          icon: BookOpen
        },
        { 
          label: 'Lớp hoàn thành', 
          value: completedCourses,
          change: 0,
          changeType: 'increase' as const,
          color: 'green',
          icon: Award
        },
        { 
          label: 'Tổng chi phí', 
          value: `${(totalSpent / 1000).toFixed(0)}K`,
          change: 5,
          changeType: 'increase' as const,
          color: 'purple',
          icon: DollarSign
        },
        { 
          label: 'Điểm tích lũy', 
          value: '850',
          change: 50,
          changeType: 'increase' as const,
          color: 'yellow',
          icon: Star
        }
      ];
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      yellow: 'from-yellow-500 to-orange-500',
      red: 'from-red-500 to-red-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const stats = getStats();

  return (
    <div className="space-y-0">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Chào mừng đến với <span className="text-yellow-300">GymMaster</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {currentUser?.role === 'admin' ? 'Bảng điều khiển quản trị hệ thống' :
               currentUser?.role === 'trainer' ? `Xin chào ${currentUser.name}, sẵn sàng cho buổi tập hôm nay!` :
               `Xin chào ${currentUser.name}, hãy bắt đầu hành trình fitness của bạn!`}
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">{new Date().toLocaleDateString('vi-VN')}</div>
                <div className="text-sm">Hôm nay</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">7:00 - 22:00</div>
                <div className="text-sm">Giờ hoạt động</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-24 translate-y-24"></div>
      </div>

      {/* Gym Introduction Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Về GymMaster Fitness Center</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trung tâm thể dục thể thao hàng đầu với trang thiết bị hiện đại, 
              đội ngũ huấn luyện viên chuyên nghiệp và không gian tập luyện sang trọng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Trang Thiết Bị Hiện Đại</h3>
              <p className="text-gray-600">
                Hệ thống máy tập gym cao cấp từ các thương hiệu hàng đầu thế giới
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">HLV Chuyên Nghiệp</h3>
              <p className="text-gray-600">
                Đội ngũ huấn luyện viên giàu kinh nghiệm, tận tâm hướng dẫn từng học viên
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Dịch Vụ 5 Sao</h3>
              <p className="text-gray-600">
                Không gian sang trọng, sạch sẽ với dịch vụ chăm sóc khách hàng tận tình
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">2000+</div>
                <div className="text-blue-100">Thành viên</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Huấn luyện viên</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">100+</div>
                <div className="text-blue-100">Khóa học</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">5</div>
                <div className="text-blue-100">Năm kinh nghiệm</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Content */}
      <div className="p-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Thống kê tổng quan</h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getColorClasses(stat.color)} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  {stat.change !== 0 && (
                    <div className={`flex items-center text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.changeType === 'increase' ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                      )}
                      {stat.change}%
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.label}</h3>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Hoạt động gần đây</h3>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {activities.slice(0, 5).map(activity => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.timestamp).toLocaleString('vi-VN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Courses or My Performance */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {currentUser?.role === 'member' ? 'Khóa học gợi ý' : 'Khóa học phổ biến'}
              </h3>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {courses.slice(0, 4).map(course => (
                <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{course.name}</p>
                      <p className="text-xs text-gray-600">{course.enrolled}/{course.capacity} học viên</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">
                      {(course.price / 1000).toFixed(0)}K
                    </p>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;