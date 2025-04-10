export default function SelfCareMenu() {
    const activities = [
      'Drink Water',
      'Take a Walk',
      'Stretch',
      'Deep Breathing',
      'Listen to Music',
      'Journal',
      'Read a Book',
      'Call a Friend'
    ]
  
    return (
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-purple-600">Self Care Menu</h1>
        <div className="grid grid-cols-2 gap-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="p-4 border rounded text-center bg-purple-50 hover:bg-purple-100 cursor-pointer"
            >
              {activity}
            </div>
          ))}
        </div>
      </div>
    )
  }
  