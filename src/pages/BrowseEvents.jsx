import { useState } from 'react'
import { useEvents, useRegistrations, useRegister, useUnregister } from '../hooks/useApi'
import { Card } from '../components/UI/Card'
import { Button } from '../components/UI/Button'
import { Badge } from '../components/UI/Badge'
import { Calendar, MapPin, Search } from 'lucide-react'

export const BrowseEvents = () => {
  const { data: events, isLoading } = useEvents()
  const { data: regs } = useRegistrations()
  const register = useRegister()
  const unregister = useUnregister()
  const [search, setSearch] = useState('')
  const studentId = 's1'

  const isRegistered = (eId) => regs?.some(r => r.event_id===eId && r.student_id===studentId)

  const filtered = events?.filter(e => e.title.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase()))

  if (isLoading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 space-y-6">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input type="text" placeholder="Search events" className="w-full pl-10 pr-4 py-2 rounded-xl border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition" value={search} onChange={e=>setSearch(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered?.map(e=>(
          <Card key={e.event_id} className="flex flex-col h-full">
            <div className="mb-2"><Badge status="primary">{e.category}</Badge></div>
            <h3 className="font-semibold mb-1">{e.title}</h3>
            <p className="text-gray-600 mb-2">{e.description?.slice(0,60)}...</p>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-auto">
              <Calendar size={16} /> <span>{new Date(e.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={16} /> <span>{e.location}</span>
            </div>
            <div className="mt-4">
              {isRegistered(e.event_id) ?
                <Button variant="outline" className="w-full text-red-600 border-red-600" onClick={()=>unregister.mutate({event_id:e.event_id,student_id:studentId})}>Unregister</Button> :
                <Button variant="primary" className="w-full" onClick={()=>register.mutate({event_id:e.event_id,student_id:studentId})}>Register</Button>
              }
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
