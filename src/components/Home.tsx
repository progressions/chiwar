import React from 'react'
import { useAuth } from '@/contexts/AuthContext' // Adjust the import path accordingly

const Home: React.FC = () => {
  const { isLoading, user } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {user ? "User is available" : "No User found"}
    </div>
  )
}

export default Home
