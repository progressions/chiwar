// import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

import type { Fight } from '@/types/types'
import type { FightsResponse } from '@/types/responses'

const Fights: React.FC = () => {
  const { user, client } = useAuth()
  // const { id } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [fights, setFights] = useState<Fight[]>([])

  useEffect(() => {
    // check for user to avoid making requests before user is set
    if (user) {
      const fetchFights = async () => {
        const data = await client.getFights()
        setFights(data.fights)
      }

      fetchFights().then(() => {
        setIsLoading(false)
      })
    }

  }, [user])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Fights</h1>
      { fights.map((fight: Fight) => (
        <div key={fight.id}>
          <h2>{fight.name}</h2>
          <p>{fight.description}</p>
        </div>
      )) }
    </>
  )
}

export default Fights
