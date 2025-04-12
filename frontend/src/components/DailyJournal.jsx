import { useState } from 'react'
import wakeup from '../assets/wakeup.png'
import sleep from '../assets/sleep.png'
import water from '../assets/water.png'

import { useLocation } from "react-router-dom"

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

  const [aiResponse, setAiResponse] = useState('')


  const location = useLocation()
  const mood = location.state?.mood || physicalState  // fallback

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
      // Save Journal Entry
      const response = await fetch('http://localhost:8000/journal/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      })

      if (response.ok) {
        alert('Journal entry saved successfully!')

        // Generate AI Analysis
        const analysisEntry = {
          gratitude,
          physicalState,  // this is the manually entered physical state
          selfCare,
          notes,
          task,
          taskStatus,
          wakeUpTime,
          sleepTime,
          waterIntake,
          mood,   // This is coming from MoodSelect screen
          createdAt: new Date().toISOString(),
        }
        
        

        const aiResponseFetch = await fetch('http://localhost:8000/analyze/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(analysisEntry),
        })

        if (aiResponseFetch.ok) {
          const data = await aiResponseFetch.json()
        
          if (data && data.reflection) {
            setAiResponse(data.reflection)
          } else {
            setAiResponse("Couldn't generate reflection today. Try again later!")
          }
        }
        

        // Reset Form
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

        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 space-y-4">
          <input value={gratitude} onChange={(e) => setGratitude(e.target.value)}
            className="w-full px-4 py-2 rounded-2xl bg-purple-100/40 text-sm shadow-inner"
            placeholder="What are you grateful for today?"
          />
          <input value={physicalState} onChange={(e) => setPhysicalState(e.target.value)}
            className="w-full px-4 py-2 rounded-2xl bg-purple-100/40 text-sm shadow-inner"
            placeholder="How are you feeling physically?"
          />
          <input value={selfCare} onChange={(e) => setSelfCare(e.target.value)}
            className="w-full px-4 py-2 rounded-2xl bg-purple-100/40 text-sm shadow-inner"
            placeholder="Self care you did today?"
          />
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 rounded-2xl bg-purple-100/40 text-sm h-24 shadow-inner"
            placeholder="Free journal dump..."
          />
          <input value={task} onChange={(e) => setTask(e.target.value)}
            className="w-full px-4 py-2 rounded-2xl bg-purple-100/40 text-sm shadow-inner"
            placeholder="What was your main task or goal today?"
          />

          <div className="flex gap-4 mt-2">
            {['yes', 'no', 'maybe'].map(option => (
              <button key={option} onClick={() => setTaskStatus(option)}
                className={`px-4 py-2 rounded-full border transition-all duration-200 ${taskStatus === option
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'border-purple-300 text-purple-600 hover:border-purple-400'
                  }`}>
                {option}
              </button>
            ))}
          </div>

          {taskStatus && (
            <p className="text-xs text-gray-500 mt-1">
              {taskStatus === 'yes' ? "Great job getting it done!"
                : taskStatus === 'no' ? "That's okay — tomorrow's another chance."
                  : "Maybe some progress is still progress!"}
            </p>
          )}
        </div>

        <div className="hidden md:block h-64 w-px bg-purple-200 opacity-50"></div>

        {/* RIGHT SIDE */}
        <div className="flex-1 space-y-14">
          {[{ label: "Wake Up", value: wakeUpTime, setValue: setWakeUpTime, src: wakeup, id: 'wakeUp' },
          { label: "Sleep", value: sleepTime, setValue: setSleepTime, src: sleep, id: 'sleepTime' }
          ].map(({ label, value, setValue, src, id }) => (
            <div key={label} className="flex justify-between items-center">
              <img src={src} alt={label}
                className="h-44 object-contain cursor-pointer hover:scale-125 transition-all"
                onClick={() => document.getElementById(id).showPicker()}
              />
              <input type="time" value={value} onChange={(e) => setValue(e.target.value)}
                id={id}
                className="px-4 py-3 w-24 text-center rounded-2xl bg-purple-100/40 shadow-inner"
              />
            </div>
          ))}

          <div className="flex justify-between items-center">
            <img src={water} alt="Water"
              className="h-44 object-contain cursor-pointer hover:scale-125 transition-all"
              onClick={() => {
                const next = waterIntake === 'yes' ? 'no' : waterIntake === 'no' ? 'maybe' : 'yes'
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

      <button onClick={handleSubmit}
        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full transition mt-10 mx-auto block">
        Save Journal
      </button>

      {aiResponse && (
        <div className="bg-purple-100/50 mt-10 p-6 rounded-2xl shadow-inner">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">AI Reflection</h2>
          {aiResponse.split('\n\n').map((section, idx) => (
            <p key={idx} className="text-gray-700 whitespace-pre-wrap">{section.replace(/\*\*/g, '')}</p>
          ))}
        </div>
      )}
    </div>
  )
}
