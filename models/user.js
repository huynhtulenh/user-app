const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Note = require('./note');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tên không được để trống']
  },
  email: {
    type: String,
    required: [true, 'Email không được để trống'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password không được để trống']
  },
  avatar: {
    type: String
  }
}, {
  timestamps: true // tự động thêm createdAt, updatedAt
});

// Middleware mã hoá mật khẩu trước khi lưu
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // chỉ mã hoá nếu password thay đổi
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Xóa tất cả note của user trước khi xóa user
userSchema.pre("findOneAndDelete", async function(next) {
  const user = await this.model.findOne(this.getQuery());
  if (user) {
    await Note.deleteMany({ owner: user._id });
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
