import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'

export default function CurrentCampaign() {
  const [campaign, setCampaign] = useState({name: ''})
  const { validateToken, jwt } = useAuth()

  useEffect(() => {
    const fetchCampaigns = async () => {
      const token = validateToken()
      if (typeof token !== 'string') return
        const response = await axios.get('http://localhost:3000/api/v1/campaigns/current', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        }
      })
      console.log(response.data)
      setCampaign(response.data)
    }

    fetchCampaigns()
  }, [validateToken])

  if (campaign?.name) {
    return (
      <div>
        <h1>Current Campaign</h1>
        <h2>{campaign.name}</h2>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Current Campaign</h1>
        <h2>No current campaign</h2>
      </div>
    )
  }
}
