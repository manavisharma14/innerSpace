import { useState } from 'react'

export default function TriggerTracker() {
  const [trigger, setTrigger] = useState('')
  const [triggers, setTriggers] = useState([])

  const handleAddTrigger = () => {
    if (trigger.trim() !== '') {
      setTriggers([...triggers, trigger])
      setTrigger('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">Trigger Tracker</h1>

      <ul className="mb-4 list-disc pl-5">
        {triggers.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <input
        value={trigger}
        onChange={(e) => setTrigger(e.target.value)}
        className="w-full border p-2 rounded mb-2"
        placeholder="Write a trigger or pattern..."
      />

      <button
        onClick={handleAddTrigger}
        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full"
      >
        Add Trigger
      </button>
    </div>
  )
}
