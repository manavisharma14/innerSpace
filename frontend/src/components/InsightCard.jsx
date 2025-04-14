export default function InsightCard({ title, text }) {
  return (
    <div className="bg-purple-100/50 p-4 rounded-2xl shadow-inner">
      <h2 className="text-xl font-bold mb-2 text-purple-600">{title}</h2>
      <p className="text-gray-700 whitespace-pre-wrap">{text}</p>
    </div>
  )
}
