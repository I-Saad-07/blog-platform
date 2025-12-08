import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth.js'
import { logout } from '../../store/authSlice.js'

function LogoutBtn() {
  const dispatch = useDispatch()

  const handleLogout = () => {
    try {
      authService.logout().then(() => {
        dispatch(logout())
      })
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="
        inline-flex items-center space-x-2
        px-5 py-2.5 rounded-lg
        text-base font-medium
        text-text-secondary
        hover:text-primary
        hover:bg-surface-light/50
        transition-all duration-200
        focus-ring
      "
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span>Logout</span>
    </button>
  )
}

export default LogoutBtn