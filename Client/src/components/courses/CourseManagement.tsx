import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Users, Clock, DollarSign, Star, BookOpen } from 'lucide-react';
import { Course, User } from '../../types';

interface CourseManagementProps {
  courses: Course[];
  users: User[];
  currentUser: User;
  onCourseUpdate: (updatedCourse: Course) => void;
  onCourseDelete: (courseId: number) => void;
  onCourseAdd: (newCourse: Omit<Course, 'id'>) => void;
  onEnrollCourse?: (courseId: number) => void;
}

const CourseManagement: React.FC<CourseManagementProps> = ({
  courses,
  users,
  currentUser,
  onCourseUpdate,
  onCourseDelete,
  onCourseAdd,
  onEnrollCourse
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [viewingCourse, setViewingCourse] = useState<Course | null>(null);

  const canManageCourses = currentUser?.role === 'admin';
  const displayCourses = currentUser?.role === 'trainer' 
    ? courses.filter(c => c.instructorId === currentUser.id)
    : courses;

  const getPageTitle = () => {
    if (currentUser?.role === 'member') return 'Khóa học';
    if (currentUser?.role === 'trainer') return 'Lớp của tôi';
    return 'Quản lý khóa học';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return 'Cơ bản';
      case 'intermediate': return 'Trung bình';
      case 'advanced': return 'Nâng cao';
      default: return level;
    }
  };

  const getStatusColor = (status: string, enrolled: number, capacity: number) => {
    if (status === 'inactive') return 'bg-gray-100 text-gray-800';
    if (enrolled >= capacity) return 'bg-red-100 text-red-800';
    if (enrolled / capacity > 0.8) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const AddCourseModal = () => {
    const [newCourse, setNewCourse] = useState({
      name: '',
      description: '',
      price: '',
      duration: '',
      capacity: '',
      schedule: '',
      category: '',
      level: 'beginner' as Course['level'],
      instructorId: currentUser?.role === 'trainer' ? currentUser.id : 0,
      instructor: currentUser?.role === 'trainer' ? currentUser.name : '',
      status: 'active' as Course['status']
    });

    const trainers = users.filter(u => u.role === 'trainer');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const selectedTrainer = trainers.find(t => t.id === newCourse.instructorId);
      
      onCourseAdd({
        ...newCourse,
        price: parseInt(newCourse.price),
        capacity: parseInt(newCourse.capacity),
        instructor: selectedTrainer?.name || newCourse.instructor,
        enrolled: 0
      });
      
      setShowAddModal(false);
      setNewCourse({
        name: '',
        description: '',
        price: '',
        duration: '',
        capacity: '',
        schedule: '',
        category: '',
        level: 'beginner',
        instructorId: currentUser?.role === 'trainer' ? currentUser.id : 0,
        instructor: currentUser?.role === 'trainer' ? currentUser.name : '',
        status: 'active'
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Thêm khóa học mới</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên khóa học</label>
                <input
                  type="text"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VNĐ)</label>
                  <input
                    type="number"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({...newCourse, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sức chứa</label>
                  <input
                    type="number"
                    value={newCourse.capacity}
                    onChange={(e) => setNewCourse({...newCourse, capacity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian</label>
                  <input
                    type="text"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                    placeholder="VD: 60 phút"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                  <input
                    type="text"
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                    placeholder="VD: Yoga, Cardio..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lịch học</label>
                <input
                  type="text"
                  value={newCourse.schedule}
                  onChange={(e) => setNewCourse({...newCourse, schedule: e.target.value})}
                  placeholder="VD: Thứ 2, 4, 6 - 6:00 AM"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Độ khó</label>
                <select
                  value={newCourse.level}
                  onChange={(e) => setNewCourse({...newCourse, level: e.target.value as Course['level']})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="beginner">Cơ bản</option>
                  <option value="intermediate">Trung bình</option>
                  <option value="advanced">Nâng cao</option>
                </select>
              </div>
              
              {currentUser?.role === 'admin' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Huấn luyện viên</label>
                  <select
                    value={newCourse.instructorId}
                    onChange={(e) => setNewCourse({...newCourse, instructorId: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Chọn huấn luyện viên</option>
                    {trainers.map(trainer => (
                      <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg"
                >
                  Thêm khóa học
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const CourseDetailsModal = ({ course }: { course: Course }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {course.imageUrl && (
            <img 
              src={course.imageUrl} 
              alt={course.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />
          )}
          <button
            onClick={() => setViewingCourse(null)}
            className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all"
          >
            ✕
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{course.name}</h3>
              <p className="text-gray-600">{course.description}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level || 'beginner')}`}>
              {getLevelText(course.level || 'beginner')}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Giá</p>
              <p className="font-semibold text-blue-600">{(course.price / 1000).toFixed(0)}K</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Clock className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Thời gian</p>
              <p className="font-semibold text-green-600">{course.duration}</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Học viên</p>
              <p className="font-semibold text-purple-600">{course.enrolled}/{course.capacity}</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Đánh giá</p>
              <p className="font-semibold text-yellow-600">4.8⭐</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Thông tin chi tiết</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Giảng viên:</span>
                  <span className="ml-2 font-medium">{course.instructor}</span>
                </div>
                <div>
                  <span className="text-gray-600">Lịch học:</span>
                  <span className="ml-2 font-medium">{course.schedule}</span>
                </div>
                <div>
                  <span className="text-gray-600">Danh mục:</span>
                  <span className="ml-2 font-medium">{course.category || 'Chưa phân loại'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Trạng thái:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status, course.enrolled, course.capacity)}`}>
                    {course.status === 'active' ? 'Đang hoạt động' : 'Tạm dừng'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Tình trạng: {course.enrolled >= course.capacity ? 'Đã đầy' : `Còn ${course.capacity - course.enrolled} chỗ`}
                </div>
                {currentUser?.role === 'member' && course.enrolled < course.capacity && (
                  <button 
                    onClick={() => {
                      onEnrollCourse && onEnrollCourse(course.id);
                      setViewingCourse(null);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg"
                  >
                    Đăng ký ngay
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h1>
          <p className="text-gray-600 mt-1">
            {currentUser?.role === 'member' 
              ? 'Khám phá và đăng ký các khóa học phù hợp'
              : 'Quản lý và theo dõi các khóa học'}
          </p>
        </div>
        
        {(canManageCourses || currentUser?.role === 'trainer') && (
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg flex items-center transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm khóa học
          </button>
        )}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCourses.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200 hover:scale-105">
            {/* Course Image */}
            <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
              {course.imageUrl ? (
                <img 
                  src={course.imageUrl} 
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white opacity-80" />
                </div>
              )}
              
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level || 'beginner')}`}>
                  {getLevelText(course.level || 'beginner')}
                </span>
              </div>
              
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status, course.enrolled, course.capacity)}`}>
                  {course.enrolled >= course.capacity ? 'Đầy' : 'Còn chỗ'}
                </span>
              </div>
            </div>
            
            {/* Course Content */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{course.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{course.description}</p>
                <p className="text-xs text-gray-500">Giảng viên: {course.instructor}</p>
              </div>
              
              {/* Course Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span className="font-semibold text-green-600">{(course.price/1000).toFixed(0)}K</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{course.enrolled}/{course.capacity}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  <span>4.8</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Đã đăng ký</span>
                  <span>{course.enrolled}/{course.capacity}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((course.enrolled / course.capacity) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Schedule */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Lịch học:</p>
                <p className="text-sm font-medium text-gray-800">{course.schedule}</p>
              </div>
              
              {/* Actions */}
              <div className="flex justify-between items-center">
                {currentUser?.role === 'member' ? (
                  <div className="flex space-x-2 w-full">
                    <button 
                      onClick={() => setViewingCourse(course)}
                      className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Chi tiết
                    </button>
                    <button 
                      onClick={() => onEnrollCourse && onEnrollCourse(course.id)}
                      disabled={course.enrolled >= course.capacity}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {course.enrolled >= course.capacity ? 'Đã đầy' : 'Đăng ký'}
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setViewingCourse(course)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setEditingCourse(course)}
                      className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onCourseDelete(course.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {displayCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">Chưa có khóa học nào</h3>
          <p className="text-gray-600 mb-4">
            {currentUser?.role === 'member' 
              ? 'Hiện tại chưa có khóa học nào được mở. Vui lòng quay lại sau.'
              : 'Bắt đầu bằng cách tạo khóa học đầu tiên của bạn.'}
          </p>
          {(canManageCourses || currentUser?.role === 'trainer') && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg"
            >
              Tạo khóa học đầu tiên
            </button>
          )}
        </div>
      )}

      {/* Modals */}
      {showAddModal && <AddCourseModal />}
      {viewingCourse && <CourseDetailsModal course={viewingCourse} />}
    </div>
  );
};

export default CourseManagement;