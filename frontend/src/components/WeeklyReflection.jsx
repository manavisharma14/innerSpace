// WeeklyReflection.jsx
import { useState } from 'react'

export default function WeeklyReflection() {
  const [bestMoment, setBestMoment] = useState('')
  const [proudOf, setProudOf] = useState('')
  const [challenges, setChallenges] = useState('')
  const [lessons, setLessons] = useState('')
  const [nextWeekGoal, setNextWeekGoal] = useState('')

  const user_id = localStorage.getItem('user_id') 

  const handleSubmit = () => {
    const reflectionEntry = {
      user_id,
      bestMoment,
      proudOf,
      challenges,
      lessons,
      nextWeekGoal,
      createdAt: new Date().toISOString()
    }

    console.log('Weekly Reflection:', reflectionEntry)
    // send to firestore or api endpoint
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">Weekly Reflection</h1>

      <div className="mb-4">
        <p className="mb-2 font-medium">Best Moment This Week:</p>
        <textarea
          value={bestMoment}
          onChange={(e) => setBestMoment(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Highlight your favorite memory"
        />
      </div>

      <div className="mb-4">
        <p className="mb-2 font-medium">One Thing I'm Proud Of:</p>
        <textarea
          value={proudOf}
          onChange={(e) => setProudOf(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Celebrate a small or big win"
        />
      </div>

      <div className="mb-4">
        <p className="mb-2 font-medium">Challenges I Faced:</p>
        <textarea
          value={challenges}
          onChange={(e) => setChallenges(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Write about the hard parts"
        />
      </div>

      <div className="mb-4">
        <p className="mb-2 font-medium">What I Learned About Myself:</p>
        <textarea
          value={lessons}
          onChange={(e) => setLessons(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Self-awareness insight"
        />
      </div>

      <div className="mb-4">
        <p className="mb-2 font-medium">How I Want to Show Up Next Week:</p>
        <textarea
          value={nextWeekGoal}
          onChange={(e) => setNextWeekGoal(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Set an intention or mindset"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full"
      >
        Save Reflection
      </button>
    </div>
  )
}
