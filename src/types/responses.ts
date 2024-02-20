import { Fight, Campaign } from '@/types/types'

export type PaginationMeta = {
  current_page: number
  next_page: number
  prev_page: number
  total_pages: number
  total_count: number
}

export type CampaignsResponse = {
  gamemaster: Campaign[]
  player: Campaign[]
}

export type FightsResponse = {
  fights: Fight[]
  meta: PaginationMeta
}
