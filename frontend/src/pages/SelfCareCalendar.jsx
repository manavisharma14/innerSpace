import { useState, useEffect } from 'react'

export default function SelfCareCalendar() {
    const [markedEntries, setMarkedEntries] = useState([]) 
  const [selectedEntry, setSelectedEntry] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:8000/journal/')
      const data = await res.json()
  
      // Old:
      // const datesOnly = data.map((entry) => entry.date)
      // setMarkedDates(datesOnly)
  
      // New:
      setMarkedEntries(data)
    }
  
    fetchData()
  }, [])

  
  

  const handleDayClick = async (dateStr) => {
    if (markedDates.includes(dateStr)) {
      const res = await fetch(`http://localhost:8000/journal/${dateStr}`)
      const data = await res.json()
      setSelectedEntry(data)
    }
  }

  const generateCalendar = () => {
    const today = new Date()
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

  
    return [...Array(daysInMonth)].map((_, index) => {
      const day = index + 1
      const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  
      const entryData = markedEntries.find((entry) => entry.date === dateStr)
      const isMarked = !!entryData
  
      return (
        <div
          key={day}
          onClick={() => entryData && setSelectedEntry(entryData)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition
            ${isMarked ? 'bg-purple-400 text-white hover:scale-110' : 'bg-purple-100 text-purple-700'}
          `}
        >
          {day}
        </div>
      )
    })
  }
  

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Self Care Calendar</h1>

      <div className="grid grid-cols-7 gap-2">{generateCalendar()}</div>

      {selectedEntry && (
        <div className="bg-purple-100/50 mt-6 p-4 rounded-xl shadow-lg backdrop-blur-md">
          <h2 className="font-bold text-purple-600 mb-2">Your Entry for {selectedEntry.date}</h2>
          <p><span className="font-semibold">Gratitude:</span> {selectedEntry.gratitude}</p>
          <p><span className="font-semibold">Mood:</span> {selectedEntry.mood}</p>
          <p><span className="font-semibold">Self Care:</span> {selectedEntry.self_care}</p>
          <p><span className="font-semibold">Notes:</span> {selectedEntry.notes}</p>
        </div>
      )}
    </div>
  )
}
