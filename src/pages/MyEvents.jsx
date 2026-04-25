import { useEvents, useRegistrations, useUnregister } from '../hooks/useApi'
import { Card } from '../components/UI/Card'
import { Button } from '../components/UI/Button'
import { Badge } from '../components/UI/Badge'
import { Calendar, MapPin, XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export const MyEvents = () => {
  const { data: events, isLoading: eventsLoading } = useEvents()
  const { data: regs, isLoading: regsLoading } = useRegistrations()
  const unregister = useUnregister()

  const studentId = 's1' // Mock logged in student

  const myRegs = regs?.filter(r => r.student_id === studentId) || []
  const myEvents = myRegs.map(r => {
    const event = events?.find(e => e.event_id === r.event_id)
    return event ? { ...event, registration_id: r.registration_id } : null
  }).filter(Boolean)

  if (eventsLoading || regsLoading) return <div className="p-6">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-extrabold tracking-tight">My Registrations</h1>
      <p className="text-gray-500">You are registered for {myEvents.length} events.</p>

      {myEvents.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-inner border-2 border-dashed border-gray-200 dark:border-gray-700">
           <Calendar className="mx-auto text-gray-300 mb-4" size={64} />
           <p className="text-xl text-gray-500 mb-6">You haven't registered for any events yet.</p>
           <Link to="/student/events">
             <Button>Explore Events</Button>
           </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myEvents.map(event => (
            <Card key={event.registration_id} className="border-l-4 border-l-blue-500">
              <div className="flex justify-between items-start mb-4">
                <Badge status="secondary">{event.category}</Badge>
                <button 
                  onClick={() => { if(confirm('Unregister?')) unregister.mutate({ event_id: event.event_id, student_id: studentId }) }}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <XCircle size={24} />
                </button>
              </div>
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <div className="space-y-2 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
              </div>
              <Link to={`/student/event/${event.event_id}`}>
                <Button variant="outline" className="w-full">View Details</Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
