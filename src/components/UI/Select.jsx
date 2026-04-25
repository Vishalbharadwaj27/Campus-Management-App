import React, { forwardRef } from 'react'

export const Select = forwardRef(({ label, error, options = [], ...props }, ref) => {
  return (
    <div className="w-full space-y-2">
      {label && <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">{label}</label>}
      <select
        ref={ref}
        className={`
          w-full px-5 py-3 rounded-2xl bg-white dark:bg-gray-800 border-2 transition-all outline-none
          appearance-none font-medium
          ${error 
            ? 'border-rose-500 focus:border-rose-600' 
            : 'border-gray-100 dark:border-gray-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'}
        `}
        {...props}
      >
        <option value="" disabled>Select an option</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-sm font-semibold text-rose-500 ml-1">{error}</p>}
    </div>
  )
})

Select.displayName = 'Select'