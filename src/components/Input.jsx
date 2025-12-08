import React, { useId } from 'react'

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", as = "input", ...props },
  ref
) {
  const id = useId()

  const Component = as;

  return (
    <div className="w-full space-y-2">
      {label && (
        <label 
          className="inline-block text-sm font-medium text-text-primary"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <Component
        type={type}
        id={id}
        ref={ref}
        className={`
          w-full px-4 py-3 rounded-lg
          bg-background border border-border
          text-text-primary placeholder:text-text-secondary/50
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${as === 'textarea' ? 'resize-y min-h-[100px]' : ''}
          ${className}
        `}
        {...props}
      />
    </div>
  )
})

export default Input