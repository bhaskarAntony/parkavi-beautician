import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, Sparkles, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const achievements = [
    { icon: <Award className="w-6 h-6" />, text: 'Certified Professional Makeup Artist' },
    { icon: <Users className="w-6 h-6" />, text: '500+ Satisfied Brides' },
    { icon: <Sparkles className="w-6 h-6" />, text: 'Specialist in Traditional & Modern Looks' },
    { icon: <Heart className="w-6 h-6" />, text: 'Passionate About Beauty & Art' }
  ];

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t('aboutTitle')}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Crafting beauty, one bride at a time
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://content.jdmagicbox.com/comp/pali-rajasthan/s6/9999p2932.2932.180808162024.i7s6/catalogue/seasons-beauty-salon-pali-city-pali-rajasthan-salons-hs4rgrywth.jpg"
                alt="Parkavi - Professional Makeup Artist"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-20 blur-xl"></div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Bringing Dreams to <span className="text-pink-400">Life</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {t('aboutDescription')} With a keen eye for detail and a deep understanding of what makes each bride unique, I create looks that enhance natural beauty while reflecting personal style.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              From traditional Tamil bridal looks to contemporary styles, I specialize in creating makeup that photographs beautifully and lasts throughout your special day. Every bride deserves to feel like the most beautiful version of herself.
            </p>
            
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 text-gray-300"
                >
                  <div className="text-pink-400">{achievement.icon}</div>
                  <span>{achievement.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Journey Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-white/5 to-white/10 rounded-3xl p-12 backdrop-blur-sm border border-white/10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            My <span className="text-pink-400">Journey</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-white">Training & Certification</h3>
              <p className="text-gray-300">
                Completed professional makeup artistry certification from leading beauty institutes
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-white">Building Experience</h3>
              <p className="text-gray-300">
                Worked with hundreds of brides, perfecting techniques for all skin types and preferences
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-white">Creating Magic</h3>
              <p className="text-gray-300">
                Now helping brides across the region achieve their dream look for their special day
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;