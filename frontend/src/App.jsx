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
      //const res = await fetch('https://innerspace-backend.onrender.com/journal/')
      const res = await fetch(`${API_URL}/journal/`)
      const data = await res.json()
      setMarkedEntries(data)
    }
    fetchData()
  }, [])

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
