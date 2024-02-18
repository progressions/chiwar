import React from 'react'
import { useAuth } from '@/contexts/AuthContext' // Adjust the import path accordingly

const Home: React.FC = () => {
  const { user } = useAuth()

  return (
    <div>
      {user ? "User is available" : "No User found"}
    </div>
  )
}

export default Home
