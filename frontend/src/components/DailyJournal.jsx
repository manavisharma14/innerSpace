import { useState } from 'react'
import wakeup from '../assets/wakeup.png'
import sleep from '../assets/sleep.png'
import water from '../assets/water.png'

export default function DailyJournal() {
  const [gratitude, setGratitude] = useState('')
  const [physicalState, setPhysicalState] = useState('')
  const [selfCare, setSelfCare] = useState('')
  const [notes, setNotes] = useState('')

  const [task, setTask] = useState('')
  const [taskStatus, setTaskStatus] = useState('yes')

  const [wakeUpTime, setWakeUpTime] = useState('')
  const [sleepTime, setSleepTime] = useState('')
  const [waterIntake, setWaterIntake] = useState('yes')

  const handleSubmit = async () => {
    const today = new Date().toISOString().slice(0, 10)

    const newEntry = {
      user_id: 'test_user',
      date: today,
      gratitude,
      mood: physicalState,
      self_care: selfCare,
      notes,
      task,
      taskStatus,
      wakeUpTime,
      sleepTime,
      waterIntake,
    }

    try {
      const response = await fetch('http://localhost:8000/journal/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      })

      if (response.ok) {
        alert('Journal entry saved successfully!')
        setGratitude('')
        setPhysicalState('')
        setSelfCare('')
        setNotes('')
        setTask('')
        setTaskStatus('yes')
        setWakeUpTime('')
        setSleepTime('')
        setWaterIntake('yes')
      } else {
        alert('Failed to save journal entry.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Server error.')
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-10 text-purple-600 text-center">
        Daily Journal
      </h1>

      <div className="flex flex-col md:flex-row gap-16 items-center justify-center">

        {/* LEFT */}
        <div className="w-full md:w-1/2 space-y-4">
          <input
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            className="w-full px-4 py-2 rounded-2xl bg-purple-100/40 text-sm shadow-inner"
            placeholder="What are you grateful for today?"
          />
          <input
            value={physicalState}
            onChange={(e) => setPhysicalState(e.target.value)}
            className="w-full px-4 py-2 rounded-2xl bg-purple-100/40 text-sm shadow-inner"
            placeholder="How are you feeling physically?"
          />
          <input
            value={selfCare}
            onChange={(e) => setSelfCare(e.target.value)}
            className="w-full px-4 py-2 rounded-2xl bg-purple-100/40 text-sm shadow-inner"
            placeholder="Self care you did today?"
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 rounded-2xl bg-purple-100/40 text-sm h-24 shadow-inner"
            placeholder="Free journal dump..."
          />

          {/* Task */}
          <input
  value={task}
  onChange={(e) => setTask(e.target.value)}
  className="w-full px-4 py-2 rounded-2xl bg-purple-100/40 text-sm shadow-inner"
  placeholder="What was your main task or goal today?"
/>

<div className="flex gap-4 mt-2">
  {['yes', 'no', 'maybe'].map((option) => (
    <button
      key={option}
      onClick={() => setTaskStatus(option)}
      className={`px-4 py-2 rounded-full border transition-all duration-200 ${
        taskStatus === option
          ? 'bg-purple-500 text-white shadow-md'
          : 'border-purple-300 text-purple-600 hover:border-purple-400'
      }`}
    >
      {option}
    </button>
  ))}
</div>

{taskStatus && (
  <p className="text-xs text-gray-500 mt-1">
    {taskStatus === 'yes'
      ? "Great job getting it done!"
      : taskStatus === 'no'
      ? "That's okay — tomorrow's another chance."
      : "Maybe some progress is still progress!"}
  </p>
)}

        </div>

        {/* Divider */}
        <div className="hidden md:block h-64 w-px bg-purple-200 opacity-50"></div>

        {/* RIGHT */}
        <div className="flex-1 space-y-14">
          {/* Wake */}
          <div className="flex justify-between items-center">
            <img
              src={wakeup}
              alt="Wake Up"
              className="h-44 object-contain cursor-pointer hover:scale-125 transition-all"
              onClick={() => document.getElementById('wakeUp').showPicker()}
            />
            <input
              type="time"
              value={wakeUpTime}
              onChange={(e) => setWakeUpTime(e.target.value)}
              id="wakeUp"
              className="px-4 py-3 w-24 text-center rounded-2xl bg-purple-100/40 shadow-inner"
            />
          </div>

          {/* Sleep */}
          <div className="flex justify-between items-center">
            <img
              src={sleep}
              alt="Sleep"
              className="h-44 object-contain cursor-pointer hover:scale-125 transition-all"
              onClick={() => document.getElementById('sleepTime').showPicker()}
            />
            <input
              type="time"
              value={sleepTime}
              onChange={(e) => setSleepTime(e.target.value)}
              id="sleepTime"
              className="px-4 py-3 w-24 text-center rounded-2xl bg-purple-100/40 shadow-inner"
            />
          </div>

          {/* Water */}
          <div className="flex justify-between items-center">
            <img
              src={water}
              alt="Water"
              className="h-44 object-contain cursor-pointer hover:scale-125 transition-all"
              onClick={() => {
                const next =
                  waterIntake === 'yes'
                    ? 'no'
                    : waterIntake === 'no'
                    ? 'maybe'
                    : 'yes'
                setWaterIntake(next)
              }}
            />
            <p className="text-lg font-medium text-right w-24">
              Drank water? <br />
              <span className="text-purple-600">{waterIntake}</span>
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full transition mt-10 mx-auto block"
      >
        Save Journal
      </button>
    </div>
  )
}
