import { useState } from 'react'

export default function SelfCareCalendar({ markedEntries = [] }) {
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const formatDateKansas = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const generateCalendar = () => {
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()

    return [...Array(daysInMonth)].map((_, index) => {
      const day = index + 1
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const dateStr = formatDateKansas(date)

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

      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-purple-600 font-semibold">{'<'}</button>
        <h2 className="text-xl font-bold text-purple-600">
          {currentMonth.toLocaleString('default', { month: 'long', timeZone: 'America/Chicago' })} {currentMonth.getFullYear()}
        </h2>
        <button onClick={handleNextMonth} className="text-purple-600 font-semibold">{'>'}</button>
      </div>

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
