import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { FetcherError } from "./fetcherError"
import { IFetcherError, TFetcherResponse, TValidationError } from "./types/fetcher.interface"

export class ApiCall {
    static _proxy = 'https://web-production-88a1.up.railway.app/v2/api'
    static _instance = axios.create({
        baseURL: this._proxy,
        timeout: 20000,
    })

    static async call<TResponseDTO, TRequestDTO, TErrorDTO = { detail: string | TValidationError[] }>(
        callConfig: AxiosRequestConfig<TRequestDTO>
    ): Promise<TFetcherResponse<TResponseDTO, TErrorDTO | IFetcherError>> {
        try {
            const { data } = await this._instance.request<TResponseDTO>(callConfig)
            return { data }
        } catch (err) {
            let error = err as AxiosError<TErrorDTO>
            let errorMessage = "An Error Occurred"
            let status = 500
            if (error.response) {
                return { error: error.response.data }
            } else {
                console.log(error)
                return { error: new FetcherError(errorMessage, status) }
            }
        }
    }
}
