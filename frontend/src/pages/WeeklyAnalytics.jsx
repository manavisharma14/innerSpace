import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#A78BFA', '#F472B6', '#F87171'];

export default function WeeklyAnalytics() {
  const [data, setData] = useState({
    moodEmotionTrend: [],
    moodPhysicalTrend: [],
    sleepTimes: [],
    taskCompletion: [],
    summary: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

      // Dynamic user_id based on env
      const user_id = import.meta.env.MODE === 'development'
        ? 'test_user'
        : localStorage.getItem('user_id')

      try {
        const res = await fetch(`${API_URL}/weekly-reflection/${user_id}?offset_weeks=-1`);

        if (!res.ok) throw new Error('Data not found')

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
        <p>Avg Sleep Time: <span className="font-semibold">{data.summary?.avgSleep || '-'}</span></p>
        <p>Avg Emotional Mood: <span className="font-semibold">{data.summary?.avgMoodEmotion || '-'}</span></p>
        <p>Avg Physical Mood: <span className="font-semibold">{data.summary?.avgMoodPhysical || '-'}</span></p>
      </div>

      {/* Mood Trends */}
      {[
        { title: "Emotional Mood Trend", data: data.moodEmotionTrend, color: COLORS[0] },

      ].map(({ title, data, color }, index) => (
        <div key={index} className='mx-auto max-w-7xl'>
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
      <div className="mx-auto max-w-7xl">
        <h2 className="text-xl font-semibold mb-2">Wake & Sleep Times</h2>
        <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data.sleepTimes}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="wakeUpTime" fill="#F472B6" name="Wake Up Time"/>
          <Bar dataKey="sleepTime" fill="#60A5FA" name="Sleep Time"/>
          <Bar dataKey="sleepDuration" fill="#A78BFA" name="Sleep Duration"/>
        </BarChart>
      </ResponsiveContainer>

      </div>

      {/* Task Completion */}
      <div>
        <h2 className="text-xl font-semibold mb-2 text-center">Task Completion Rate</h2>
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
