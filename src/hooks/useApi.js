import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../data/api'
import { showToast } from '../utils/toast'

export const useEvents = () =>
  useQuery({
    queryKey: ['events'],
    queryFn: api.fetchEvents,
    staleTime: 5 * 60 * 1000
  })

export const useEventById = id =>
  useQuery({
    queryKey: ['event', id],
    queryFn: () => api.fetchEventById(id),
    enabled: !!id
  })

export const useCreateEvent = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: api.createEvent,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['events'] })
      showToast('success', 'Event created')
    }
  })
}

export const useUpdateEvent = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: api.updateEvent,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['events'] })
      showToast('success', 'Event updated')
    }
  })
}

export const useDeleteEvent = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: api.deleteEvent,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['events'] })
      showToast('success', 'Event deleted')
    }
  })
}

export const useRegistrations = () =>
  useQuery({
    queryKey: ['registrations'],
    queryFn: api.fetchRegistrations
  })

export const useRegister = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: api.registerForEvent,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['registrations'] })
      showToast('success', 'Registered')
    }
  })
}

export const useUnregister = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: api.unregisterFromEvent,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['registrations'] })
      showToast('success', 'Unregistered')
    }
  })
}

export const useStudents = () =>
  useQuery({
    queryKey: ['students'],
    queryFn: api.fetchStudents
  })

export const useAdmins = () =>
  useQuery({
    queryKey: ['admins'],
    queryFn: api.fetchAdmins
  })
