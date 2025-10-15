const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Note = require("../models/note");
const auth = require("../middleware/auth");
const upload = require('../middleware/upload');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { sendWelcomeEmail } = require('../emails/account');

// ✅ Thêm user mới (POST /users)
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    // Gửi email chào mừng
    await sendWelcomeEmail(user.email, user.name);

    res.status(201).send({
      message: 'User đã được tạo thành công',
      user: { name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// 🟢 Thêm ghi chú mới (có owner)
router.post("/add-note", auth, async (req, res) => {
  try {
    const note = new Note({
      ...req.body,
      owner: req.userId  // lấy user từ token
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 Lấy tất cả note của user hiện tại
router.get("/notes", auth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sortParam = req.query.sort || '-createdAt';// mặc định: mới nhất lên đầu

    // Tạo object sort
    const sortOption= {};
    if(sortParam.startsWith('-')) {
        sortOption[sortParam.substring(1)] = -1;
    } else {
        sortOption[sortParam] = 1;
    }
    const notes = await Note.find({ owner: req.userId })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sortOption);

    const total = await Note.countDocuments({ owner: req.userId });

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      sort: sortParam,
      data: notes
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 🟢 Lấy note kem thong tin user
router.get("/note/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id,owner: req.userId }).populate("owner", "name email");
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 [PATCH] /notes/:id - User chi Cập nhật ghi chú cua minh
router.patch('/note/:id', auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowed = ['title', 'body'];
    const isValid = updates.every(key => allowed.includes(key));
    if (!isValid) return res.status(400).send({ error: 'Invalid updates' });

    const note = await Note.findOne({_id: req.params.id, owner: req.userId});
    if (!note) return res.status(404).send({ error: 'Note not found' });

    updates.forEach(key => note[key] = req.body[key]);
    await note.save();
    res.send(note);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// 🟢 [DELETE] /notes/:id - Xoá ghi chú
router.delete('/note/:id', auth, async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete({_id: req.params.id, owner: req.userId});
    if (!note) return res.status(404).send({ error: 'Note not found or not owned by you' });
    res.send({ message: 'Note deleted successfully', note });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// ✅ Lấy danh sách user (GET /users)
router.get('/', auth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const users = await User.find().skip((page-1)*limit).limit(limit).sort({createdAt: -1});
    const total = await User.countDocuments();

    res.json({
        page,
        limit,
        total,
        totalPages: Math.ceil(total/limit),
        data:users
    });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

// ✅ Cập nhật user (PATCH /users/:id)
router.patch('/:id', auth, upload.single('avatar'), async (req, res) => {
  try {
    const updates = req.body;

    if(req.file) {
      updates.avatar = req.file.path;
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    }).select('name email avatar');

    if (!user) return res.status(404).send({ error: 'Không tìm thấy user' });
    res.send({ message: 'Đã cập nhật user', user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Hiển thị avatar của user
router.get('/:id/avatar', auth, async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user || !user.avatar) {
      return res.status(404).json({ error: 'Avatar not found' });
    }

    const avatarPath = path.resolve(user.avatar);
    if (!fs.existsSync(avatarPath)) {
      return res.status(404).json({ error: 'File not found on server' });
    }

    res.sendFile(avatarPath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Xoá user (DELETE /users/:id)
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send({ error: 'Không tìm thấy user' });
    res.send({ message: 'Đã xoá user thành công' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: 'Email hoặc mật khẩu không đúng' });
    }

    // So sánh password nhập vào với password đã hash trong DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).send({ error: 'Email hoặc mật khẩu không đúng' });
    }

    const token = jwt.sign(
        { id:user._id.toString()},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    )
    // Nếu hợp lệ → trả về thông tin user (ẩn password)
    res.send({
      message: 'Đăng nhập thành công',
      user: { name: user.name, email: user.email },
      token
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.userId).select('name email');
  res.send(user);
});

// ✅ Lấy thông tin 1 user (GET /users/:id)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name email');
    if (!user) return res.status(404).send({ error: 'Không tìm thấy user' });
    res.send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
