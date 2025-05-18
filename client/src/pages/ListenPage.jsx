import React from 'react'

export default function ListenPage() {
    const topics = [
  {
    id: 1,
    title: "Short Stories",
    levels: "A1-C1",
    lessons: 289,
    type: "audio",
    img: "https://dailydictation.com/images/dd-stories.jpg",
  },
  {
    id: 2,
    title: "Conversations",
    levels: "A1-B1",
    lessons: 100,
    type: "audio",
    img: "https://dailydictation.com/images/dd-con.jpg",
  },
  {
    id: 3,
    title: "Stories for Kids",
    levels: "A2-B2",
    lessons: 13,
    type: "video",
    img: "https://dailydictation.com/images/dd-fairy-tales.jpeg",
  },
  {
    id: 4,
    title: "TOEIC Listening",
    levels: "A2-C1",
    lessons: 600,
    type: "audio",
    img: "https://dailydictation.com/images/dd-toeic.jpg",
  },
  {
    id: 5,
    title: "IELTS Listening",
    levels: "B1-C2",
    lessons: 328,
    type: "audio",
    img: "https://dailydictation.com/images/dd-ielts.jpg",
  },
  {
    id: 6,
    title: "YouTube",
    levels: "B1-C2",
    lessons: 167,
    type: "video",
    img: "https://dailydictation.com/images/dd-youtube.jpg",
  },
  {
    id: 7,
    title: "News",
    levels: "B1-C1",
    lessons: 148,
    type: "video",
    img: "https://dailydictation.com/images/dd-news2.jpeg",
  },
  {
    id: 8,
    title: "TED",
    levels: "C1-C2",
    lessons: 77,
    type: "video",
    img: "https://dailydictation.com/images/dd-ted.jpeg",
  },
  {
    id: 9,
    title: "TOEFL Listening",
    levels: "B1-C2",
    lessons: 54,
    type: "audio",
    img: "https://dailydictation.com/images/dd-toefl.jpg",
  },
  {
    id: 10,
    title: "IPA",
    levels: "A1",
    lessons: 42,
    type: "audio",
    img: "https://dailydictation.com/images/dd-ipa.jpeg",
  },
  {
    id: 11,
    title: "Numbers",
    levels: "A1",
    lessons: 9,
    type: "audio",
    img: "https://dailydictation.com/images/dd-numbers.jpg",
  },
  {
    id: 12,
    title: "Spelling Names",
    levels: "A1",
    lessons: 6,
    type: "audio",
    img: "https://dailydictation.com/images/dd-names.jpg",
  },
];
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">All topics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topics.map(({ id, title, levels, lessons, type, img }) => (
          <div key={id} className="flex gap-4 p-4 bg-white rounded shadow-sm hover:shadow-md transition cursor-pointer">
            <img
              src={img}
              alt={title}
              className="w-24 h-24 object-cover rounded"
              loading="lazy"
            />
            <div className="flex flex-col justify-center">
              <a href="#" className="text-blue-600 font-semibold text-lg hover:underline">
                {title}
              </a>
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