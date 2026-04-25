import { Link } from 'react-router-dom'

export const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen space-y-4">
    <h1 className="text-6xl font-bold">404</h1>
    <p className="text-gray-600">Page not found.</p>
    <Link to="/" className="text-blue-600 underline">Go to Home</Link>
  </div>
)
