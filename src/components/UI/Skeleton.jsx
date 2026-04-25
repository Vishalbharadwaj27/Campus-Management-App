export const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse rounded ${className}`}> 
    <div className="bg-gray-200 dark:bg-gray-700 h-4 my-1" style={{ width: '80%' }} />
    <div className="bg-gray-200 dark:bg-gray-700 h-4 my-1" style={{ width: '60%' }} />
  </div>
)
