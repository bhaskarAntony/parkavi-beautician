import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { path: '/', label: t('home') },
    { path: '/about', label: t('about') },
    { path: '/services', label: t('services') },
    { path: '/gallery', label: t('gallery') },
    { path: '/contact', label: t('contact') }
  ];

  const socialLinks = [
    { icon: <Instagram size={20} />, href: '#', color: 'hover:text-pink-400' },
    { icon: <Facebook size={20} />, href: '#', color: 'hover:text-blue-400' },
    { icon: <Youtube size={20} />, href: '#', color: 'hover:text-red-400' }
  ];

  return (
    <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Parkavi Beautician</h3>
                <p className="text-pink-300 text-sm">{t('subtitle')}</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Professional bridal makeup artist creating stunning looks for your most special moments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <a href="tel:+919876543210" className="flex items-center space-x-3 text-gray-300 hover:text-pink-400 transition-colors">
                <Phone size={16} />
                <span>+91 99409 39760</span>
              </a>
              <a href="mailto:parkavi.beautician@gmail.com" className="flex items-center space-x-3 text-gray-300 hover:text-pink-400 transition-colors">
                <Mail size={16} />
                <span>parkavimakeupartist@gmail.com</span>
              </a>
              <div className="flex items-start space-x-3 text-gray-300">
                <MapPin size={16} className="mt-1" />
                <span>116, Sub JailRoad, new pet, Krishnagiri , 635001</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t('followUs')}</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 ${social.color} transition-all duration-200 hover:bg-white/20 hover:scale-110`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-300">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;