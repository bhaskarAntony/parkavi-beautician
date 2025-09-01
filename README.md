# Parkavi Beautician - Professional Bridal Makeup Artist Website

A stunning, professional website for Parkavi Beautician featuring multilingual support (Tamil/English), advanced booking system, and complete backend integration.

## Features

- **Multilingual Support**: Tamil and English language switching
- **Responsive Design**: Mobile-first approach with elegant sidebar navigation
- **Advanced Booking System**: Multi-step booking process with form validation
- **Contact Management**: Professional contact forms with email notifications
- **Gallery**: Interactive image gallery with lightbox functionality
- **Dark Theme**: Beautiful gradient design with animations
- **Backend Integration**: Node.js + MongoDB + Email notifications

## Technologies Used

### Frontend
- React 18 with JSX components
- React Router for navigation
- Framer Motion for animations
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB for data storage
- Nodemailer for email notifications
- CORS for cross-origin requests

## Getting Started

### Frontend Development
```bash
npm install
npm run dev
```

### Backend Development
```bash
cd server
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the server directory:

```env
MONGODB_URI=mongodb://localhost:27017/parkavi-beautician
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=5000
NODE_ENV=development
```

## Project Structure

```
├── src/
│   ├── components/          # Reusable components
│   ├── pages/              # Page components
│   ├── contexts/           # React contexts
│   └── main.jsx           # Entry point
├── server/                 # Backend server
│   ├── index.js           # Main server file
│   └── package.json       # Backend dependencies
└── public/                # Static assets
```

## Features Overview

### Multi-step Booking Process
1. Service selection with pricing
2. Date and time slot selection
3. Personal details and requirements
4. Automatic email confirmations

### Admin Features
- View all bookings and contacts
- Update booking statuses
- Email notifications for new submissions

### Language Support
- Complete Tamil translation
- Easy language switching
- Persistent language preferences

## Contact Information

- **Phone**: +91 98765 43210
- **Email**: parkavi.beautician@gmail.com
- **Address**: Anna Nagar, Chennai, Tamil Nadu 600040

---

Built with ❤️ for Parkavi Beautician