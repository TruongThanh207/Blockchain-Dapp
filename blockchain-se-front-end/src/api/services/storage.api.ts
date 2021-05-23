import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {defer, Observable} from "rxjs";
import {ResultResponse} from "../models/dto/resultResponse.dto";

export class StorageApi {
  static config: AxiosRequestConfig = {
    headers: {
      'Context-Type': 'application/json'
    }
  }

  static url = `http://localhost:3000/accounts`;

  static getALlActiveAccount(): Observable<AxiosResponse<ResultResponse<{ tokenVerify: string }>>> {
    return defer(() =>
        axios.get(`${StorageApi.url}`, {})
    );
  }
}
