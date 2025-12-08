import React from 'react'

function Button({ 
    children,
    type = "button",
    bgColor = "bg-gradient-primary",
    textColor = "text-white",
    className = "",
    ...props
}) {
  return (
    <button 
      type={type} 
      className={`
        px-6 py-3 rounded-xl font-medium
        transition-all duration-200
        hover:shadow-lg active:scale-95
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
        disabled:opacity-50 disabled:cursor-not-allowed
        ${bgColor} ${textColor} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button