import { useEvents, useDeleteEvent } from '../hooks/useApi'
import { Card } from '../components/UI/Card'
import { Button } from '../components/UI/Button'
import { Badge } from '../components/UI/Badge'
import { Edit2, Trash2, Plus, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

export const EventsList = () => {
  const { data: events, isLoading } = useEvents()
  const deleteEvent = useDeleteEvent()

  if (isLoading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Events</h1>
        <Link to="/admin/create">
          <Button className="flex items-center gap-2">
            <Plus size={18} /> Create Event
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {events?.map(event => (
              <tr key={event.event_id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{event.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge status="secondary">{event.category}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{event.capacity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <Link to={`/admin/event/${event.event_id}`} className="text-blue-600 hover:text-blue-900 mx-2">
                    <Eye size={18} className="inline" />
                  </Link>
                  <Link to={`/admin/event/${event.event_id}/edit`} className="text-indigo-600 hover:text-indigo-900 mx-2">
                    <Edit2 size={18} className="inline" />
                  </Link>
                  <button 
                    onClick={() => { if(confirm('Delete?')) deleteEvent.mutate(event.event_id) }}
                    className="text-red-600 hover:text-red-900 mx-2"
                  >
                    <Trash2 size={18} className="inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
