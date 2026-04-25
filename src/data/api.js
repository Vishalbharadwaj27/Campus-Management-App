// Mock API using localStorage for persistence

const INITIAL_EVENTS = [
  {
    event_id: '1',
    title: 'Spring Tech Symposium',
    description: 'A day filled with tech talks and workshops.',
    date: '2026-05-15',
    location: 'Main Auditorium',
    category: 'Technology',
    capacity: 200,
    created_at: new Date().toISOString()
  },
  {
    event_id: '2',
    title: 'Inter-College Chess Tournament',
    description: 'Compete with the best chess players in the region.',
    date: '2026-06-01',
    location: 'Student Hub',
    category: 'Sports',
    capacity: 50,
    created_at: new Date().toISOString()
  }
]

const INITIAL_STUDENTS = [
  { user_id: 's1', full_name: 'John Doe', email: 'john@example.com' },
  { user_id: 's2', full_name: 'Jane Smith', email: 'jane@example.com' }
]

const getData = (key, initial) => {
  const data = localStorage.getItem(key)
  if (!data) {
    localStorage.setItem(key, JSON.stringify(initial))
    return initial
  }
  return JSON.parse(data)
}

const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const fetchEvents = async () => {
  return getData('events', INITIAL_EVENTS)
}

export const fetchEventById = async (id) => {
  const events = await fetchEvents()
  return events.find(e => e.event_id === id)
}

export const createEvent = async (event) => {
  const events = await fetchEvents()
  const newEvent = { ...event, event_id: Date.now().toString(), created_at: new Date().toISOString() }
  setData('events', [...events, newEvent])
  return newEvent
}

export const updateEvent = async (event) => {
  const events = await fetchEvents()
  const updated = events.map(e => e.event_id === event.event_id ? event : e)
  setData('events', updated)
  return event
}

export const deleteEvent = async (id) => {
  const events = await fetchEvents()
  setData('events', events.filter(e => e.event_id !== id))
  return id
}

export const fetchRegistrations = async () => {
  return getData('registrations', [])
}

export const registerForEvent = async ({ event_id, student_id }) => {
  const regs = await fetchRegistrations()
  const newReg = {
    registration_id: Date.now().toString(),
    event_id,
    student_id,
    checked_in: false,
    timestamp: new Date().toISOString()
  }
  setData('registrations', [...regs, newReg])
  return newReg
}

export const unregisterFromEvent = async ({ event_id, student_id }) => {
  const regs = await fetchRegistrations()
  setData('registrations', regs.filter(r => !(r.event_id === event_id && r.student_id === student_id)))
}

export const fetchStudents = async () => {
  return getData('students', INITIAL_STUDENTS)
}

export const fetchAdmins = async () => {
  return [{ user_id: 'a1', full_name: 'Admin User', email: 'admin@example.com' }]
}
