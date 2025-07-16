export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'trainer' | 'member';
  phone: string;
  status: 'active' | 'pending' | 'inactive';
  specialty?: string;
  experience?: string;
  membershipType?: string;
  avatar?: string;
  joinDate?: string;
}

export interface Course {
  id: number;
  name: string;
  instructor: string;
  instructorId: number;
  price: number;
  duration: string;
  capacity: number;
  enrolled: number;
  schedule: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  category?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  imageUrl?: string;
}

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  enrollDate: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  progress?: number;
  completionDate?: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  userId?: number;
}

export interface DashboardStats {
  label: string;
  value: string | number;
  color: string;
  icon?: React.ComponentType<any>;
  change?: number;
  changeType?: 'increase' | 'decrease';
}

export interface Activity {
  id: number;
  type: string;
  message: string;
  timestamp: string;
  userId?: number;
  status: 'info' | 'success' | 'warning' | 'error';
}