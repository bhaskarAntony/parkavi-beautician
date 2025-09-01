const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
let db;
const connectDB = async () => {
  try {
    const client = await MongoClient.connect('mongodb+srv://bhaskarAntoty123:bhaskar3958@bhaskarantony.wagpkay.mongodb.net/?retryWrites=true&w=majority');
    db = client.db();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bhaskarbabucm6@gmail.com',
    pass: 'iqtkhkrvuwfxmvhn'
  }
});

// Routes

// Contact Form Submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, service, date, message } = req.body;
    
    // Save to database
    const contact = {
      name,
      email,
      phone,
      service,
      date,
      message,
      createdAt: new Date(),
      status: 'new'
    };
    
    await db.collection('parkavi_contacts').insertOne(contact);
    
    // Send email notification
    const mailOptions = {
      from: 'bhaskarbabucm6@gmail.com',
      to: 'bhaskarbabucm6@gmail.com',
      subject: `New Contact Form Submission - ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Preferred Date:</strong> ${date}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    res.json({ success: true, message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Booking Submission
app.post('/api/bookings', async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Generate booking ID
    const bookingId = 'BK' + Date.now().toString().slice(-8);
    
    // Save to database
    const booking = {
      bookingId,
      ...bookingData,
      createdAt: new Date(),
      status: 'pending',
      paymentStatus: 'pending'
    };
    
    await db.collection('parkavi_bookings').insertOne(booking);
    
    // Send confirmation email to customer
    const customerMailOptions = {
      from: "bhaskarbabucm6@gmail.com",
      to: bookingData.email,
      subject: `Booking Confirmation - ${bookingId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ec4899;">Booking Confirmation</h2>
          <p>Dear ${bookingData.name},</p>
          <p>Thank you for booking with Parkavi Beautician! Your booking has been received and is being processed.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3>Booking Details:</h3>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            <p><strong>Service:</strong> ${bookingData.service}</p>
            <p><strong>Date:</strong> ${bookingData.date}</p>
            <p><strong>Time:</strong> ${bookingData.time}</p>
            <p><strong>Location:</strong> ${bookingData.location}</p>
          </div>
          
          <p>We will contact you within 2 hours to confirm the details and discuss payment.</p>
          <p>For any questions, please call us at +91 98765 43210</p>
          
          <p>Best regards,<br>Parkavi Beautician Team</p>
        </div>
      `
    };
    
    // Send notification email to business
    const businessMailOptions = {
      from: "bhaskarbabucm6@gmail.com",
      to: 'bhaskarbabucm6@gmail.com',
      subject: `New Booking - ${bookingId}`,
      html: `
        <h2>New Booking Received</h2>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>Customer:</strong> ${bookingData.name}</p>
        <p><strong>Email:</strong> ${bookingData.email}</p>
        <p><strong>Phone:</strong> ${bookingData.phone}</p>
        <p><strong>Service:</strong> ${bookingData.service}</p>
        <p><strong>Date:</strong> ${bookingData.date}</p>
        <p><strong>Time:</strong> ${bookingData.time}</p>
        <p><strong>Location:</strong> ${bookingData.location}</p>
        <p><strong>Guest Count:</strong> ${bookingData.guestCount}</p>
        <p><strong>Budget:</strong> ${bookingData.budget}</p>
        <p><strong>Special Requests:</strong> ${bookingData.specialRequests}</p>
      `
    };
    
    await Promise.all([
      transporter.sendMail(customerMailOptions),
      transporter.sendMail(businessMailOptions)
    ]);
    
    res.json({ 
      success: true, 
      message: 'Booking submitted successfully',
      bookingId 
    });
  } catch (error) {
    console.error('Error submitting booking:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get Bookings (Admin)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await db.collection('bookings')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update Booking Status
app.put('/api/bookings/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    await db.collection('bookings').updateOne(
      { bookingId: id },
      { $set: { status, updatedAt: new Date() } }
    );
    
    res.json({ success: true, message: 'Booking status updated' });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get Contacts (Admin)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await db.collection('contacts')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();