import React from 'react'
import { useAuth } from '@/contexts/AuthContext' // Adjust the import path accordingly

const Home: React.FC = () => {
  const { jwt } = useAuth()

  return (
    <div>
      {jwt ? "JWT is available" : "No JWT found"}
    </div>
  )
}

export default Home
