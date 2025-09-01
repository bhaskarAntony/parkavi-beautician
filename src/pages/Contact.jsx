import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://parkavi-beautician-backend.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('phone'),
      value: '+91 98765 43210',
      href: 'tel:+919876543210'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('email'),
      value: 'parkavi.beautician@gmail.com',
      href: 'mailto:parkavi.beautician@gmail.com'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('address'),
      value: 'Anna Nagar, Chennai, Tamil Nadu 600040',
      href: 'https://maps.google.com'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Working Hours',
      value: 'Mon - Sun: 8:00 AM - 8:00 PM',
      href: null
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
            {t('contactTitle')}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('contactDescription')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Ready to transform your look? Contact us today to schedule your consultation or ask any questions about our services.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  {info.href ? (
                    <a
                      href={info.href}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-pink-500/30 transition-all duration-300"
                    >
                      <div className="text-pink-400 group-hover:text-pink-300 transition-colors">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{info.title}</h3>
                        <p className="text-gray-300 group-hover:text-white transition-colors">{info.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10">
                      <div className="text-pink-400">{info.icon}</div>
                      <div>
                        <h3 className="text-white font-semibold">{info.title}</h3>
                        <p className="text-gray-300">{info.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Map Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10"
            >
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin className="w-12 h-12 mx-auto mb-4" />
                  <p>Interactive Map Coming Soon</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
                <p className="text-gray-300 text-lg">
                  Your message has been sent successfully. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Send Us a Message</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">{t('name')}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">{t('emailLabel')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">{t('phoneLabel')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Service</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
                    >
                      <option value="" className="bg-gray-800">Select a service</option>
                      <option value="bridal" className="bg-gray-800">Bridal Makeup</option>
                      <option value="engagement" className="bg-gray-800">Engagement Makeup</option>
                      <option value="party" className="bg-gray-800">Party Makeup</option>
                      <option value="traditional" className="bg-gray-800">Traditional Makeup</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Preferred Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">{t('message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200 resize-none"
                    placeholder="Tell us about your event, preferred style, or any special requirements..."
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>{t('submit')}</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;