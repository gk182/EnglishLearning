export default function TopicModal({ open, onClose, onSubmit, form, setForm, editing }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">{editing ? 'Sửa chủ đề' : 'Thêm chủ đề'}</h2>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block font-medium mb-1">Tên chủ đề</label>
            <input
              name="title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Cấp độ</label>
            <input
              name="levels"
              value={form.levels}
              onChange={e => setForm({ ...form, levels: e.target.value })}
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
              onChange={e => setForm({ ...form, image: e.target.files[0] })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {editing ? 'Cập nhật' : 'Thêm'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Huỷ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}