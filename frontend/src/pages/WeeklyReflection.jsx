import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#A78BFA', '#F472B6', '#F87171'];

export default function WeeklyReflection() {
  const [data, setData] = useState({
    moodEmotionTrend: [],
    moodPhysicalTrend: [],
    sleepTimes: [],
    taskCompletion: [],
    summary: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      const user_id = localStorage.getItem('user_id') || 'test_user';  // fallback for testing

      try {
        const res = await fetch(`http://localhost:8000/weekly-reflection/${user_id}`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch weekly reflection data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 space-y-12">
      <h1 className="text-3xl font-bold text-center text-purple-700">
        Weekly Reflection
      </h1>

      {/* Weekly Summary Card */}
      <div className="bg-purple-100/40 rounded-xl shadow-md p-6 space-y-2 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-purple-700 mb-2">This Week's Summary</h2>
        <p>Avg Sleep Time: <span className="font-semibold">{data.summary.avgSleep || '-'}</span></p>
        <p>Avg Emotional Mood: <span className="font-semibold">{data.summary.avgMoodEmotion || '-'}</span></p>
        <p>Avg Physical Mood: <span className="font-semibold">{data.summary.avgMoodPhysical || '-'}</span></p>
        <p>Total Water Intake: <span className="font-semibold">{data.summary.totalWaterIntake || '-'}</span></p>
      </div>

      {/* Mood Trends */}
      {[
        { title: "Emotional Mood Trend", data: data.moodEmotionTrend, color: COLORS[0] },
        { title: "Physical Mood Trend", data: data.moodPhysicalTrend, color: COLORS[1] }
      ].map(({ title, data, color }, index) => (
        <div key={index}>
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="moodScore" stroke={color} strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}

      {/* Wake & Sleep Times */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Wake & Sleep Times</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.sleepTimes}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="wakeUpTime" fill="#F472B6" />
            <Bar dataKey="sleepTime" fill="#60A5FA" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Task Completion */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Task Completion Rate</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.taskCompletion}
              dataKey="value"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.taskCompletion.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
