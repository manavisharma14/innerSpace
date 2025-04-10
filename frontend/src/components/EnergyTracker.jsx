// EnergyTracker.jsx
import { useState } from 'react'

export default function EnergyTracker() {
  const [giver, setGiver] = useState('')
  const [taker, setTaker] = useState('')
  const [givers, setGivers] = useState([])
  const [takers, setTakers] = useState([])

  const handleAddGiver = () => {
    if (giver.trim() !== '') {
      setGivers([...givers, giver])
      setGiver('')
    }
  }

  const handleAddTaker = () => {
    if (taker.trim() !== '') {
      setTakers([...takers, taker])
      setTaker('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">Energy Tracker</h1>

      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">Energy Givers</h2>
        <ul className="mb-4 list-disc pl-5">
          {givers.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <input
          value={giver}
          onChange={(e) => setGiver(e.target.value)}
          className="w-full border p-2 rounded mb-2"
          placeholder="People, Places, Habits..."
        />

        <button
          onClick={handleAddGiver}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full"
        >
          Add Giver
        </button>
      </div>

      <div>
        <h2 className="text-xl font-medium mb-2">Energy Takers</h2>
        <ul className="mb-4 list-disc pl-5">
          {takers.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <input
          value={taker}
          onChange={(e) => setTaker(e.target.value)}
          className="w-full border p-2 rounded mb-2"
          placeholder="People, Places, Habits..."
        />

        <button
          onClick={handleAddTaker}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full"
        >
          Add Taker
        </button>
      </div>
    </div>
  )
}
