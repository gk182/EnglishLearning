import Sidebar from "./Sidebar";
// import '../admin.scss';

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="admin-main ml-64 w-full p-6 bg-gray-100 min-h-screen">
        {children}
      </main>
    </div>
  );
}
