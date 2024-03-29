import axios, { AxiosResponse } from "axios"
import type { Campaign, Fight } from "@/types/types"
import type { CampaignsResponse } from "@/types/responses"
import { useNavigate } from "react-router-dom"

type ClientParams = {
  jwt?: string
  baseUrl?: string
  apiUrl?: string
  navigate?: any
}

export default class Client {
  jwt?: string
  baseUrl = 'http://localhost:3000/'
  apiUrl = `${this.baseUrl}/api/v1`
  navigate = useNavigate()

  constructor(params: ClientParams = {}) {
    if (params.jwt) {
      this.jwt = params.jwt
    }
  }

  public async login(email: string, password: string): Promise<AxiosResponse> {
    return axios({
      method: 'post',
      url: `${this.baseUrl}/users/sign_in`,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': "true",
      },
      data: { user: { email, password }}
    })
  }

  /* Campaigns */

  public async getCampaigns(): Promise<CampaignsResponse> {
    return this.get(`${this.apiUrl}/campaigns`)
  }

  public async getCurrentCampaign(): Promise<Campaign> {
    return this.get(`${this.apiUrl}/campaigns/current`)
  }

  public async startCampaign(campaign: any): Promise<Campaign> {
    return this.post(`${this.apiUrl}/campaigns/current`, { id: campaign?.id })
  }

  /* Fights */

  public async getFights(): Promise<Fight[]> {
    return this.get(`${this.apiUrl}/fights`)
  }

  async get<T>(url:string, params = {}):Promise<T> {
    return await this.request("GET", url, params)
  }

  async delete<T>(url:string):Promise<T> {
    return await this.request("DELETE", url)
  }
  async patch<T>(url:string, params = {}):Promise<T> {
    return await this.request("PATCH", url, params)
  }

  async post<T>(url:string, params = {}):Promise<T> {
    return await this.request("POST", url, params)
  }

  async request<T>(method:string, url:string, params = {}):Promise<T> {
    return await axios({
      url: url,
      method: method,
      params: params,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.jwt
      }
    })
    .then(response => response.data)
    .catch(error => {
      if (error.response && error.response.status === 401) {
        this.navigate('/login')
      }
      throw error
    })
  }

  async requestFormData<T>(method: string, url: string, formData: FormData): Promise<T> {
    // Make the PATCH request with multipart/form-data
    return await axios({
      url: url,
      method: method,
      data: formData, // Use FormData as the request data
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        'Authorization': this.jwt
      }
    })
    .then((response: AxiosResponse<T>) => response.data)
    .catch(error => {
      if (error.response && error.response.status === 401) {
        this.navigate('/login')
      }
      throw error
    })
  }

  queryParams(params={}) {
    return Object.entries(params).map(([key, value]) => `${key}=${value || ""}`).join("&")
  }
}
