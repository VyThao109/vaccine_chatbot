# VaxBot - Trợ lý ảo tư vấn Vaccine 🛡️

VaxBot là một ứng dụng web chatbot thông minh giúp người dùng tra cứu thông tin về vaccine, lịch tiêm chủng và các tác dụng phụ. Ứng dụng được xây dựng với giao diện hiện đại, tối ưu trải nghiệm người dùng (UX) và tích hợp các công nghệ Frontend mới nhất.

## 🚀 Công nghệ sử dụng

Dự án được xây dựng dựa trên **React + TypeScript + Vite**.

### Core

- **[React](https://react.dev/)**: Thư viện UI chính.
- **[TypeScript](https://www.typescriptlang.org/)**: Static type checking giúp code an toàn và dễ bảo trì.
- **[Vite](https://vitejs.dev/)**: Build tool tốc độ cao.

### State Management & API

- **[Redux Toolkit](https://redux-toolkit.js.org/)**: Quản lý Global State (Auth, Toast notification).
- **[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)**: Quản lý việc gọi API, Caching và đồng bộ dữ liệu server (Chat sessions, History).

### UI & Styling

- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework để style giao diện nhanh chóng.
- **[Framer Motion](https://www.framer.com/motion/)**: Tạo hiệu ứng chuyển động mượt mà (Toast, Dialog, Sidebar).
- **[React Icons](https://react-icons.github.io/react-icons/)**: Bộ icon đa dạng (Lucide, FontAwesome...).

### Utilities

- **[React Markdown](https://github.com/remarkjs/react-markdown)**: Hiển thị nội dung chat định dạng Markdown.
- **[Remark GFM & Breaks]**: Hỗ trợ xuống dòng và định dạng bảng, list chuẩn GitHub.

---

## ✨ Tính năng chính

### 🔐 Xác thực (Authentication)

- Đăng nhập / Đăng ký tài khoản.
- **Quên mật khẩu (Forgot Password)**: Gửi email khôi phục.
- **Tự động đăng nhập**: Cơ chế Persist Token.
- **Đăng xuất**: Xóa sạch Cache và State để bảo mật.

### 💬 Chatbot

- **Giao diện Chat**: Bong bóng chat (Bubble) phân biệt User/Bot.
- **Markdown Support**: Hiển thị câu trả lời của AI đẹp mắt (List, Bold, Italic...).
- **Xử lý tin nhắn dài**: Tự động thu gọn tin nhắn User nếu quá dài, có nút "Xem thêm".
- **Hiệu ứng gõ chữ (Typewriter)**: Tạo cảm giác tự nhiên khi vào trang.

### 📂 Quản lý đoạn chat (Session Management)

- **Sidebar**: Danh sách lịch sử chat, sắp xếp theo thời gian cập nhật gần nhất.
- **Thao tác**: Tạo đoạn chat mới, Xóa đoạn chat cũ (có Dialog xác nhận).
- **Responsive**: Sidebar tự động ẩn/hiện trên thiết bị di động.

### 👤 Quản lý tài khoản

- **User Menu**: Hiển thị Avatar (Initials), tên và email.
- **Đổi mật khẩu**: Dialog đổi mật khẩu ngay trên giao diện Chat.

### 🎨 UI/UX

- **Toast Notification**: Thông báo trạng thái (Success/Error) trượt từ góc màn hình.
- **Custom Dialog**: Các popup xác nhận đồng bộ giao diện.
- **Custom Scrollbar**: Thanh cuộn tùy chỉnh tinh tế.

---

## 🛠️ Cài đặt và Chạy dự án

1. **Clone dự án**
   ```bash
   git clone [https://github.com/VyThao109/vaccine_chatbot.git]
   cd vaxbot
   ```
2. **Cài đặt dependencies**
   npm install
  # hoặc
  yarn install 
3. **Thêm biến môi trường**
  Thêm biến môi trường API URL trong .env: VITE_REACT_APP_API_URL="..." 
4. **Chạy môi trường Dev**
  npm run dev
  Truy cập http://localhost:5173 để xem ứng dụng. 
5. **Build Production**
  npm run build
