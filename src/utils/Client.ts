import axios, { AxiosResponse } from "axios"

type ClientParams = {
  jwt?: string
}

export default class Client {
  jwt?: string
  baseUrl = 'http://localhost:3000/'
  apiUrl = `${this.baseUrl}/api/v1`

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

  public async getCampaigns(): Promise<AxiosResponse> {
    return this.get(`${this.apiUrl}/campaigns`)
  }

  public async getCurrentCampaign(): Promise<AxiosResponse> {
    return this.get(`${this.apiUrl}/campaigns/current`)
  }

  public async startCampaign(campaign: any): Promise<AxiosResponse> {
    return this.post(`${this.apiUrl}/campaigns/current`, { id: campaign?.id })
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
  }

  async get<T>(url:string, params = {}):Promise<T> {
    return await axios({
      url: url,
      method: "GET",
      params: params,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.jwt
      }
    })
    .then(response => response.data)
  }

  async delete<T>(url:string):Promise<T> {
    return await axios({
      url: url,
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.jwt
      }
    })
    .then(response => response.data)
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
    .then((response: AxiosResponse<T>) => response.data);
  }

  queryParams(params={}) {
    return Object.entries(params).map(([key, value]) => `${key}=${value || ""}`).join("&")
  }
}
