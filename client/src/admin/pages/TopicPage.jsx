import { useEffect, useState } from 'react';
import {
  getAllTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} from '../services/topicService';

export default function TopicPage() {
  const [topics, setTopics] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', levels: '', image: null });
  const [editingId, setEditingId] = useState(null);

  // Fetch topics
  const fetchTopics = async () => {
    const data = await getAllTopics();
    setTopics(data);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Handle add/edit submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('levels', form.levels);
    if (form.image) formData.append('image', form.image);

    if (editingId) {
      await updateTopic(editingId, formData);
    } else {
      await createTopic(formData);
    }
    setShowForm(false);
    setEditingId(null);
    setForm({ title: '', levels: '', image: null });
    fetchTopics();
  };

  // Handle edit
  const handleEdit = (topic) => {
    setEditingId(topic._id);
    setForm({
      title: topic.title,
      levels: topic.levels,
      image: null, // Không set ảnh cũ, chỉ upload nếu chọn mới
    });
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa topic này?')) {
      await deleteTopic(id);
      fetchTopics();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Quản lý Topic</h1>
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => {
          setShowForm(true);
          setEditingId(null);
          setForm({ title: '', levels: '', image: null });
        }}
      >
        Thêm Topic
      </button>

      {/* Form thêm/sửa */}
      {showForm && (
        <form
          className="bg-gray-50 p-4 rounded shadow mb-6"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="mb-2">
            <label className="block mb-1 font-medium">Tên Topic</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Level</label>
            <input
              name="levels"
              value={form.levels}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Ảnh (chọn file)</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              type="submit"
            >
              {editingId ? 'Cập nhật' : 'Thêm'}
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setForm({ title: '', levels: '', image: null });
              }}
            >
              Hủy
            </button>
          </div>
        </form>
      )}

      {/* Danh sách topic */}
      <div className="bg-white rounded shadow divide-y">
        {topics.length === 0 && (
          <div className="p-4 text-gray-500">Chưa có topic nào.</div>
        )}
        {topics.map((topic) => (
          <div
            key={topic._id}
            className="flex items-center justify-between p-4"
          >
            <div className="flex items-center gap-4">
              {topic.imgUrl && (
                <img
                  src={topic.imgUrl}
                  alt={topic.title}
                  className="w-12 h-12 object-cover rounded"
                />
              )}
              <div>
                <div className="font-semibold">{topic.title}</div>
                <div className="text-sm text-gray-500">Level: {topic.levels}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="text-green-600 hover:underline"
                onClick={() => handleEdit(topic)}
              >
                Sửa
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleDelete(topic._id)}
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
