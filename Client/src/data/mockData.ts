import { User, Course, Enrollment, Notification, Activity } from '../types';

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Admin Gym Master',
    email: 'admin@gymmaster.com',
    role: 'admin',
    phone: '0123456789',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    joinDate: '2024-01-01'
  },
  {
    id: 2,
    name: 'PT Nguyễn Minh Anh',
    email: 'pt1@gymmaster.com',
    role: 'trainer',
    phone: '0123456788',
    status: 'active',
    specialty: 'Yoga & Fitness',
    experience: '5 năm',
    avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    joinDate: '2024-01-15'
  },
  {
    id: 3,
    name: 'PT Lê Hùng Anh',
    email: 'pt2@gymmaster.com',
    role: 'trainer',
    phone: '0123456787',
    status: 'pending',
    specialty: 'Bodybuilding & Strength',
    experience: '3 năm',
    avatar: 'https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    joinDate: '2024-02-01'
  },
  {
    id: 4,
    name: 'Trần Văn Nam',
    email: 'member1@gmail.com',
    role: 'member',
    phone: '0123456786',
    status: 'active',
    membershipType: 'Premium',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    joinDate: '2024-01-20'
  },
  {
    id: 5,
    name: 'Nguyễn Thị Lan',
    email: 'member2@gmail.com',
    role: 'member',
    phone: '0123456785',
    status: 'active',
    membershipType: 'Basic',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    joinDate: '2024-02-10'
  }
];

export const mockCourses: Course[] = [
  {
    id: 1,
    name: 'Yoga Cơ Bản cho Người Mới',
    instructor: 'PT Nguyễn Minh Anh',
    instructorId: 2,
    price: 500000,
    duration: '60 phút',
    capacity: 20,
    enrolled: 15,
    schedule: 'Thứ 2, 4, 6 - 6:00 AM',
    description: 'Khóa học yoga dành cho người mới bắt đầu, tập trung vào các tư thế cơ bản và hơi thở',
    status: 'active',
    category: 'Yoga',
    level: 'beginner',
    imageUrl: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
  },
  {
    id: 2,
    name: 'Gym Nâng Cao - Strength Training',
    instructor: 'PT Lê Hùng Anh',
    instructorId: 3,
    price: 800000,
    duration: '90 phút',
    capacity: 15,
    enrolled: 12,
    schedule: 'Thứ 3, 5, 7 - 7:00 PM',
    description: 'Khóa học gym nâng cao tập trung vào xây dựng cơ bắp và sức mạnh',
    status: 'active',
    category: 'Strength',
    level: 'advanced',
    imageUrl: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
  },
  {
    id: 3,
    name: 'Cardio Buổi Sáng',
    instructor: 'PT Nguyễn Minh Anh',
    instructorId: 2,
    price: 400000,
    duration: '45 phút',
    capacity: 25,
    enrolled: 20,
    schedule: 'Hàng ngày - 6:30 AM',
    description: 'Lớp cardio giúp giảm cân hiệu quả và tăng cường sức khỏe tim mạch',
    status: 'active',
    category: 'Cardio',
    level: 'intermediate',
    imageUrl: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
  }
];

export const mockEnrollments: Enrollment[] = [
  {
    id: 1,
    userId: 4,
    courseId: 1,
    status: 'active',
    enrollDate: '2024-01-15',
    paymentStatus: 'paid',
    progress: 65
  },
  {
    id: 2,
    userId: 4,
    courseId: 3,
    status: 'active',
    enrollDate: '2024-01-20',
    paymentStatus: 'paid',
    progress: 80
  },
  {
    id: 3,
    userId: 5,
    courseId: 2,
    status: 'pending',
    enrollDate: '2024-01-25',
    paymentStatus: 'pending',
    progress: 0
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: 'Lớp học mới được tạo',
    message: 'PT Lê Hùng Anh đã tạo lớp "Gym Nâng Cao"',
    type: 'info',
    timestamp: '2024-01-25T10:30:00Z',
    read: false
  },
  {
    id: 2,
    title: 'Thanh toán thành công',
    message: 'Học viên Trần Văn Nam đã thanh toán khóa Yoga',
    type: 'success',
    timestamp: '2024-01-25T09:15:00Z',
    read: false
  },
  {
    id: 3,
    title: 'Lớp sắp đầy',
    message: 'Lớp Cardio Buổi Sáng còn 5 chỗ trống',
    type: 'warning',
    timestamp: '2024-01-24T14:20:00Z',
    read: true
  }
];

export const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'course_created',
    message: 'PT Lê Hùng Anh đã tạo lớp mới "Gym Nâng Cao"',
    timestamp: '2024-01-25T10:30:00Z',
    userId: 3,
    status: 'info'
  },
  {
    id: 2,
    type: 'enrollment',
    message: 'Học viên mới đăng ký khóa Yoga Cơ Bản',
    timestamp: '2024-01-25T09:45:00Z',
    userId: 5,
    status: 'success'
  },
  {
    id: 3,
    type: 'payment',
    message: 'Thanh toán từ Trần Văn Nam - 500,000đ',
    timestamp: '2024-01-25T08:20:00Z',
    userId: 4,
    status: 'success'
  },
  {
    id: 4,
    type: 'user_approved',
    message: 'PT Nguyễn Minh Anh được phê duyệt tài khoản',
    timestamp: '2024-01-24T16:10:00Z',
    userId: 2,
    status: 'success'
  }
];