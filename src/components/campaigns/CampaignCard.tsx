import type { Campaign } from "@/types/types"

const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
  return (
    <div className="card">
      <h2>Current Campaign</h2>
      <div className="content">
        <h3>{campaign.name}</h3>
        <p>
          {campaign.description}
        </p>
        <p>
          {campaign.players.length} Players
        </p>
      </div>
      <div className="footer">
        <p>Gamemaster {campaign.gamemaster.first_name} {campaign.gamemaster.last_name}</p>
      </div>
    </div>
  )
}

export default CampaignCard
