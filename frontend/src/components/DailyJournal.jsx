// DailyJournal.jsx
import { useState } from 'react'

export default function DailyJournal() {
  const [gratitude, setGratitude] = useState('')
  const [physicalState, setPhysicalState] = useState('')
  const [selfCare, setSelfCare] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = async () => {
    const today = new Date().toISOString().slice(0, 10)
  
    const newEntry = {
      user_id: "test_user", // Hardcoded for now
      date: today,
      gratitude,
      mood: physicalState,  // <-- map physicalState to mood
      self_care: selfCare,  // <-- correct key
      notes,
    }
  
    try {
      const response = await fetch('http://localhost:8000/journal/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      })
  
      if (response.ok) {
        alert('Journal entry saved successfully!')
        setGratitude('')
        setPhysicalState('')
        setSelfCare('')
        setNotes('')
      } else {
        alert('Failed to save journal entry.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Server error.')
    }
  }
  
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-10 text-purple-600 text-center">Daily Journal</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Prompts Section */}
        <div className="w-full md:w-1/2 text-purple-700 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">What am I grateful for today?</h2>
            <p className="text-sm text-gray-500">Think small wins, moments, people.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">How am I feeling physically?</h2>
            <p className="text-sm text-gray-500">Tired? Energetic? Need Water?</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Self Care I Did Today:</h2>
            <p className="text-sm text-gray-500">Shower, Walk, Skincare, Rest...</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Free Journal Dump:</h2>
            <p className="text-sm text-gray-500">Write anything on your mind.</p>
          </div>
        </div>

        {/* Inputs Section */}
        <div className="w-full md:w-1/2 space-y-4">
          <input
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            className="w-full mb-3 px-4 py-3 rounded-2xl bg-purple-100/40 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 transition shadow-inner backdrop-blur-md"
            placeholder="Gratitude..."
          />

          <input
            value={physicalState}
            onChange={(e) => setPhysicalState(e.target.value)}
            className="w-full mb-3 px-4 py-3 rounded-2xl bg-purple-100/40 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 transition shadow-inner backdrop-blur-md"
            placeholder="Tired? Energetic? Need Water?"
          />

          <input
            value={selfCare}
            onChange={(e) => setSelfCare(e.target.value)}
            className="w-full mb-3 px-4 py-3 rounded-2xl bg-purple-100/40 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 transition shadow-inner backdrop-blur-md"
            placeholder="Shower, Skincare, Walk, Rest..."
          />

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full mb-3 px-4 py-3 rounded-2xl bg-purple-100/40 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 transition shadow-inner backdrop-blur-md h-40"
            placeholder="Free space to write, doodle or vent..."
          />

          <button
            onClick={handleSubmit}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full transition"
          >
            Save Journal
          </button>
        </div>
      </div>
    </div>
  )
}
