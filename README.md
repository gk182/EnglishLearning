# 🚀 Cài đặt Project Node.js

Hướng dẫn nhanh để cài đặt và chạy project trên máy bạn.

---

## 📦 Yêu cầu

- Node.js (phiên bản >= 14)  
- npm hoặc yarn  
- MongoDB (local hoặc cloud)

---

## ⚙️ Các bước cài đặt

1. Clone project từ GitHub:  
   ```bash
   git clone https://github.com/gk182/EnglishLearning.git
   cd EnglishLearning

2. Cài đặt dependencies:
   ```bash
    npm install
   
3. Cài đặt client dependencies:
   ```bash
   cd ./client/
   npm install
   
4. Cài đặt backend  dependencies:
   ```bash
   cd ../server/
   npm install

5. Tạo file cấu hình môi trường:
   ```bash
    cp .env.example .env
   
6. Cập nhật file .env với thông tin phù hợp, ví dụ:
   ```bash
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/your_database
   
6. Chạy project ở chế độ phát triển:
   ```bash
   cd .. (Đường dẫn thư mục chính)
    npm run dev
