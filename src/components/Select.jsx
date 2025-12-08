import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {

    const id = useId()

  return (
    <div className='w-full space-y-2'>
    {label && (
        <label htmlFor={id} className='text-sm font-medium text-text-primary'>
            {label}
        </label>
    )}
    <select
        {...props}
        id={id}
        ref={ref}
        className={`
            w-full px-4 py-3 rounded-lg
            bg-background border border-border
            text-text-primary
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
        `}
    >
        {options?.map((option) => (
            <option 
                key={option.value} 
                value={option.value}
                className="bg-background text-text-primary"
            >
                {option.label}
            </option>
        ))}
    </select>
    </div>
  )
}

export default React.forwardRef(Select)