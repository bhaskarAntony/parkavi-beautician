import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Heart, Star, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Services = ({ onBookingClick }) => {
  const { t } = useLanguage();

  const services = [
    {
      id: 'bridal',
      icon: <Crown className="w-8 h-8" />,
      title: t('bridalMakeup'),
      price: '₹15,000 - ₹25,000',
      duration: '3-4 Hours',
      image: 'https://cdn.pixabay.com/photo/2021/04/12/08/19/bride-6171757_1280.jpg',
      features: [
        'Complete bridal transformation',
        'Hair styling included',
        'Touch-up kit provided',
        'Pre-wedding trial session',
        'Traditional & modern styles',
        'Professional photography ready'
      ],
      description: 'Complete bridal makeup service for your most important day. Includes traditional and contemporary styles with professional hair styling.'
    },
    {
      id: 'engagement',
      icon: <Heart className="w-8 h-8" />,
      title: t('engagementMakeup'),
      price: '₹8,000 - ₹12,000',
      duration: '2-3 Hours',
      image: 'https://media.istockphoto.com/id/1336649728/photo/beautiful-traditional-indian-bride-getting-ready-for-her-wedding-day-by-makeup-artist.webp?b=1&s=612x612&w=0&k=20&c=cv8w0lJFMuHqj6YoFp1QkGKwB0Ns0mOR_McFwqDneMw=',
      features: [
        'Elegant engagement look',
        'Soft glam techniques',
        'Hair styling',
        'Long-lasting formula',
        'Photo-ready finish',
        'Consultation included'
      ],
      description: 'Perfect for your engagement ceremony with elegant, sophisticated makeup that captures your joy and excitement.'
    },
    {
      id: 'party',
      icon: <Sparkles className="w-8 h-8" />,
      title: t('partyMakeup'),
      price: '₹5,000 - ₹8,000',
      duration: '1-2 Hours',
      image: 'https://cdn.pixabay.com/photo/2017/07/25/10/36/beauty-2537562_1280.jpg',
      features: [
        'Glamorous party look',
        'Bold or subtle options',
        'Quick touch-ups',
        'Event-appropriate styling',
        'Long-wearing formula',
        'Same-day booking available'
      ],
      description: 'Stunning party makeup for special occasions, celebrations, and events. From subtle elegance to bold glamour.'
    },
    {
      id: 'traditional',
      icon: <Star className="w-8 h-8" />,
      title: t('traditionalMakeup'),
      price: '₹10,000 - ₹18,000',
      duration: '2-3 Hours',
      image: 'https://cdn.pixabay.com/photo/2023/09/12/11/02/ai-generated-8248592_1280.jpg',
      features: [
        'Authentic traditional styles',
        'Cultural makeup expertise',
        'Traditional hair accessories',
        'Custom color matching',
        'Festival-ready looks',
        'Heritage-inspired designs'
      ],
      description: 'Authentic traditional makeup celebrating cultural heritage with modern techniques for festivals and ceremonies.'
    }
  ];

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t('servicesTitle')}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional makeup services tailored to make you look and feel absolutely stunning
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-white/5 to-white/10 rounded-3xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-pink-500/30 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-full">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                  <div className="text-right">
                    <div className="text-pink-400 font-bold text-lg">{service.price}</div>
                    <div className="text-gray-400 text-sm">{service.duration}</div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onBookingClick}
                  className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 group"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-white/5 to-white/10 rounded-3xl p-12 backdrop-blur-sm border border-white/10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Our <span className="text-pink-400">Process</span>
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Consultation', desc: 'Discuss your vision and preferences' },
              { step: '2', title: 'Trial Session', desc: 'Perfect the look with a practice session' },
              { step: '3', title: 'Event Day', desc: 'Professional makeup application' },
              { step: '4', title: 'Touch-ups', desc: 'Final adjustments and touch-up kit' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;