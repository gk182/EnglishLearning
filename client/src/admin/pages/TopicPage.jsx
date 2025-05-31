import { useEffect, useState } from 'react';
import {
  getAllTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} from '../services/topicService';
import TopicModal from '../components/TopicModal';

// Modal component
<TopicModal/>

export default function TopicPage() {
  const [topics, setTopics] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', levels: '', image: null });
  const [editingId, setEditingId] = useState(null);

  const fetchTopics = async () => {
    const data = await getAllTopics();
    setTopics(data);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const openAddModal = () => {
    setShowModal(true);
    setEditingId(null);
    setForm({ title: '', levels: '', image: null });
  };

  const openEditModal = (topic) => {
    setEditingId(topic._id);
    setForm({
      title: topic.title,
      levels: topic.levels,
      image: null,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm({ title: '', levels: '', image: null });
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
    closeModal();
    fetchTopics();
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
          onClick={openAddModal}
        >
          + Thêm mới
        </button>

        <TopicModal
          open={showModal}
          onClose={closeModal}
          onSubmit={handleSubmit}
          form={form}
          setForm={setForm}
          editing={!!editingId}
        />

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
                  onClick={() => openEditModal(topic)}
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