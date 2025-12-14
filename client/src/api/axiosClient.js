import axios from 'axios';

// Đây mới là chỗ dùng import.meta.env đúng nè
// Logic: Nếu có biến môi trường VITE_API_URL (trên Vercel) thì dùng nó
// Nếu không có (đang chạy local máy nhà mà lười chỉnh .env) thì fallback về localhost
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000'; 

const axiosClient = axios.create({
    baseURL: baseURL,
    // NOTE: không ép Content-Type ở đây — để axios/浏览器 tự set đúng (multipart boundary khi dùng FormData)
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

export default axiosClient;