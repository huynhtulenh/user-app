const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Hàm gửi email chào mừng
const sendWelcomeEmail = async (email, name) => {
  const msg = {
    to: email,
    from: 'lenhht@runsystem.net', // 👈 thay bằng email đã xác thực trong SendGrid
    subject: 'Chào mừng bạn đến với ứng dụng Ghi chú!',
    text: `Xin chào ${name},\n\nCảm ơn bạn đã đăng ký tài khoản!`,
    html: `<h2>Xin chào ${name}!</h2><p>Cảm ơn bạn đã đăng ký tài khoản 😊</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Đã gửi email tới ${email}`);
  } catch (error) {
    console.error('❌ Gửi email thất bại:', error.response?.body || error.message);
  }
};
module.exports = {sendWelcomeEmail};