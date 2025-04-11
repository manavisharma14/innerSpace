import './index.css'
import 'animate.css';

//import InsightCard from './componnets/InsightCard'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MoodSelect from './pages/MoodSelect'
import DailyJournal from './components/DailyJournal'
import SelfCareCalendar from './pages/SelfCareCalendar'
//import WeeklyReflection from './components/WeeklyReflection'
//import SelfCareMenu from './components/SelfCareMenu'
//import AffirmationsPage from './components/AffirmationsPage'


function App() {
  return (
    <div className='bg-gradient-to-br from-pink-50 via-purple-50'>
            <Navbar />
            <Home />
            <MoodSelect />
            <DailyJournal />
            <SelfCareCalendar />



      </div>


  )
}

export default App
