import React from 'react';
import { 
  Activity, Users, Star, Award, Calendar, Clock, 
  MapPin, Phone, Mail, ArrowRight, Play, CheckCircle,
  Dumbbell, Heart, Target, Zap
} from 'lucide-react';

interface HomepageProps {
  onLoginClick: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onLoginClick }) => {
  const features = [
    {
      icon: Dumbbell,
      title: 'Trang Thiết Bị Hiện Đại',
      description: 'Hệ thống máy tập gym cao cấp từ các thương hiệu hàng đầu thế giới như Technogym, Life Fitness',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Huấn Luyện Viên Chuyên Nghiệp',
      description: 'Đội ngũ PT giàu kinh nghiệm, được chứng nhận quốc tế, tận tâm hướng dẫn từng học viên',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Heart,
      title: 'Chương Trình Đa Dạng',
      description: 'Yoga, Pilates, Cardio, Strength Training, Group Classes phù hợp mọi độ tuổi và trình độ',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Target,
      title: 'Kế Hoạch Cá Nhân Hóa',
      description: 'Lộ trình tập luyện và dinh dưỡng được thiết kế riêng cho từng mục tiêu cá nhân',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { number: '2000+', label: 'Thành viên hài lòng' },
    { number: '50+', label: 'Huấn luyện viên chuyên nghiệp' },
    { number: '100+', label: 'Khóa học đa dạng' },
    { number: '5+', label: 'Năm kinh nghiệm' }
  ];

  const testimonials = [
    {
      name: 'Nguyễn Minh Anh',
      role: 'Doanh nhân',
      content: 'GymMaster đã thay đổi hoàn toàn lối sống của tôi. Sau 6 tháng tập luyện, tôi cảm thấy khỏe mạnh và tự tin hơn rất nhiều.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Trần Thị Lan',
      role: 'Giáo viên',
      content: 'Các lớp Yoga ở đây thật tuyệt vời! Huấn luyện viên rất tận tâm và không gian tập luyện rất thoải mái.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Lê Văn Hùng',
      role: 'Kỹ sư',
      content: 'Trang thiết bị hiện đại, sạch sẽ. Đặc biệt là chương trình tập cá nhân hóa giúp tôi đạt mục tiêu nhanh chóng.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face'
    }
  ];

  const packages = [
    {
      name: 'Basic',
      price: '500K',
      period: '/tháng',
      features: [
        'Sử dụng khu vực gym',
        'Tham gia group classes',
        'Tủ đồ cá nhân',
        'Hỗ trợ cơ bản từ staff'
      ],
      popular: false,
      color: 'from-gray-500 to-gray-600'
    },
    {
      name: 'Premium',
      price: '800K',
      period: '/tháng',
      features: [
        'Tất cả quyền lợi Basic',
        '4 buổi PT cá nhân/tháng',
        'Kế hoạch dinh dưỡng',
        'Massage thư giãn',
        'Ưu tiên đặt lịch'
      ],
      popular: true,
      color: 'from-blue-500 to-purple-600'
    },
    {
      name: 'VIP',
      price: '1.2M',
      period: '/tháng',
      features: [
        'Tất cả quyền lợi Premium',
        'PT cá nhân không giới hạn',
        'Phòng tập riêng',
        'Spa & Sauna',
        'Đồ uống miễn phí',
        'Hỗ trợ 24/7'
      ],
      popular: false,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GymMaster
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Trang chủ</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">Về chúng tôi</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Dịch vụ</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Bảng giá</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Liên hệ</a>
            </div>
            
            <button 
              onClick={onLoginClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-white opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-white opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Khởi Đầu Hành Trình
                <span className="block text-yellow-300">Fitness</span>
                <span className="block">Của Bạn</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                Trung tâm thể dục thể thao hàng đầu với trang thiết bị hiện đại, 
                huấn luyện viên chuyên nghiệp và không gian tập luyện sang trọng.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={onLoginClick}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                >
                  Bắt đầu ngay
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Xem video
                </button>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold mb-1">{stat.number}</div>
                    <div className="text-blue-100 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=600&h=800"
                  alt="Gym Equipment"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Tại Sao Chọn GymMaster?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi cam kết mang đến trải nghiệm fitness tốt nhất với đội ngũ chuyên nghiệp 
              và trang thiết bị hiện đại nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Dịch Vụ Của Chúng Tôi</h2>
            <p className="text-xl text-gray-600">Đa dạng các chương trình tập luyện phù hợp với mọi nhu cầu</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Personal Training',
                description: 'Huấn luyện cá nhân 1-1 với PT chuyên nghiệp',
                image: 'https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
                price: 'Từ 300K/buổi'
              },
              {
                title: 'Group Classes',
                description: 'Các lớp học nhóm sôi động và thú vị',
                image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
                price: 'Từ 100K/buổi'
              },
              {
                title: 'Yoga & Pilates',
                description: 'Thư giãn và tăng cường sự linh hoạt',
                image: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
                price: 'Từ 150K/buổi'
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-blue-600">{service.price}</span>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200">
                      Tìm hiểu thêm
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Bảng Giá Thành Viên</h2>
            <p className="text-xl text-gray-600">Chọn gói phù hợp với nhu cầu và ngân sách của bạn</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${pkg.popular ? 'ring-4 ring-blue-500 transform scale-105' : ''}`}>
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Phổ biến nhất
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${pkg.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">{pkg.name}</h3>
                  
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-gray-800">{pkg.price}</span>
                    <span className="text-gray-600">{pkg.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={onLoginClick}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105' 
                        : 'border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                    }`}
                  >
                    Chọn gói này
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Khách Hàng Nói Gì Về Chúng Tôi</h2>
            <p className="text-xl text-gray-600">Những phản hồi chân thực từ các thành viên của GymMaster</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Liên Hệ Với Chúng Tôi</h2>
            <p className="text-xl text-gray-300">Sẵn sàng bắt đầu hành trình fitness của bạn?</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Thông Tin Liên Hệ</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-blue-400 mr-4" />
                  <div>
                    <h4 className="font-semibold">Địa chỉ</h4>
                    <p className="text-gray-300">123 Đường ABC, Quận 1, TP.HCM</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-blue-400 mr-4" />
                  <div>
                    <h4 className="font-semibold">Điện thoại</h4>
                    <p className="text-gray-300">0123 456 789</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-blue-400 mr-4" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-300">info@gymmaster.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-6 h-6 text-blue-400 mr-4" />
                  <div>
                    <h4 className="font-semibold">Giờ hoạt động</h4>
                    <p className="text-gray-300">7:00 - 22:00 (Thứ 2 - Chủ nhật)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6">Đăng Ký Tư Vấn Miễn Phí</h3>
              
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Họ và tên"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="Số điện thoại"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Tin nhắn"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Gửi tin nhắn
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">GymMaster</h3>
              </div>
              <p className="text-gray-400">
                Trung tâm thể dục thể thao hàng đầu với trang thiết bị hiện đại và dịch vụ chuyên nghiệp.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Dịch vụ</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Personal Training</li>
                <li>Group Classes</li>
                <li>Yoga & Pilates</li>
                <li>Dinh dưỡng</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Thông tin</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Về chúng tôi</li>
                <li>Bảng giá</li>
                <li>Liên hệ</li>
                <li>Chính sách</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h4>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm">ig</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm">yt</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GymMaster. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;