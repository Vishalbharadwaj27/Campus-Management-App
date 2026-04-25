import { ToastContainer } from './utils/toast'
import { useEffect } from 'react'
import { AdminSidebar } from './components/Layout/AdminSidebar'
import { StudentNavbar } from './components/Layout/StudentNavbar'
import { ThemeToggle } from './components/Layout/ThemeToggle'
import { useAuth } from './hooks/useAuth'
import { BrowserRouter, Routes, Route, Navigate, Link, Outlet, useNavigate } from 'react-router-dom'
import { User, ShieldCheck } from 'lucide-react'

import { AdminDashboard } from './pages/AdminDashboard'
import { EventsList } from './pages/EventsList'
import { CreateEvent } from './pages/CreateEvent'
import { EditEvent } from './pages/EditEvent'
import { EventDetail } from './pages/EventDetail'
import { Reports } from './pages/Reports'
import { BrowseEvents } from './pages/BrowseEvents'
import { MyEvents } from './pages/MyEvents'
import { NotFound } from './pages/NotFound'

export const App = () => {
  const { role, switchTo } = useAuth()
const navigate = useNavigate()
useEffect(() => {
  const path = window.location.pathname
  if (role === 'admin' && path.startsWith('/student')) {
    navigate('/admin/dashboard', { replace: true })
  }
  if (role === 'student' && path.startsWith('/admin')) {
    navigate('/student/events', { replace: true })
  }
}, [role])

  const RoleSwitcher = () => (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
      <button
        onClick={() => role !== 'student' && switchTo('student')}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${role === 'student' ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600' : 'text-gray-500'}`}
      >
        <User size={14} /> Student
      </button>
      <button
        onClick={() => role !== 'admin' && switchTo('admin')}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${role === 'admin' ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600' : 'text-gray-500'}`}
      >
        <ShieldCheck size={14} /> Admin
      </button>
    </div>
  )

  const AdminLayout = ({ children }) => (
    <div className="flex h-screen bg-gray-10 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">Console</span>
          <div className="flex items-center gap-6">
            <RoleSwitcher />
            <div className="h-6 w-px bg-gray-100 dark:bg-gray-800" />
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-gray-950/50 p-8">
          <div className="max-w-6xl mx-auto"><Outlet /></div>
        </main>
      </div>
    </div>
  )

  const StudentLayout = ({ children }) => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100">
      <StudentNavbar />
      <div className="max-w-7xl mx-auto py-8 px-6">
        <div className="flex justify-end mb-6 items-center gap-4">
          <RoleSwitcher />
          <ThemeToggle />
        </div>
        <main><Outlet /></main>
      </div>
    </div>
  )

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to={role === 'admin' ? "/admin/dashboard" : "/student/events"} replace />} />

        <Route element={<AdminLayout />}> 
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/events" element={<EventsList />} />
          <Route path="/admin/create" element={<CreateEvent />} />
          <Route path="/admin/event/:id/edit" element={<EditEvent />} />
          <Route path="/admin/event/:id" element={<EventDetail />} />
          <Route path="/admin/reports" element={<Reports />} />
        </Route>

        <Route element={<StudentLayout />}> 
          <Route path="/student/events" element={<BrowseEvents />} />
          <Route path="/student/my-events" element={<MyEvents />} />
          <Route path="/student/event/:id" element={<EventDetail />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
