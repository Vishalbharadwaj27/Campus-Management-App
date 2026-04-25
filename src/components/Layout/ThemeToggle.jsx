import { useTheme } from '../../hooks/useTheme'
import { Sun, Moon } from 'lucide-react'

export const ThemeToggle = () => {
  const { theme, toggle } = useTheme()
  return (
    <button onClick={toggle} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
      {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
