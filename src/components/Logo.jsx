import React from 'react'

function Logo({ width = "100px" }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </div>
      <span className="text-xl font-bold text-text-primary">DevUI<span className="text-primary">Blog</span></span>
    </div>
  )
}

export default Logo
