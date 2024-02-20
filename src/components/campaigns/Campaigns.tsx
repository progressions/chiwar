// import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import type { Campaign } from '@/types/types'
import type { CampaignsResponse } from '@/types/responses'
import CampaignCard from "@/components/campaigns/CampaignCard"

const Campaigns: React.FC = () => {
  const { user, client } = useAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [campaigns, setCampaigns] = useState<CampaignsResponse | undefined>(undefined)
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | undefined>(undefined)

  useEffect(() => {
    // check for user to avoid making requests before user is set
    if (user) {
      const fetchCampaigns = async () => {
        const data = await client.getCampaigns()
        setCampaigns(data)
      }

      const fetchCurrentCampaign = async () => {
        try {
          const data = await client.getCurrentCampaign()
          setCurrentCampaign(data)
        } catch (error) {
          console.log("error", error)
        }
      }

      const fetchAll = async () => {
        await fetchCampaigns()
        await fetchCurrentCampaign()
      }

      fetchAll().then(() => {
        setIsLoading(false)
      })
    }

  }, [user])

  const handleStart = async (campaign: any) => {
    const data = await client.startCampaign({ id: campaign.id })
    setCurrentCampaign(data)
  }

  const startbuttons = (campaign: any) => {
    return (
      <button onClick={() => handleStart(campaign)}>Start</button>
    )
  }

  if (isLoading || !campaigns) {
    return <div>Loading...</div>
  }

  const gamemaster = campaigns.gamemaster || []
  const player = campaigns.player || []

  return (
    <>
      <div>
        { currentCampaign?.name ? <CampaignCard campaign={currentCampaign} /> : <P>No current campaign</P> }
      </div>
      <h1>Campaigns</h1>
      <h2>Gamemaster</h2>
      {gamemaster.map((campaign: any) => (
        <div key={campaign.id} className="my-4">
          <h3>{campaign.name}</h3>
          {(currentCampaign?.id !== campaign?.id) && startbuttons(campaign)}
        </div>
      ))}
      <h2>Player</h2>
      {player.map((campaign: any) => (
        <div key={campaign.id} className="my-4">
          <h3>{campaign.name}</h3>
          {(currentCampaign?.id !== campaign?.id) && startbuttons(campaign)}
        </div>
      ))}
    </>
  )
}

export default Campaigns
