import React from 'react'

export const Badge = ({ children, status = 'primary', className = '' }) => {
  const styles = {
    primary: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    secondary: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    danger: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase ${styles[status]} ${className}`}>
      {children}
    </span>
  )
}
