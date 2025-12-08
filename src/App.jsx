import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth.js"
import { login, logout } from "./store/authSlice.js"
import { Header } from "./components/index.js"
import { Footer } from "./components/index.js"
import { Outlet } from "react-router-dom"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .catch((error) => {
        dispatch(logout())
      })
      .finally(() => setLoading(false))
  }, [])

  // Loading state with modern spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-surface-light rounded-full"></div>
            <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <div>
            <p className="text-text-secondary text-lg font-medium">Loading</p>
            <p className="text-text-secondary/60 text-sm mt-1">Please wait...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App