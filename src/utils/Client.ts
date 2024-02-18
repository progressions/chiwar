import axios, { AxiosResponse, AxiosHeaderValue } from "axios"

type ClientParams = {
  jwt?: string
}

export default class Client {
  jwt?: string
  baseUrl = 'http://localhost:3000/api/v1'

  constructor(params: ClientParams = {}) {
    if (params.jwt) {
      this.jwt = params.jwt
    }
  }

  public async login(email: string, password: string): Promise<AxiosResponse> {
    return axios({
      method: 'post',
      url: 'http://localhost:3000/users/sign_in',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': "true",
      },
      data: { user: { email, password }}
    })
  }

  public async getCampaigns(): Promise<AxiosResponse> {
    return this.get('campaigns')
  }

  public async getCurrentCampaign(): Promise<AxiosResponse> {
    return this.get('campaigns/current')
  }

  public async startCampaign(campaign: any): Promise<AxiosResponse> {
    return this.post('campaigns/current', { id: campaign?.id })
  }

  public async get(path: string): Promise<AxiosResponse> {
    return axios.get(`${this.baseUrl}/${path}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.jwt as AxiosHeaderValue,
      }
    })
  }

  public async post(path: string, data: any): Promise<AxiosResponse> {
    return axios(`${this.baseUrl}/${path}`, {
      method: 'POST',
      params: data,
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.jwt as AxiosHeaderValue,
      }
    })
  }
}
