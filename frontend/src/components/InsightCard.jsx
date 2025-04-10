export default function InsightCard({ insight }) {
  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200 shadow-sm space-y-2">
      <h3 className="text-lg font-semibold text-purple-600">🧠 Your AI Reflection</h3>
      <p><strong>Emotion:</strong> {insight.emotion}</p>
      <p><strong>Pattern:</strong> {insight.pattern}</p>
      <p><strong>Suggestion:</strong> {insight.suggestion}</p>
      <p><strong>Reflection:</strong> {insight.reflection}</p>
      <p className="italic text-gray-600">“{insight.quote}”</p>
    </div>
  )
}
