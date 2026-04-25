import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useCreateEvent } from '../hooks/useApi'
import { Input } from '../components/UI/Input'
import { Select } from '../components/UI/Select'
import { Button } from '../components/UI/Button'
import { useNavigate } from 'react-router-dom'

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  date: yup.string().required('Date is required'),
  location: yup.string().required('Location is required'),
  category: yup.string().required('Category is required'),
  capacity: yup.number().positive().integer().required('Capacity is required')
})

export const CreateEvent = () => {
  const navigate = useNavigate()
  const createEvent = useCreateEvent()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    createEvent.mutate(data, {
      onSuccess: () => navigate('/admin/events')
    })
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white">Create Event</h1>
        <p className="text-gray-500 font-medium">Fill in the details to launch a new campus activity.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
        <Input label="Event Title" placeholder="e.g. Annual Sports Meet" {...register('title')} error={errors.title?.message} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Event Date" type="date" {...register('date')} error={errors.date?.message} />
          <Input label="Max Capacity" type="number" placeholder="200" {...register('capacity')} error={errors.capacity?.message} />
        </div>

        <Input label="Location" placeholder="Main Auditorium" {...register('location')} error={errors.location?.message} />
        
        <Select 
          label="Category" 
          {...register('category')} 
          error={errors.category?.message}
          options={[
            { value: 'Technology', label: 'Technology' },
            { value: 'Sports', label: 'Sports' },
            { value: 'Arts', label: 'Arts' },
            { value: 'Workshop', label: 'Workshop' },
            { value: 'Gaming', label: 'Gaming' }
          ]}
        />

        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Description</label>
          <textarea 
            placeholder="Tell us more about the event..."
            {...register('description')}
            className="w-full p-5 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none h-40 transition-all font-medium"
          />
          {errors.description && <p className="text-sm font-semibold text-rose-500 ml-1">{errors.description.message}</p>}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={() => navigate('/admin/events')}>Discard</Button>
          <Button type="submit" isLoading={createEvent.isLoading}>Publish Event</Button>
        </div>
      </form>
    </div>
  )
}
