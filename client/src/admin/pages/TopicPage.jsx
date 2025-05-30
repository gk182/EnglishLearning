// src/pages/admin/TopicPage.jsx
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

  const fetchTopics = async () => {
    const data = await getAllTopics();
    setTopics(data);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

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

  const handleEdit = (topic) => {
    setEditingId(topic._id);
    setForm({
      title: topic.title,
      levels: topic.levels,
      image: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá topic này?')) {
      await deleteTopic(id);
      fetchTopics();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Quản lý Chủ đề (Topic)</h1>

        <button
          className="mb-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setForm({ title: '', levels: '', image: null });
          }}
        >
          + Thêm mới
        </button>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="bg-white p-6 rounded-lg shadow-md mb-8"
          >
            <div className="mb-4">
              <label className="block font-medium mb-1">Tên chủ đề</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Cấp độ</label>
              <input
                name="levels"
                value={form.levels}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Ảnh đại diện</label>
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                {editingId ? 'Cập nhật' : 'Thêm'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setForm({ title: '', levels: '', image: null });
                }}
                className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Huỷ
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic) => (
            <div
              key={topic._id}
              className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {topic.imgUrl && (
                  <img
                    src={topic.imgUrl}
                    alt={topic.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                )}
                <div>
                  <div className="text-lg font-semibold">{topic.title}</div>
                  <div className="text-sm text-gray-600">Level: {topic.levels}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <button
                  onClick={() => handleEdit(topic)}
                  className="text-indigo-600 hover:underline"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(topic._id)}
                  className="text-red-500 hover:underline"
                >
                  Xoá
                </button>
              </div>
            </div>
          ))}
        </div>

        {topics.length === 0 && (
          <div className="mt-6 text-gray-500 text-center">Chưa có chủ đề nào.</div>
        )}
      </div>
    </div>
  );
}
