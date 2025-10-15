const jwt = require('jsonwebtoken');

// Middleware verify JWT
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send({ error: 'Token không tồn tại' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // lưu id user để dùng ở các route khác
    next();
  } catch (e) {
    res.status(401).send({ error: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};

module.exports = auth;
