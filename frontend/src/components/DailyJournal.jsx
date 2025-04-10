// DailyJournal.jsx
import { useState } from 'react'

export default function DailyJournal() {
    const [gratitude, setGratitude] = useState("")
  const [physicalState, setPhysicalState] = useState('')
  const [selfCare, setSelfCare] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = () => {
    const journalEntry = {
      gratitudes,
      physicalState,
      selfCare,
      notes,
      createdAt: new Date().toISOString()
    }

    console.log('Journal Entry:', journalEntry)
    // send to firestore or api endpoint
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">Daily Journal</h1>

      <div className="mb-4">
  <p className="mb-2 font-medium">What am I grateful for today?</p>
  <input
    value={gratitude}
    onChange={(e) => setGratitude(e.target.value)}
    className="w-full mb-3 px-4 py-3 rounded-2xl bg-purple-100/40 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 transition shadow-inner backdrop-blur-md"
    placeholder="Gratitude..."
  />
</div>


      <div className="mb-4">
        <p className="mb-2 font-medium">How I'm Feeling Physically:</p>
        <input
          value={physicalState}
          onChange={(e) => setPhysicalState(e.target.value)}
          className="w-full mb-3 px-4 py-3 rounded-2xl bg-purple-100/40 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 transition shadow-inner backdrop-blur-md"
          placeholder="Tired? Energetic? Need Water?"
        />
      </div>

      <div className="mb-4">
        <p className="mb-2 font-medium">Self Care I Did Today:</p>
        <input
          value={selfCare}
          onChange={(e) => setSelfCare(e.target.value)}
          className="w-full mb-3 px-4 py-3 rounded-2xl bg-purple-100/40 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 transition shadow-inner backdrop-blur-md"
          placeholder="Shower, Skincare, Walk, Rest..."
        />
      </div>

      <div className="mb-4">
        <p className="mb-2 font-medium">Notes / Journal Dump:</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full mb-3 px-4 py-3 rounded-2xl bg-purple-100/40 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 transition shadow-inner backdrop-blur-md h-40"
          placeholder="Free space to write, doodle or vent..."
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full transition"
      >
        Save Journal
      </button>
    </div>
  )
}
