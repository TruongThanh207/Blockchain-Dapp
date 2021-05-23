import { AuthDto } from '../models/dto/auth.dto'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { defer, Observable } from 'rxjs'
import { ResultResponse } from '../models/dto/resultResponse.dto'

export class AuthApi {
  static config: AxiosRequestConfig = {
    headers: {
      'Context-Type': 'application/json'
    }
  }

  // static url = `http://localhost:15661/auth`;

  static url = `http://localhost:3000/auth`

  static login (
    authDto: AuthDto
  ): Observable<AxiosResponse<ResultResponse<any>>> {
    return defer(() =>
      axios.post(`${AuthApi.url}/login`, authDto, AuthApi.config)
    )
  }

  static loginWithAddress (
    address: string
  ): Observable<AxiosResponse<ResultResponse<any>>> {
    return defer(() =>
      axios.post(`${AuthApi.url}/login-with-address`, {address}, AuthApi.config)
    )
  }

  static verify (
    token: string,
    code: string
  ): Observable<AxiosResponse<ResultResponse<boolean>>> {
    return defer(() =>
      axios.post(`${AuthApi.url}/verify`, { token, code }, AuthApi.config)
    )
  }

  static create (
    email: string,
    password: string
  ): Observable<AxiosResponse<ResultResponse<any>>> {
    return defer(() => axios.post(`${AuthApi.url}/create`, { email, password }))
  }
}
