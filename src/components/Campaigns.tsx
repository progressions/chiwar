// import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Client from '@/utils/Client'

export default function Campaigns() {
  const { jwt, client } = useAuth()

  const [campaigns, setCampaigns] = useState({ gamemaster: [], player: [] })
  const [currentCampaign, setCurrentCampaign] = useState({id: '', name: ''})

  useEffect(() => {
    if (jwt) {
      const fetchCampaigns = async () => {
        const response = await client.getCampaigns()
        setCampaigns(response.data)
      }

      const fetchCurrentCampaign = async () => {
        try {
          const response = await client.getCurrentCampaign()
          setCurrentCampaign(response.data)
        } catch (error) {
          console.log("error", error)
        }
      }

      fetchCampaigns()
      fetchCurrentCampaign()
    }

  }, [jwt])

  const handleStart = async (campaign: any) => {
    const response = await client.startCampaign({ id: campaign.id })
    if (response.status === 200) {
      setCurrentCampaign(response.data)
    }
  }

  const { gamemaster, player } = campaigns

  const startButtons = (campaign: any) => {
    return (
      <button onClick={() => handleStart(campaign)}>Start</button>
    )
  }

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
          {(currentCampaign?.id !== campaign?.id) && startButtons(campaign)}
        </div>
      ))}
      <h2>Player</h2>
      {player.map((campaign: any) => (
        <div key={campaign.id}>
          <h3>{campaign.name}</h3>
          {(currentCampaign?.id !== campaign?.id) && startButtons(campaign)}
        </div>
      ))}
    </>
  )
}
