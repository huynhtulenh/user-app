# User App

Ứng dụng quản lý người dùng với các tính năng đăng ký, đăng nhập, quản lý ghi chú và tải lên avatar.

## Tính năng

- ✅ Đăng ký người dùng mới
- ✅ Đăng nhập với JWT authentication
- ✅ Quản lý hồ sơ người dùng (xem, cập nhật, xóa)
- ✅ Quản lý ghi chú (tạo, đọc, cập nhật, xóa)
- ✅ Tải lên avatar với validation
- ✅ Gửi email chào mừng khi đăng ký
- ✅ Phân trang và sắp xếp dữ liệu

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd user-app
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file `.env` với các biến môi trường:
```env
MONGODB_URL=mongodb://127.0.0.1:27017/user-app
JWT_SECRET=your-secret-key
PORT=3000
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=your-email@example.com
```

## Chạy ứng dụng

### Development mode
```bash
npm run dev
```

### Production mode
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /users` - Đăng ký người dùng mới
- `POST /users/login` - Đăng nhập
- `GET /users/me` - Lấy thông tin người dùng hiện tại

### User Management
- `GET /users` - Lấy danh sách người dùng (có phân trang)
- `GET /users/:id` - Lấy thông tin người dùng theo ID
- `PATCH /users/:id` - Cập nhật người dùng (bao gồm upload avatar)
- `DELETE /users/:id` - Xóa người dùng
- `GET /users/:id/avatar` - Lấy avatar của người dùng

### Notes Management
- `POST /users/add-note` - Tạo ghi chú mới
- `GET /users/notes` - Lấy danh sách ghi chú của người dùng (có phân trang và sắp xếp)
- `GET /users/note/:id` - Lấy ghi chú theo ID
- `PATCH /users/note/:id` - Cập nhật ghi chú
- `DELETE /users/note/:id` - Xóa ghi chú

## Ví dụ sử dụng API

### Đăng ký người dùng
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Đăng nhập
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Tạo ghi chú (cần token)
```bash
curl -X POST http://localhost:3000/users/add-note \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Note",
    "body": "This is the content of my note"
  }'
```

### Upload avatar (cần token)
```bash
curl -X PATCH http://localhost:3000/users/USER_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "avatar=@/path/to/image.jpg"
```

## Kiểm thử

### Chạy tất cả tests
```bash
npm test
```

### Chạy tests với coverage
```bash
npm run test:coverage
```

## Cấu trúc dự án

```
user-app/
├── app.js                 # File chính của ứng dụng
├── package.json           # Dependencies và scripts
├── jest.config.js         # Cấu hình Jest
├── tests/                 # Thư mục chứa tests
│   ├── setup.js          # Setup MongoDB cho tests
│   ├── env-setup.js      # Setup environment variables
│   ├── user.test.js      # Tests cho user API
│   ├── note.test.js      # Tests cho note API
│   └── upload.test.js    # Tests cho upload API
├── routes/               # Định nghĩa routes
│   └── users.js         # User routes
├── models/              # Mongoose models
│   ├── user.js         # User model
│   └── note.js        # Note model
├── middleware/          # Express middleware
│   ├── auth.js        # Authentication middleware
│   └── upload.js      # File upload middleware
├── emails/             # Email templates
│   └── account.js     # Account-related emails
└── uploads/           # Thư mục lưu files upload
    └── avatars/       # Avatar images
```

## Dependencies chính

- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Multer** - File upload handling
- **Bcryptjs** - Password hashing
- **SendGrid** - Email service
- **Jest** - Testing framework
- **Supertest** - HTTP testing

## Lưu ý

- Avatar chỉ chấp nhận file JPG, JPEG, PNG
- Kích thước file upload tối đa: 2MB
- JWT token có thời hạn 1 giờ
- Cần cài đặt MongoDB để chạy ứng dụng
- Cần API key SendGrid để gửi email

## Troubleshooting

### Lỗi kết nối MongoDB
- Đảm bảo MongoDB đang chạy
- Kiểm tra URL kết nối trong file `.env`

### Lỗi upload file
- Kiểm tra quyền ghi vào thư mục `uploads/avatars`
- Đảm bảo file có định dạng và kích thước hợp lệ

### Lỗi email
- Kiểm tra API key SendGrid
- Đảm bảo email sender đã được verify
