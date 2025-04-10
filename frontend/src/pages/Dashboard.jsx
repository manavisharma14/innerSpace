export default function Dashboard() {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-purple-600">Your Dashboard</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border p-4 rounded">
            <h2 className="text-xl font-medium mb-2">Mood Trends</h2>
            <p>Graph here (future implementation)</p>
          </div>
  
          <div className="border p-4 rounded">
            <h2 className="text-xl font-medium mb-2">Energy Balance</h2>
            <p>Energy Givers vs Takers Chart</p>
          </div>
  
          <div className="border p-4 rounded">
            <h2 className="text-xl font-medium mb-2">Gratitude Cloud</h2>
            <p>Word Cloud of Gratitudes</p>
          </div>
  
          <div className="border p-4 rounded">
            <h2 className="text-xl font-medium mb-2">Self-Care Streak</h2>
            <p>Daily Streak Badge Display</p>
          </div>
        </div>
      </div>
    )
  }
  