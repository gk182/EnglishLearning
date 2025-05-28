// pages/listen.jsx
import React, { useEffect, useState } from 'react';
import { getAllTopics } from '../services/topic.js';

export default function ListenPage() {
  const [topics, setTopics] = useState([]);

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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">All topics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topics.map(({ _id, title, levels, lessons, type, img }) => (
          <div key={_id} className="flex gap-4 p-4 bg-white rounded shadow-sm hover:shadow-md transition cursor-pointer">
            <img src={img} alt={title} className="w-24 h-24 object-cover rounded" loading="lazy" />
            <div className="flex flex-col justify-center">
              <a href="#" className="text-blue-600 font-semibold text-lg hover:underline">{title}</a>
              <p className="text-sm text-gray-600">Levels: {levels}</p>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                {type === "audio" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v16l-12-3z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
                {lessons} lessons
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
