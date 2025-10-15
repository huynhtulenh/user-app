# Trang Login - User App

## Cách sử dụng

1. **Khởi động server:**
   ```bash
   npm run dev
   # hoặc
   npm start
   ```

2. **Truy cập trang login:**
   - Mở trình duyệt và vào: `http://127.0.0.1:3000/`
   - Trang sẽ tự động redirect đến `/login.html`

3. **Đăng nhập:**
   - Nhập email và mật khẩu của bạn
   - Nhấn nút "Đăng nhập"
   - Nếu thành công, bạn sẽ được chuyển đến dashboard

4. **Tạo tài khoản mới:**
   - Sử dụng API endpoint: `POST /users`
   - Hoặc sử dụng curl command như trong README chính

## Tính năng trang login

- ✅ **Responsive Design**: Hoạt động tốt trên desktop và mobile
- ✅ **Form Validation**: Kiểm tra email và password
- ✅ **Loading State**: Hiển thị trạng thái đang xử lý
- ✅ **Error Handling**: Hiển thị lỗi khi đăng nhập thất bại
- ✅ **Success Feedback**: Thông báo khi đăng nhập thành công
- ✅ **Auto Redirect**: Tự động chuyển hướng sau khi đăng nhập
- ✅ **Token Storage**: Lưu JWT token trong localStorage
- ✅ **Session Check**: Kiểm tra đăng nhập khi load trang

## Tính năng Dashboard

- ✅ **User Info Display**: Hiển thị thông tin người dùng
- ✅ **Statistics**: Hiển thị số lượng ghi chú và thông tin khác
- ✅ **Action Buttons**: Các nút để quản lý hồ sơ, ghi chú, v.v.
- ✅ **Logout Function**: Đăng xuất an toàn
- ✅ **API Information**: Hiển thị thông tin về các API endpoints

## Cấu trúc file

```
public/
├── login.html      # Trang đăng nhập
└── dashboard.html  # Trang dashboard sau khi đăng nhập
```

## Lưu ý

- Trang login sử dụng API `/users/login` để xác thực
- JWT token được lưu trong localStorage
- Sau khi đăng nhập thành công, người dùng được chuyển đến `/dashboard.html`
- Nếu chưa có token, người dùng sẽ được redirect về trang login
