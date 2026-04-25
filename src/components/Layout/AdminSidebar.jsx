import { NavLink } from 'react-router-dom'
import { Home, List, PlusCircle, BarChart3, Settings, LogOut } from 'lucide-react'

const items = [
  { to: '/admin/dashboard', label: 'Overview', icon: Home },
  { to: '/admin/events', label: 'Manage Events', icon: List },
  { to: '/admin/create', label: 'New Event', icon: PlusCircle },
  { to: '/admin/reports', label: 'Analytics', icon: BarChart3 }
]

export const AdminSidebar = () => (
  <aside className="w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col hidden lg:flex">
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-200 dark:shadow-none">A</div>
        <div className="leading-none">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin</h1>
          <p className="text-xs text-gray-400 font-medium">Control Center</p>
        </div>
      </div>
      
      <nav className="space-y-1.5">
        {items.map(i => (
          <NavLink
            key={i.to}
            to={i.to}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
              ${isActive 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' 
                : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-400'}
            `}
          >
            <i.icon size={20} />
            {i.label}
          </NavLink>
        ))}
      </nav>
    </div>

    <div className="mt-auto p-8 border-t border-gray-50 dark:border-gray-800">
       <button className="flex items-center gap-3 px-4 py-3 w-full text-sm font-bold text-gray-400 hover:text-red-500 transition-colors">
         <LogOut size={20} />
         Sign Out
       </button>
    </div>
  </aside>
)
