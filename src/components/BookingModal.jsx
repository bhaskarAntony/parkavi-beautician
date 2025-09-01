import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, Sparkles } from 'lucide-react';

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    guestCount: '',
    specialRequests: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    { id: 'bridal', name: 'Bridal Makeup', price: '₹15,000 - ₹25,000', duration: '3-4 Hours' },
    { id: 'engagement', name: 'Engagement Makeup', price: '₹8,000 - ₹12,000', duration: '2-3 Hours' },
    { id: 'party', name: 'Party Makeup', price: '₹5,000 - ₹8,000', duration: '1-2 Hours' },
    { id: 'traditional', name: 'Traditional Makeup', price: '₹10,000 - ₹18,000', duration: '2-3 Hours' }
  ];

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://parkavi-beautician-backend.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setStep(1);
    setIsSubmitted(false);
    setBookingData({
      service: '',
      date: '',
      time: '',
      name: '',
      email: '',
      phone: '',
      location: '',
      guestCount: '',
      specialRequests: '',
      budget: ''
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-purple-900/50 to-black rounded-3xl p-8 border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Progress Indicator */}
            {!isSubmitted && (
              <div className="flex items-center justify-center mb-8">
                <div className="flex space-x-2">
                  {[1, 2, 3].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        step >= stepNumber
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600'
                          : 'bg-white/20'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {isSubmitted ? (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
                <p className="text-gray-300 text-lg mb-8">
                  Thank you for choosing Parkavi Beautician! We've received your booking request and will contact you within 2 hours to confirm the details.
                </p>
                <button
                  onClick={resetModal}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Step 1: Service Selection */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-3xl font-bold text-white mb-2">Choose Your Service</h2>
                    <p className="text-gray-300 mb-8">Select the makeup service you'd like to book</p>
                    
                    <div className="space-y-4 mb-8">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => setBookingData({ ...bookingData, service: service.id })}
                          className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                            bookingData.service === service.id
                              ? 'border-pink-500 bg-pink-500/10'
                              : 'border-white/20 bg-white/5 hover:border-pink-500/50'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-white font-bold text-lg">{service.name}</h3>
                              <p className="text-gray-300 text-sm">{service.duration}</p>
                            </div>
                            <div className="text-pink-400 font-bold">{service.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!bookingData.service}
                      className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-3xl font-bold text-white mb-2">Select Date & Time</h2>
                    <p className="text-gray-300 mb-8">Choose your preferred date and time slot</p>
                    
                    <div className="space-y-6 mb-8">
                      <div>
                        <label className="block text-gray-300 font-medium mb-2">
                          <Calendar className="inline w-5 h-5 mr-2" />
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={bookingData.date}
                          onChange={handleInputChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-medium mb-2">
                          <Clock className="inline w-5 h-5 mr-2" />
                          Time Slot
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setBookingData({ ...bookingData, time })}
                              className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                bookingData.time === time
                                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 px-6 py-3 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        disabled={!bookingData.date || !bookingData.time}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Personal Details */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-3xl font-bold text-white mb-2">Your Details</h2>
                    <p className="text-gray-300 mb-8">Tell us about yourself and your event</p>
                    
                    <div className="space-y-6 mb-8">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">
                            <User className="inline w-5 h-5 mr-2" />
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={bookingData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">
                            <Mail className="inline w-5 h-5 mr-2" />
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={bookingData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">
                            <Phone className="inline w-5 h-5 mr-2" />
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={bookingData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Event Location</label>
                          <input
                            type="text"
                            name="location"
                            value={bookingData.location}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
                            placeholder="Event venue or address"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Number of People</label>
                          <select
                            name="guestCount"
                            value={bookingData.guestCount}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
                          >
                            <option value="" className="bg-gray-800">Select count</option>
                            <option value="1" className="bg-gray-800">Just me</option>
                            <option value="2-5" className="bg-gray-800">2-5 people</option>
                            <option value="6-10" className="bg-gray-800">6-10 people</option>
                            <option value="10+" className="bg-gray-800">More than 10</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-300 font-medium mb-2">Budget Range</label>
                          <select
                            name="budget"
                            value={bookingData.budget}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
                          >
                            <option value="" className="bg-gray-800">Select budget</option>
                            <option value="5000-10000" className="bg-gray-800">₹5,000 - ₹10,000</option>
                            <option value="10000-15000" className="bg-gray-800">₹10,000 - ₹15,000</option>
                            <option value="15000-25000" className="bg-gray-800">₹15,000 - ₹25,000</option>
                            <option value="25000+" className="bg-gray-800">₹25,000+</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-300 font-medium mb-2">
                          <MessageSquare className="inline w-5 h-5 mr-2" />
                          Special Requests
                        </label>
                        <textarea
                          name="specialRequests"
                          value={bookingData.specialRequests}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200 resize-none"
                          placeholder="Any specific requirements, style preferences, or special considerations..."
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex-1 px-6 py-3 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !bookingData.name || !bookingData.email || !bookingData.phone}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Booking...</span>
                          </>
                        ) : (
                          <span>Confirm Booking</span>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;