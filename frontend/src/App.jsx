import './index.css'
import 'animate.css'

import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'  // REMOVE BrowserRouter

import Navbar from './components/Navbar'
import Home from './pages/Home'
import MoodSelect from './pages/MoodSelect'
import DailyJournal from './components/DailyJournal'
import SelfCareCalendar from './pages/SelfCareCalendar'
import WeeklyAnalytics from './pages/WeeklyAnalytics'


function App() {
  const [markedEntries, setMarkedEntries] = useState([])

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchData = async () => {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) {
        setMarkedEntries([]);  // CLEAR old data!
        return;
      }
  
      try {
        const res = await fetch(`${API_URL}/journal/user/${user_id}`);
        const data = await res.json();
        setMarkedEntries(data);
      } catch (error) {
        console.error("Error fetching user-specific journal entries:", error);
      }
    };
  
    fetchData();
  }, []);
  

  
  

  return (
    <div className='bg-gradient-to-br from-pink-50 via-purple-50'>
      <Navbar />

      <Routes>
        <Route path='/' element={
          <>
            <Home />
            <MoodSelect />
            <DailyJournal setMarkedEntries={setMarkedEntries} />
            <div id="calendar-section">
              <SelfCareCalendar markedEntries={markedEntries} />
            </div>
          </>
        } />

        <Route path='/weekly-reflection' element={<WeeklyAnalytics />} />
      </Routes>
    </div>
  )
}

export default App
