import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"


const moods = [
  { name: "Smiling", file: "smiling.png" },
  { name: "Sad / Disappointed", file: "sad-disappointed.png" },
  { name: "Worried / Anxious", file: "worried-anxious.png" },
  { name: "Excited / Joyful", file: "excited-joyful.png" },
  { name: "Frustrated / Confused", file: "frusted-confused.png" },
  { name: "Playful", file: "playful.png" },
  { name: "Calm / Neutral", file: "calm-neutral.png" },
  { name: "Angry / Stressed", file: "angry-stressed.png" },
  { name: "Surprised / Shocked", file: "surprised-shocked.png" },
]

export default function MoodSelect() {
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  const handleContinue = () => {
    if (selected) {
      navigate("/journal", { state: { mood: selected } })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen flex flex-col items-center px-4 py-12"
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-purple-600 font-nunito mb-10 text-center">
        How are you feeling today?
      </h1>

      <div className="grid grid-cols-3 sm:grid-cols-3 gap-6 max-w-2xl">
        {moods.map((mood, index) => (
          <button
            key={index}
            className={`rounded-full p-1 transition-all duration-200 ${
              selected === mood.name
                ? "ring-4 ring-purple-500 scale-105 animate-pulse"
                : "hover:scale-105"
            }`}
            onClick={() => setSelected(mood.name)}
          >
            <img
              src={`/moods/${mood.file}`}
              alt={mood.name}
              className="w-24 h-24 rounded-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <p className="text-sm text-center mt-2 text-gray-600">{mood.name}</p>
          </button>
        ))}
      </div>

      <button
        onClick={handleContinue}
        disabled={!selected}
        className={`mt-10 px-6 py-3 rounded-full text-white font-medium text-lg transition ${
          selected
            ? "bg-purple-500 hover:bg-purple-600 shadow-md"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Continue to Journal
      </button>
    </motion.div>
  )
}
