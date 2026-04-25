import { useEvents, useRegistrations, useStudents } from '../hooks/useApi'
import { Card } from '../components/UI/Card'
import { Badge } from '../components/UI/Badge'
import { PieChart, BarChart, TrendingUp, Award } from 'lucide-react'

export const Reports = () => {
  const { data: events } = useEvents()
  const { data: regs } = useRegistrations()
  const { data: students } = useStudents()

  const categoryStats = events?.reduce((acc, cur) => {
    acc[cur.category] = (acc[cur.category] || 0) + 1
    return acc
  }, {}) || {}

  const eventPopularity = events?.map(e => ({
    title: e.title,
    count: regs?.filter(r => r.event_id === e.event_id).length || 0
  })).sort((a,b) => b.count - a.count) || []

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-black mb-8">Event Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <PieChart className="text-purple-500" size={28} />
            <h2 className="text-2xl font-bold">Categories Distribution</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(categoryStats).map(([cat, count]) => (
              <div key={cat} className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span>{cat}</span>
                  <span>{count} Events</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${(count / (events?.length || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart className="text-blue-500" size={28} />
            <h2 className="text-2xl font-bold">Top Events by Registration</h2>
          </div>
          <div className="space-y-6">
            {eventPopularity.slice(0, 5).map((e, idx) => (
              <div key={e.title} className="flex items-center group">
                <span className="w-8 text-2xl font-black text-gray-200 dark:text-gray-700">{idx + 1}</span>
                <div className="flex-1">
                  <p className="font-bold group-hover:text-blue-500 transition-colors">{e.title}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full" 
                        style={{ width: `${(e.count / (regs?.length || 1)) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-gray-500">{e.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-8 bg-gradient-to-br from-indigo-600 to-blue-700 text-white border-none">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <TrendingUp size={32} />
              Overall Performance
            </h2>
            <p className="text-indigo-100 max-w-md">
              Engagement is up by 15% compared to last semester. Most students are interested in Technology and Workshops.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <p className="text-4xl font-black">{students?.length}</p>
              <p className="text-indigo-200 text-sm">Active Students</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black">{regs?.length}</p>
              <p className="text-indigo-200 text-sm">Total Sales/Regs</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
