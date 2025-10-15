const mongoose = require('mongoose');
const validator = require('validator');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error('Title cannot be empty');
      }
    }
  },
  body: {
    type: String,
    trim: true,
    default: ''
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"  // tham chiếu đến User model
  }
}, {
  timestamps: true // tự động thêm createdAt, updatedAt
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
