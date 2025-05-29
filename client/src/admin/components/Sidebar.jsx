// src/admin/components/Sidebar.jsx
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 h-screen">
      <h2 className="text-xl font-bold mb-6">Admin Menu</h2>
      <ul className="space-y-4">
        <li><Link to="/admin" className="hover:text-indigo-400">Dashboard</Link></li>
        <li><Link to="/admin/users" className="hover:text-indigo-400">Quản lý người dùng</Link></li>
        <li><Link to="/admin/logs" className="hover:text-indigo-400">Lịch sử hoạt động</Link></li>
      </ul>
    </aside>
  );
}
