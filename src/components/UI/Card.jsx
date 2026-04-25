import React from 'react'

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${className}`}>
      {children}
    </div>
  )
}