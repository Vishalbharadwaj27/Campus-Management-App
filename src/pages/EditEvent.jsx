import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEventById, useUpdateEvent } from '../hooks/useApi'
import { Input } from '../components/UI/Input'
import { Select } from '../components/UI/Select'
import { Button } from '../components/UI/Button'

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  date: yup.string().required('Date is required'),
  location: yup.string().required('Location is required'),
  category: yup.string().required('Category is required'),
  capacity: yup.number().positive().integer().required('Capacity is required')
})

export const EditEvent = () => {
  const { id } = useParams()
  const eventQuery = useEventById(id)
  const { data: event } = eventQuery
  const updateEvent = useUpdateEvent()
  const navigate = useNavigate()

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (!event) return
    setValue('title', event.title)
    setValue('description', event.description)
    setValue('date', event.date)
    setValue('location', event.location)
    setValue('category', event.category)
    setValue('capacity', event.capacity)
  }, [event, setValue])

  const onSubmit = data => {
    updateEvent.mutate({ ...data, event_id: id }, {
      onSuccess: () => navigate('/admin/events')
    })
  }

  if (eventQuery.isLoading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white">Edit Event</h1>
        <p className="text-gray-500 font-medium">Update event details.</p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
        <Input label="Event Title" placeholder="e.g. Annual Sports Meet" {...register('title')} error={errors.title?.message} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Event Date" type="date" {...register('date')} error={errors.date?.message} />
          <Input label="Max Capacity" type="number" placeholder="200" {...register('capacity')} error={errors.capacity?.message} />
        </div>
        <Input label="Location" placeholder="Main Auditorium" {...register('location')} error={errors.location?.message} />
        <Select label="Category" {...register('category')} error={errors.category?.message} options={[{
          value: 'Technology',
          label: 'Technology'
        }, {
          value: 'Sports',
          label: 'Sports'
        }, {
          value: 'Arts',
          label: 'Arts'
        }, {
          value: 'Workshop',
          label: 'Workshop'
        }, {
          value: 'Gaming',
          label: 'Gaming'
        }]}/>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Description</label>
          <textarea placeholder="Tell us more about the event..." {...register('description')} className="w-full p-5 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none h-40 transition-all font-medium"/>
          {errors.description && <p className="text-sm font-semibold text-rose-500 ml-1">{errors.description.message}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={() => navigate('/admin/events')}>Discard</Button>
          <Button type="submit" isLoading={updateEvent.isLoading}>Save Changes</Button>
        </div>
      </form>
    </div>
  )
}
