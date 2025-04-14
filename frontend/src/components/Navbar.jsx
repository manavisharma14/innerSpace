import { auth, provider } from "../firebase"
import { signInWithPopup } from "firebase/auth"
import { useState } from "react"
import logo from "../assets/logoreflectai.png"
import { Link } from "react-router-dom"

function Navbar() {
  const [user, setUser] = useState(null)

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      setUser(result.user)
      console.log("User logged in:", result.user)
      console.log("User ID:", result.user.uid)
  
      // Optional: Store it for backend usage
      localStorage.setItem("user_id", result.user.uid)
    } catch (err) {
      console.error("Login failed", err)
    }
  }
  
  

  const handleLogout = () => {
    auth.signOut()
    setUser(null)
  }

  return (
    <header className="w-full py-6 sticky top-0 z-50 ">
      <div className="w-full h-32 max-w-screen-2xl mx-auto px-10 flex justify-between items-center rounded-full bg-white py-5 px-8 shadow-xl">

        {/* Logo */}
        <div>
          <img 
            src={logo} 
            alt="ReflectAI Logo" 
            className="w-32 h-auto object-contain" 
          />
        </div>

        {/* Navigation Links */}


<nav className="hidden md:flex gap-10 text-gray-700 font-medium text-lg">
  <Link to="/">AI Journal</Link>
  <Link to="/weekly-reflection">Weekly Reflection</Link>
  <Link to="#">Reviews</Link>
  <Link to="#">Guides</Link>
</nav>


        {/* User Section */}
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
                <span className="text-sm text-gray-600">Hi, {user.displayName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-purple-600 font-medium text-base"
              >
                Log Out
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full font-medium text-base"
            >
              Log In
            </button>
          )}

        </div>
      </div>
    </header>
  )
}

export default Navbar
