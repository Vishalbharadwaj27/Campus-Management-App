import { NavLink } from 'react-router-dom'
import { Calendar, UserCheck, LayoutGrid, Ticket } from 'lucide-react'

const items = [
  { to: '/student/events', label: 'Browse', icon: LayoutGrid },
  { to: '/student/my-events', label: 'My Tickets', icon: Ticket }
]

export const StudentNavbar = () => (
  <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-100 dark:border-gray-800">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white anonymous">Campus Event Management</span>
      </div>
      
      <nav className="flex items-center gap-1">
        {items.map(i => (
          <NavLink 
            key={i.to} 
            to={i.to}
            className={({ isActive }) => `
              flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all
              ${isActive 
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' 
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400'}
            `}
          >
            <i.icon size={18} />
            {i.label}
          </NavLink>
        ))}
      </nav>
    </div>
  </header>
)
