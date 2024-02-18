export type User = {
  id: string
  first_name: string
  last_name: string
}

export type Campaign = {
  id: string
  name: string
}

export type Fights = {
  id: string
  campaign_id: string
}
