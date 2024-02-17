import axios, { AxiosResponse } from "axios"

export class Client {
  public async get(url: string): Promise<AxiosResponse> {
    return axios.get(url)
  }
}
