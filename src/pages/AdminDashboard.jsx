import { Card } from '../components/UI/Card'
import { Badge } from '../components/UI/Badge'
import { useEvents, useStudents, useRegistrations } from '../hooks/useApi'
import { Calendar, Users, Tag, CheckCircle, TrendingUp, Activity } from 'lucide-react'

export const AdminDashboard = () => {
  const { data: events, isLoading: eventsLoading } = useEvents()
  const { data: students, isLoading: studentsLoading } = useStudents()
  const { data: regs, isLoading: regsLoading } = useRegistrations()

  const totalEvents = events?.length ?? 0
  const totalStudents = students?.length ?? 0
  const totalRegistrations = regs?.length ?? 0
  const attendanceRate = totalRegistrations
    ? ((regs?.filter(r => r.checked_in).length / totalRegistrations) * 100).toFixed(1)
    : '0.0'

  const topRegs = (regs ?? [])
    .reduce((acc, cur) => {
      acc[cur.student_id] = (acc[cur.student_id] || 0) + 1
      return acc
    }, {})
  
  const topIds = Object.entries(topRegs).sort((a, b) => b[1] - a[1]).slice(0, 4)
  const topStudents = topIds.map(([id, cnt]) => ({
    id,
    cnt,
    user: students?.find(u => u.user_id === id)
  }))

  if (eventsLoading || studentsLoading || regsLoading) return <div className="p-6 animate-pulse">Loading...</div>

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">Admin Overview</h1>
        <p className="text-gray-500 mt-2 font-medium">Welcome back! Here's how your campus is doing today.</p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Calendar size={80} />
          </div>
          <Calendar className="text-indigo-600 mb-4" size={32} />
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Events</h4>
          <p className="text-5xl font-black mt-1">{totalEvents}</p>
        </Card>

        <Card className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users size={80} />
          </div>
          <Users className="text-emerald-600 mb-4" size={32} />
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Students</h4>
          <p className="text-5xl font-black mt-1">{totalStudents}</p>
        </Card>

        <Card className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Tag size={80} />
          </div>
          <Tag className="text-purple-600 mb-4" size={32} />
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Bookings</h4>
          <p className="text-5xl font-black mt-1">{totalRegistrations}</p>
        </Card>

        <Card className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity size={80} />
          </div>
          <Activity className="text-rose-600 mb-4" size={32} />
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Engagement</h4>
          <p className="text-5xl font-black mt-1">{attendanceRate}%</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
             <TrendingUp className="text-indigo-600" />
             Top Participating Students
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="space-y-2">
              {topStudents.length > 0 ? topStudents.map((s, idx) => (
                <div key={s.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-2xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-bold">{s.user?.full_name ?? 'Anonymous student'}</p>
                      <p className="text-sm text-gray-500">{s.user?.email}</p>
                    </div>
                  </div>
                  <Badge status="primary" className="px-4 py-1">{s.cnt} Events</Badge>
                </div>
              )) : (
                <p className="p-8 text-center text-gray-500 italic">No registrations yet</p>
              )}
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {(regs?.slice(-6).reverse().map(r => {
              const evt = events?.find(e => e.event_id === r.event_id)
              const stud = students?.find(u => u.user_id === r.student_id)
              return (
                <div key={r.registration_id} className="flex gap-4 items-start">
                  <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 shrink-0" />
                  <div>
                    <p className="text-sm font-bold leading-tight">
                      {stud?.full_name} <span className="font-normal text-gray-500">registered for</span> {evt?.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(r.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              )
            })) || <p className="text-gray-500 text-sm">No recent activity</p>}
          </div>
        </section>
      </div>
    </div>
  )
}
