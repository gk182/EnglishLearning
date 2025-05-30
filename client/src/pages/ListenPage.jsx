// pages/listen.jsx
import React, { useEffect, useState } from 'react';
import { getAllTopics, getTopicById } from '../services/topic.js';

export default function ListenPage() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [userText, setUserText] = useState('');
  const [checkResult, setCheckResult] = useState(null);
  const [currentScriptIndex, setCurrentScriptIndex] = useState(0);
  const [wordResults, setWordResults] = useState([]); // Thêm state lưu kết quả từng từ

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getAllTopics();
        setTopics(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopics();
  }, []);

  const handleTopicClick = async (topicId) => {
    setSelectedLesson(null);
    setCheckResult(null);
    setUserText('');
    setCurrentScriptIndex(0);
    try {
      const topic = await getTopicById(topicId);
      setSelectedTopic(topic);
      setLessons(topic.lessons || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    setUserText('');
    setCheckResult(null);
    setCurrentScriptIndex(0);
  };

  const handleCheck = () => {
    if (
      !selectedLesson ||
      !selectedLesson.scripts ||
      !selectedLesson.scripts[currentScriptIndex]
    )
      return;
    const original = selectedLesson.scripts[currentScriptIndex].text.trim();
    const user = userText.trim();

    // So sánh từng từ
    const originalWords = original.split(/\s+/);
    const userWords = user.split(/\s+/);

    const results = originalWords.map((word, idx) => ({
      word,
      correct: userWords[idx] && userWords[idx].toLowerCase() === word.toLowerCase(),
    }));

    setWordResults(results);
    // Nếu tất cả đúng thì checkResult = true
    setCheckResult(results.every(r => r.correct));
  };

  const handlePrevScript = () => {
    setCheckResult(null);
    setUserText('');
    setCurrentScriptIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextScript = () => {
    setCheckResult(null);
    setUserText('');
    setCurrentScriptIndex((prev) =>
      Math.min(prev + 1, (selectedLesson?.scripts?.length || 1) - 1)
    );
  };

  const handleFinishScript = () => {
    // Nếu chưa phải script cuối thì chuyển tiếp, nếu là cuối thì có thể thông báo hoàn thành
    if (currentScriptIndex < (selectedLesson?.scripts?.length || 1) - 1) {
      handleNextScript();
    } else {
      alert('Bạn đã hoàn thành tất cả các script của lesson này!');
      setCheckResult(null);
      setUserText('');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">All topics</h1>
      {/* Danh sách topic */}
      {!selectedTopic && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topics.map(({ _id, title, levels, imgUrl }) => (
            <div
              key={_id}
              className="flex gap-4 p-4 bg-white rounded shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => handleTopicClick(_id)}
            >
              <img src={imgUrl} alt={title} className="w-24 h-24 object-cover rounded" loading="lazy" />
              <div className="flex flex-col justify-center">
                <span className="text-blue-600 font-semibold text-lg hover:underline">{title}</span>
                <p className="text-sm text-gray-600">Levels: {levels}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Danh sách lesson */}
      {selectedTopic && !selectedLesson && (
        <div>
          <button
            className="mb-4 text-indigo-600 hover:underline"
            onClick={() => setSelectedTopic(null)}
          >
            ← Back to topics
          </button>
          <h2 className="text-xl font-bold mb-4">{selectedTopic.title} - Lessons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {lessons.length === 0 && <p>No lessons found.</p>}
            {lessons.map((lesson) => (
              <div
                key={lesson._id}
                className="p-4 bg-white rounded shadow-sm hover:shadow-md transition cursor-pointer"
                onClick={() => handleLessonClick(lesson)}
              >
                <span className="text-indigo-700 font-semibold">{lesson.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Phần nghe và kiểm tra nghe đúng/sai cho từng script */}
      {selectedLesson && (
        <div>
          <button
            className="mb-4 text-indigo-600 hover:underline"
            onClick={() => setSelectedLesson(null)}
          >
            ← Back to lessons
          </button>
          <h3 className="text-lg font-bold mb-2">{selectedLesson.title}</h3>
          {selectedLesson.scripts && selectedLesson.scripts.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center   mb-2">
                <button
                  className="px-2 py-1 rounded mr-2"
                  onClick={handlePrevScript}
                  disabled={currentScriptIndex === 0}
                >
                  ←
                </button>
                <span>
                   {currentScriptIndex + 1} / {selectedLesson.scripts.length}
                </span>
                <button
                  className="px-2 py-1 rounded ml-2"
                  onClick={handleNextScript}
                  disabled={currentScriptIndex === selectedLesson.scripts.length - 1}
                >
                  →
                </button>
              </div>
              <audio
                controls
                src={selectedLesson.scripts[currentScriptIndex].audioUrl}
                key={selectedLesson.scripts[currentScriptIndex].audioUrl}
              />
            </div>
          )}
          <textarea
            className="w-full border rounded p-2 mb-2"
            rows={4}
            placeholder="Type what you hear..."
            value={userText}
            onChange={e => setUserText(e.target.value)}
          />
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            onClick={handleCheck}
          >
            Check
          </button>
          {checkResult !== null && (
            <div className={`mt-4 font-bold ${checkResult ? 'text-green-600' : 'text-red-600'}`}>
              {checkResult ? (
                <>
                  Correct!{' '}
                  <button
                    className="ml-2 px-2 py-1 rounded bg-green-200"
                    onClick={handleFinishScript}
                  >
                    {currentScriptIndex === selectedLesson.scripts.length - 1
                      ? 'Finish'
                      : 'Next Script →'}
                  </button>
                </>
              ) : (
                <>
                  Incorrect
                  <div className="mt-2">
                    {/* Hiển thị từng từ: đúng thì xanh, sai thì * */}
                    {wordResults.map((res, idx) =>
                      res.correct ? (
                        <span key={idx} className="text-green-600 font-bold"> {res.word} </span>
                      ) : (
                        <span key={idx} className="text-gray-400 font-bold"> {'*'.repeat(res.word.length)} </span>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
