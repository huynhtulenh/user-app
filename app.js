const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());

// Serve static files from public directory
app.use(express.static('public'));

// Route for root path - redirect to login page
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Kết nối MongoDB (chỉ khi không phải trong môi trường kiểm thử)
if (process.env.NODE_ENV !== 'test') {
  // Sử dụng MONGODB_URL cho dev, MONGO_URI cho production
  const mongoUrl = process.env.NODE_ENV === 'production' 
    ? process.env.MONGO_URI 
    : process.env.MONGODB_URL;
  
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('✅ Kết nối MongoDB thành công'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));
}

// Sử dụng router
app.use('/users', usersRouter);

// Only start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    console.log('🚀 Server chạy tại http://127.0.0.1:3000');
  });
}

module.exports = app;
