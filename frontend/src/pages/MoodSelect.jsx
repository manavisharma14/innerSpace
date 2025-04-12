import { useState } from "react"
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
      className="min-h-screen flex flex-col items-center px-4 py-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-purple-600 font-nunito mb-10 text-center">
        How are you feeling today?
      </h1>

      <div className="grid grid-cols-3 sm:grid-cols-3 gap-6 max-w-2xl">
        {moods.map((mood, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-full p-1 transition-all duration-200 ${
              selected === mood.name
                ? "ring-4 ring-purple-500 scale-105 animate-pulse"
                : ""
            }`}
            onClick={() => setSelected(mood.name)}
          >
            <img
              src={`/moods/${mood.file}`}
              alt={mood.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <p className="text-sm text-center mt-2 text-gray-600">{mood.name}</p>
          </motion.button>
        ))}
      </div>

      <motion.button
        onClick={handleContinue}
        disabled={!selected}
        whileTap={{ scale: 0.95 }}
        className={`mt-10 px-6 py-3 rounded-full text-white font-medium text-lg transition ${
          selected
            ? "bg-purple-500 hover:bg-purple-600 shadow-md"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Continue to Journal
      </motion.button>
    </motion.div>
  )
}
