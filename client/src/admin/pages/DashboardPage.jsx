// src/admin/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getAllTopics } from "../services/topicService";
import { getAllLessons } from "../services/lessonService";
// import { LineChart, Line } from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#d0ed57",
];

export default function AdminDashboard() {
  const [topics, setTopics] = useState([]);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setTopics(await getAllTopics());
      setLessons(await getAllLessons());
    };
    fetchData();
  }, []);

  const lessonsByTopic = topics.map((topic) => ({
    name: topic.title,
    // value: lessons.filter((l) => (l.topic._id || l.topic) === topic._id).length,
    value: lessons.filter((l) => {
      if (!l.topic) return false;
      const topicId = typeof l.topic === "string" ? l.topic : l.topic._id;
      return topicId === topic._id;
    }).length,
  }));

  const levelCount = {};
  topics.forEach((t) => {
    if (!levelCount[t.levels]) levelCount[t.levels] = 0;
    levelCount[t.levels]++;
  });
  const levelData = Object.entries(levelCount).map(([level, count]) => ({
    name: level,
    value: count,
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-3xl font-bold text-indigo-600">
            {topics.length}
          </div>
          <div className="text-gray-500">Chủ đề</div>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-3xl font-bold text-green-600">
            {lessons.length}
          </div>
          <div className="text-gray-500">Bài học</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2 text-indigo-700">
            Số lượng bài học theo chủ đề
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={lessonsByTopic}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2 text-indigo-700">
            Tỷ lệ các level của chủ đề
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={levelData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {levelData.map((entry, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
