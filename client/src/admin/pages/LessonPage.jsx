import { useEffect, useState } from "react";
import {
  getAllLessons,
  createLesson,
  updateLesson,
  deleteLesson,
} from "../services/lessonService";
import { getAllTopics } from "../services/topicService";
import LessonModal from "../components/LessonModal";

// Modal component cho Lesson
<LessonModal/>

export default function LessonPage() {
  const [lessons, setLessons] = useState([]);
  const [topics, setTopics] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    topic: "",
    scripts: [
      { text: "", audioUrl: "", public_id: "", file: null }
    ],
  });
  const [editingId, setEditingId] = useState(null);

  const fetchLessons = async () => {
    const data = await getAllLessons();
    setLessons(data);
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getAllTopics();
        setTopics(data);
      } catch (err) {
        console.error("Không thể tải danh sách chủ đề:", err);
      }
    };

    fetchLessons();
    fetchTopics();
  }, []);

  const openAddModal = () => {
    setShowModal(true);
    setEditingId(null);
    setForm({
      title: "",
      topic: "",
      scripts: [
        { text: "", audioUrl: "", public_id: "", file: null }
      ],
    });
  };

  const openEditModal = (lesson) => {
    setEditingId(lesson._id);
    setForm({
      title: lesson.title,
      topic: lesson.topic._id || lesson.topic,
      scripts: lesson.scripts.map((s) => ({
        text: s.text,
        audioUrl: s.audioUrl,
        public_id: s.public_id,
        file: null, // file mới nếu có
      })),
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm({ title: "", topic: "", scripts: [{ text: "", audioUrl: "", public_id: "", file: null }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("topic", form.topic);

    form.scripts.forEach((script, idx) => {
      formData.append("texts", script.text);
      // Nếu có file mới thì append file, không thì append audioUrl/public_id cũ
      if (script.file) {
        formData.append("audio", script.file);
        formData.append("audioUrls", ""); // Đánh dấu là file mới
        formData.append("public_ids", "");
      } else {
        formData.append("audio", ""); // Không có file mới
        formData.append("audioUrls", script.audioUrl || "");
        formData.append("public_ids", script.public_id || "");
      }
    });

    if (editingId) {
      await updateLesson(editingId, formData);
      alert("Cập nhật bài học thành công!");
    } else {
      await createLesson(formData);
      alert("Tạo bài học thành công!");
    }
    closeModal();
    fetchLessons();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá bài học này?")) {
      await deleteLesson(id);
      fetchLessons();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">
          Quản lý Bài học (Lesson)
        </h1>

        <button
          className="mb-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          onClick={openAddModal}
        >
          + Thêm bài học
        </button>

        <LessonModal
          open={showModal}
          onClose={closeModal}
          onSubmit={handleSubmit}
          form={form}
          setForm={setForm}
          editing={!!editingId}
          topics={topics}
        />

        <div className="grid grid-cols-1 gap-6">
          {lessons.map((lesson) => (
            <div key={lesson._id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl font-semibold">{lesson.title}</h2>
                  <p className="text-sm text-gray-600">
                    Chủ đề: {lesson.topic?.title || lesson.topic}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(lesson)}
                    className="text-indigo-600 hover:underline"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(lesson._id)}
                    className="text-red-500 hover:underline"
                  >
                    Xoá
                  </button>
                </div>
              </div>
              <div className="space-y-2 mt-2">
                {lesson.scripts.map((script, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <audio controls src={script.audioUrl} className="w-64" />
                    <span className="text-gray-700">{script.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {lessons.length === 0 && (
          <div className="mt-6 text-gray-500 text-center">
            Chưa có bài học nào.
          </div>
        )}
      </div>
    </div>
  );
}
