import { useState, useEffect } from 'react'

export const useAuth = () => {
  const [role, setRole] = useState(() => localStorage.getItem('role') || 'student');
  useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);
  const switchTo = (newRole) => setRole(newRole);
  return { role, switchTo };
};
