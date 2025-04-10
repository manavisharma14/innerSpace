import { useState } from 'react'

export default function AffirmationsPage() {
  const [customAffirmation, setCustomAffirmation] = useState('')

  const affirmations = [
    'I am enough as I am.',
    'I choose peace over worry.',
    'I am growing every day.',
    'My feelings are valid.',
    'I deserve kindness.'
  ]

  const handleAddAffirmation = () => {
    if (customAffirmation.trim() !== '') {
      affirmations.push(customAffirmation)
      setCustomAffirmation('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">My Affirmations</h1>

      <div className="mb-4 grid grid-cols-1 gap-4">
        {affirmations.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded bg-purple-50 text-center"
          >
            {item}
          </div>
        ))}
      </div>

      <input
        value={customAffirmation}
        onChange={(e) => setCustomAffirmation(e.target.value)}
        className="w-full border p-2 rounded mb-2"
        placeholder="Write your own affirmation..."
      />

      <button
        onClick={handleAddAffirmation}
        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full"
      >
        Add Affirmation
      </button>
    </div>
  )
}