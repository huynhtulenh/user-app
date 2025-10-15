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

4. **Đăng ký tài khoản mới:**
   - Truy cập: `http://127.0.0.1:3000/register.html`
   - Hoặc click "Đăng ký ngay" từ trang login
   - Điền đầy đủ thông tin và nhấn "Đăng ký"
   - Sau khi đăng ký thành công, bạn sẽ được chuyển đến trang đăng nhập

## Tính năng trang login

- ✅ **Responsive Design**: Hoạt động tốt trên desktop và mobile
- ✅ **Form Validation**: Kiểm tra email và password
- ✅ **Loading State**: Hiển thị trạng thái đang xử lý
- ✅ **Error Handling**: Hiển thị lỗi khi đăng nhập thất bại
- ✅ **Success Feedback**: Thông báo khi đăng nhập thành công
- ✅ **Auto Redirect**: Tự động chuyển hướng sau khi đăng nhập
- ✅ **Token Storage**: Lưu JWT token trong localStorage
- ✅ **Session Check**: Kiểm tra đăng nhập khi load trang
- ✅ **Link to Register**: Link đến trang đăng ký

## Tính năng trang đăng ký

- ✅ **Responsive Design**: Hoạt động tốt trên desktop và mobile
- ✅ **Form Validation**: Kiểm tra tất cả các trường bắt buộc
- ✅ **Real-time Validation**: Kiểm tra lỗi ngay khi người dùng nhập
- ✅ **Password Strength**: Hiển thị độ mạnh của mật khẩu
- ✅ **Email Validation**: Kiểm tra định dạng email hợp lệ
- ✅ **Password Confirmation**: Xác nhận mật khẩu khớp nhau
- ✅ **Terms Agreement**: Yêu cầu đồng ý điều khoản sử dụng
- ✅ **Error Handling**: Hiển thị lỗi chi tiết cho từng trường
- ✅ **Success Feedback**: Thông báo thành công và redirect
- ✅ **Loading State**: Hiển thị trạng thái đang xử lý
- ✅ **Link to Login**: Link đến trang đăng nhập

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
├── register.html   # Trang đăng ký
└── dashboard.html  # Trang dashboard sau khi đăng nhập
```

## Lưu ý

- Trang login sử dụng API `/users/login` để xác thực
- JWT token được lưu trong localStorage
- Sau khi đăng nhập thành công, người dùng được chuyển đến `/dashboard.html`
- Nếu chưa có token, người dùng sẽ được redirect về trang login
