import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyBbiXdR6kH9PaQ_blZZOrI6HMLkxjWuXvo",
  authDomain: "reflectai-a2233.firebaseapp.com",
  projectId: "reflectai-a2233",
  storageBucket: "reflectai-a2233.appspot.com",
  messagingSenderId: "702990108478",
  appId: "1:702990108478:web:e70abd6585745eb1bcce6f",
  measurementId: "G-GQGSXLBDJG",
}

// Init Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

// Auth
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { app, auth, provider, analytics }
