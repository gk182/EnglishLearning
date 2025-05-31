export default function LessonModal({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  editing,
  topics,
}) {
  if (!open) return null;

  const addScriptField = () => {
    setForm({
      ...form,
      scripts: [...form.scripts, { text: "", audioUrl: "", public_id: "", file: null }],
    });
  };

  const removeScriptField = (idx) => {
    const newScripts = [...form.scripts];
    newScripts.splice(idx, 1);
    setForm({ ...form, scripts: newScripts });
  };

  const handleChange = (e, idx) => {
    const { name, value, files } = e.target;

    if (name === "audio") {
      const newAudio = [...form.audio];
      newAudio[idx] = files[0];
      setForm({ ...form, audio: newAudio });
    } else if (name === "texts") {
      const newTexts = [...form.texts];
      newTexts[idx] = value;
      setForm({ ...form, texts: newTexts });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleScriptChange = (e, idx) => {
    const { name, value, files } = e.target;
    const newScripts = [...form.scripts];
    if (name === "file") {
      newScripts[idx].file = files[0];
    } else if (name === "text") {
      newScripts[idx].text = value;
    }
    setForm({ ...form, scripts: newScripts });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">
          {editing ? "Sửa bài học" : "Thêm bài học"}
        </h2>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block font-medium mb-1">Tiêu đề bài học</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Chủ đề</label>
            <select
              name="topic"
              value={form.topic}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">-- Chọn chủ đề --</option>
              {topics.map((topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">
              Script (Text + Audio)
            </label>
            {form.scripts.map((script, idx) => (
              <div key={idx} className="mb-2 flex gap-2 items-center">
                <input
                  name="text"
                  value={script.text}
                  onChange={(e) => handleScriptChange(e, idx)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Nhập đoạn văn"
                  required
                />
                <input
                  name="file"
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleScriptChange(e, idx)}
                  className="px-2 py-1 border rounded-lg"
                />
                {script.file ? (
                  <span className="text-xs text-gray-500 truncate max-w-[120px]">{script.file.name}</span>
                ) : script.audioUrl ? (
                  <audio controls src={script.audioUrl} className="w-24" />
                ) : null}
                {form.scripts.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500 text-lg px-2"
                    onClick={() => removeScriptField(idx)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addScriptField}
              className="text-sm text-indigo-600 hover:underline mt-1"
            >
              + Thêm dòng
            </button>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {editing ? "Cập nhật" : "Thêm mới"}
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