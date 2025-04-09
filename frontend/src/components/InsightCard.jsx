export default function InsightCard({ insight }) {
    return (
      <div className="bg-white p-4 rounded shadow-md space-y-2">
        <p><strong>Emotion:</strong> {insight.emotion}</p>
        <p><strong>Pattern:</strong> {insight.pattern}</p>
        <p><strong>Suggestion:</strong> {insight.suggestion}</p>
        <p><strong>Reflection:</strong> {insight.reflection}</p>
        <p className="italic text-purple-600">“{insight.quote}”</p>
      </div>
    )
  }
  