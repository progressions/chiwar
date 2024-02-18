import { Campaign } from '@/types/types'

export type CampaignsResponse = {
  gamemaster: Campaign[]
  player: Campaign[]
}
