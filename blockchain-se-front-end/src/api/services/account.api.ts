import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { defer, Observable } from 'rxjs'
import { AuthDto } from '../models/dto/auth.dto'
import { ResultResponse } from '../models/dto/resultResponse.dto'

export class AccountApi {
  static config: AxiosRequestConfig = {
    headers: {
      'Context-Type': 'application/json'
    }
  }

  static url = `http://localhost:3000/account`

  static getContractValue (): Observable<AxiosResponse<ResultResponse<any>>> {
    return defer(() => axios.get(`${AccountApi.url}s`, {}))
  }

  static register (
    authDto: AuthDto
  ): Observable<AxiosResponse<ResultResponse<any>>> {
    return defer(() =>
      axios.post(`${AccountApi.url}/create`, authDto, AccountApi.config)
    )
  }

  static getBalance (
    address: string
  ): Observable<AxiosResponse<ResultResponse<any>>> {
    return defer(() => axios.post(`${AccountApi.url}/get-balance`, { address }))
  }

  static send (
    from: string,
    to: string,
    amount: number
  ): Observable<AxiosResponse<ResultResponse<any>>> {
    return defer(() =>
      axios.post(`${AccountApi.url}/send-eth`, {
        fromAddr: from,
        toAddr: to,
        amount
      })
    )
  }
}
