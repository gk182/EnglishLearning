import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/DashboardPage';
import Topics from './pages/TopicPage';
import Lessons from './pages/LessonPage';
import AdminLayout from './components/AdminLayout';

export default function AdminRoutes({ }) {

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/lessons" element={<Lessons />} />
        {/* <Route path="/users" element={<Users />} /> */}

      </Routes>
    </AdminLayout>
  );
}
