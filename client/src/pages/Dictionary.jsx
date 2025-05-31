import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { fetchDictionary } from "../services/dictionaryService.js"; // import service

export default function Dictionary() {
  const [word, setWord] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!word.trim()) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const result = await fetchDictionary(word);
      setData(result);
    } catch (err) {
      setError(err.message || "Lỗi khi gọi API");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-semibold mb-6 text-center text-indigo-700">
        Look up dictionary
      </h1>

      <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter vocabulary"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="flex-grow border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition flex items-center justify-center"
          aria-label="Tìm kiếm"
        >
          <FaSearch />
        </button>
      </form>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {data && (
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-2xl font-semibold mb-2">{data.word}</h2>

          <div className="flex flex-wrap gap-3 mb-6">
            {(data.phonetics || []).map(
              (phon, i) =>
                phon.audio && (
                  <button
                    key={i}
                    onClick={() => new Audio(phon.audio).play()}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition"
                    type="button"
                    aria-label={`Phát âm ${phon.text || "audio"}`}
                  >
                    {phon.text || "🔊"}
                  </button>
                )
            )}
          </div>

          <div>
            {data.meanings.map((meaning, idx) => (
              <div key={idx} className="mb-6">
                <div className="font-bold italic text-indigo-600 mb-2">
                  {meaning.partOfSpeech}
                </div>
                {meaning.definitions.map((def, j) => (
                  <div
                    key={j}
                    className="pl-4 border-l-4 border-indigo-400 mb-4"
                  >
                    <p className="font-semibold">{def.definition}</p>
                    {def.example && (
                      <p className="italic text-gray-600 ml-4 mt-1">
                        "{def.example}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
