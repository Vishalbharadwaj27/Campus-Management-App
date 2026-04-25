import { useParams } from 'react-router-dom'
import { useEventById, useRegistrations, useDeleteEvent, useRegister, useUnregister } from '../hooks/useApi'
import { Card } from '../components/UI/Card'
import { Button } from '../components/UI/Button'
import { Badge } from '../components/UI/Badge'
import { Calendar, MapPin, Trash2, Edit2, Users } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export const EventDetail = () => {
  const { id } = useParams()
  const { data: event } = useEventById(id)
  const { data: regs } = useRegistrations()
  const deleteEvent = useDeleteEvent()
  const { role } = useAuth()
  const studentId = 's1'

  if (!event) return <div className="p-6">Loading...</div>

  const eventRegs = regs?.filter(r => r.event_id === id) || []
  const totalRegs = eventRegs.length
  const checkedIn = eventRegs.filter(r => r.checked_in).length
  const hitRate = totalRegs ? ((checkedIn/totalRegs)*100).toFixed(1) : '--'

  const isRegistered = regs?.some(r => r.event_id===id && r.student_id===studentId)

  return (
    <div className="p-6 space-y-6">
      <Card>
        <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
        <Badge status={event.category}>{event.category}</Badge>
        <p className="mt-2 text-gray-600">{event.description}</p>
        <div className="flex items-center gap-2 mt-4">
          <Calendar size={16} /> <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <MapPin size={16} /> <span>{event.location}</span>
        </div>
      </Card>

      <section>
        <h3 className="text-xl font-semibold mb-2">Registrations ({totalRegs})</h3>
        <ul className="space-y-2">
          {eventRegs.map(r => (
            <li key={r.registration_id} className="flex items-center justify-between">
              <span>{r.student_id}</span>
              <Badge status={r.checked_in? 'primary':'secondary'}>{r.checked_in? 'Checked In':'Registered'}</Badge>
            </li>
          ))}
        </ul>
      </section>

      {role==='admin' && (
        <div className="flex space-x-4 mt-4">
          <Button variant="secondary" leftIcon={Edit2} onClick={() => window.location.href=`/admin/event/${id}/edit`}>Edit</Button>
          <Button variant="danger" leftIcon={Trash2} onClick={() => { if(confirm('Delete?')) deleteEvent.mutate(id) }}>Delete</Button>
        </div>
      )}

      {role==='student' && (
        isRegistered ? (
          <Button variant="outline" className="mt-4" onClick={() => useUnregister.mutate({event_id:id,student_id:studentId})}>Unregister</Button>
        ) : (
          <Button className="mt-4" onClick={() => useRegister.mutate({event_id:id,student_id:studentId})}>Register</Button>
        )
      )}
    </div>
  )
}
