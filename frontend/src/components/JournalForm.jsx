import { useState } from "react"
import InsightCard from "./InsightCard"

export default function JournalForm() {
  const [entry, setEntry] = useState("")
  const [insight, setInsight] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post("/reflect", { text: entry })
    setInsight(res.data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows="5"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="How was your day?"
        />
        <button className="bg-purple-600 text-white px-4 py-2 rounded">Reflect</button>
      </form>

      {insight && <InsightCard insight={insight} />}
    </div>
  )
}
