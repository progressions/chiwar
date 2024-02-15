// import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/auth'

export default function Campaigns() {
  const { validateToken, jwt } = useAuth()
  // const { id } = useParams()

  const [campaigns, setCampaigns] = useState({ gamemaster: [], player: [] })
  const [currentCampaign, setCurrentCampaign] = useState({name: ''})

  useEffect(() => {
    const fetchCampaigns = async () => {
      const token = validateToken()
      if (typeof token !== 'string') return
      const response = await axios.get('http://localhost:3000/api/v1/campaigns', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        }
      })
      setCampaigns(response.data)
    }

    const fetchCurrentCampaign = async () => {
      const token = validateToken()
      if (typeof token !== 'string') return
        const response = await axios.get('http://localhost:3000/api/v1/campaigns/current', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        }
      })
      console.log(response.data)
      setCurrentCampaign(response.data)
    }

    fetchCampaigns()
    fetchCurrentCampaign()

  }, [validateToken])

  const { gamemaster, player } = campaigns

  return (
    <>
      <div>
        <h1>Current Campaign</h1>
        { currentCampaign?.name ? <h2>{currentCampaign.name}</h2> : <h2>No current campaign</h2> }
      </div>
      <h1>Campaigns</h1>
      <h2>Gamemaster</h2>
      {gamemaster.map((campaign: any) => (
        <div key={campaign.id}>
          <h3>{campaign.name}</h3>
          <p>{campaign.description}</p>
        </div>
      ))}
      <h2>Player</h2>
      {player.map((campaign: any) => (
        <div key={campaign.id}>
          <h3>{campaign.name}</h3>
          <p>{campaign.description}</p>
        </div>
      ))}
    </>
  )
}
