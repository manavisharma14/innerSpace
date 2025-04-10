export default function Home() {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-nunito text-purple-500 mb-6">
          A gentle space to
          <br className="hidden sm:block" />
          <span className="text-pink-500"> reflect</span>, 
          <span className="text-purple-500"> recharge</span>, and 
          <span className="text-purple-400"> grow</span>.
        </h1>
  
        <p className="text-lg sm:text-xl text-gray-600 max-w-xl">
          Start your self-care journey with daily reflections powered by AI.
        </p>
  
        <button className="mt-8 bg-purple-500 hover:bg-purple-600 text-white font-medium px-6 py-3 rounded-full text-lg shadow-md transition">
          Begin Journaling
        </button>
      </div>
    )
  }
  