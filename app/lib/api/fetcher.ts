import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { FetcherError } from "./fetcherError"

export class ApiCall {
    static _proxy = 'https://web-production-88a1.up.railway.app'
    static _instance = axios.create({
        baseURL: this._proxy,
        timeout: 20000,
    })

    static async call<TResponseDTO, TErrorDTO extends { message: string }, TRequestDTO>(
        callConfig: AxiosRequestConfig<TRequestDTO>
    ) {
        try {
            const { data } = await this._instance.request<TResponseDTO>(callConfig)
            return data
        } catch (err) {
            let error = err as AxiosError<TErrorDTO>
            let errorMessage = "An error Occurred"
            let status = 500
            if (error.response) {
                throw new FetcherError(error.response.data.message, error.response.status)
            } else {
                console.log(error)
                throw new FetcherError(errorMessage, status)
            }
        }
    }
}
