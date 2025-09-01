import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'Services',
    gallery: 'Gallery',
    contact: 'Contact',
    bookNow: 'Book Now',
    
    // Home Page
    welcome: 'Welcome to',
    subtitle: 'Bridal Makeup Artist',
    heroDescription: 'Transform your special day with our professional bridal makeup services. Expert artistry meets your unique beauty.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    
    // Features
    expertiseTitle: 'Professional Expertise',
    expertiseDesc: 'Over 5 years of experience in bridal and special occasion makeup',
    premiumTitle: 'Premium Products',
    premiumDesc: 'Using only high-quality, skin-friendly cosmetics and tools',
    customTitle: 'Customized Looks',
    customDesc: 'Personalized makeup styles to match your vision and personality',
    
    // About
    aboutTitle: 'About Parkavi',
    aboutDescription: 'Professional makeup artist specializing in bridal beauty with a passion for creating stunning, memorable looks for your special day.',
    
    // Services
    servicesTitle: 'Our Services',
    bridalMakeup: 'Bridal Makeup',
    partyMakeup: 'Party Makeup',
    engagementMakeup: 'Engagement Makeup',
    traditionalMakeup: 'Traditional Makeup',
    
    // Contact
    contactTitle: 'Contact Us',
    contactDescription: 'Ready to book your session? Get in touch with us today!',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    
    // Form
    name: 'Name',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    message: 'Message',
    submit: 'Submit',
    
    // Footer
    quickLinks: 'Quick Links',
    followUs: 'Follow Us',
    copyright: '© 2025 Parkavi Beautician. All rights reserved.'
  },
  ta: {
    // Navigation
    home: 'முகப்பு',
    about: 'எங்களைப் பற்றி',
    services: 'சேவைகள்',
    gallery: 'படக்காட்சி',
    contact: 'தொடர்பு',
    bookNow: 'இப்போது பதிவு செய்யுங்கள்',
    
    // Home Page
    welcome: 'வரவேற்கிறோம்',
    subtitle: 'மணமகள் ஒப்பனை கலைஞர்',
    heroDescription: 'எங்கள் தொழில்முறை மணமகள் ஒப்பனை சேவைகளால் உங்கள் சிறப்பு நாளை மாற்றுங்கள். நிபுணத்துவ கலை உங்கள் தனித்துவ அழகுடன் சந்திக்கிறது.',
    getStarted: 'தொடங்குங்கள்',
    learnMore: 'மேலும் அறிக',
    
    // Features
    expertiseTitle: 'தொழில்முறை நிபுணத்துவம்',
    expertiseDesc: 'மணமகள் மற்றும் சிறப்பு நிகழ்வு ஒப்பனையில் 5 ஆண்டுகளுக்கும் மேலான அனுபவம்',
    premiumTitle: 'உயர்தர பொருட்கள்',
    premiumDesc: 'உயர்தர, தோல் நட்பு அழகுசாதனப் பொருட்கள் மற்றும் கருவிகளை மட்டுமே பயன்படுத்துதல்',
    customTitle: 'தனிப்பயன் தோற்றங்கள்',
    customDesc: 'உங்கள் பார்வை மற்றும் ஆளுமைக்கு ஏற்ற தனிப்பயன் ஒப்பனை பாணிகள்',
    
    // About
    aboutTitle: 'பார்கவியைப் பற்றி',
    aboutDescription: 'உங்கள் சிறப்பு நாளுக்கு அழகான, மறக்கமுடியாத தோற்றங்களை உருவாக்கும் ஆர்வத்துடன் மணமகள் அழகில் நிபுணத்துவம் பெற்ற தொழில்முறை ஒப்பனை கலைஞர்.',
    
    // Services
    servicesTitle: 'எங்கள் சேவைகள்',
    bridalMakeup: 'மணமகள் ஒப்பனை',
    partyMakeup: 'விருந்து ஒப்பனை',
    engagementMakeup: 'நிச்சயதார்த்த ஒப்பனை',
    traditionalMakeup: 'பாரம்பரிய ஒப்பனை',
    
    // Contact
    contactTitle: 'எங்களைத் தொடர்பு கொள்ளுங்கள்',
    contactDescription: 'உங்கள் அமர்வை பதிவு செய்ய தயாரா? இன்றே எங்களைத் தொடர்பு கொள்ளுங்கள்!',
    phone: 'தொலைபேசி',
    email: 'மின்னஞ்சல்',
    address: 'முகவரி',
    
    // Form
    name: 'பெயர்',
    emailLabel: 'மின்னஞ்சல்',
    phoneLabel: 'தொலைபேசி',
    message: 'செய்தி',
    submit: 'சமர்ப்பிக்கவும்',
    
    // Footer
    quickLinks: 'விரைவு இணைப்புகள்',
    followUs: 'எங்களைப் பின்தொடருங்கள்',
    copyright: '© 2025 பார்கவி அழகு நிலையம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};