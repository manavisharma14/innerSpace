import { auth, provider } from "../firebase"
import { signInWithPopup } from "firebase/auth"
import { useState } from "react"
import logo from "../assets/logoreflectai.png"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

function Navbar() {
  const [user, setUser] = useState(null)

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      setUser(result.user)
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
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-[#fdf2f8]/80 backdrop-blur-md shadow-sm px-6 sm:px-10"
    >
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center py-4">

        {/* Logo */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          src={logo}
          alt="ReflectAI Logo"
          className="w-28 h-auto object-contain"
        />

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium text-base">
          <Link to="/">Home</Link>
          <Link to="/weekly-reflection">Weekly Reflection</Link>
        </nav>

        {/* Auth Section */}
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full border"
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
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleLogin}
              className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-full font-medium text-sm"
            >
              Log In
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  )
}

export default Navbar
