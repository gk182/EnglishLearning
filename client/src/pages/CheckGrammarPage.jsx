import React, { useState } from 'react';

export default function CheckGrammarPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckGrammar = async () => {
    if (!text.trim()) return alert('Please enter the text to check.');

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Giả lập gọi API, thay bằng API thật khi có
      await new Promise((r) => setTimeout(r, 1500));

      // Giả lập kết quả kiểm tra
      const fakeResult = {
        correctedText: text.replace(/teh/g, 'the'),
        errors: [{ word: 'teh', message: 'Spelling wrong, should be "the"' }],
      };

      setResult(fakeResult);
    } catch {
      setError('Có lỗi xảy ra khi kiểm tra ngữ pháp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-indigo-700">
        Check English grammar
      </h1>

      <textarea
        className="w-full border border-gray-300 rounded p-4 mb-4 resize-y min-h-[150px]"
        placeholder="Enter English paragraph to check ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleCheckGrammar}
        disabled={loading}
        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? 'Examining ...' : 'Check grammar'}
      </button>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {result && (
        <div className="mt-6 bg-indigo-50 p-4 rounded border border-indigo-200">
          <h2 className="text-xl font-semibold mb-2">Results of editing:</h2>
          <p className="mb-4 whitespace-pre-wrap">{result.correctedText}</p>

          {result.errors.length > 0 ? (
            <>
              <h3 className="font-semibold mb-1">Error found:</h3>
              <ul className="list-disc list-inside text-red-700">
                {result.errors.map((err, i) => (
                  <li key={i}>
                    <strong>{err.word}:</strong> {err.message}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-green-700">No grammatical error found.</p>
          )}
        </div>
      )}
    </div>
  );
}
