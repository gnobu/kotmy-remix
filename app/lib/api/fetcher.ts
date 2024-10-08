import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { TFetcherResponse, TValidationError } from "./types/fetcher.interface"

export class ApiCall {
    static _proxy = process.env._API_URL
    static _instance = axios.create({
        baseURL: this._proxy,
        timeout: 20000,
        withCredentials: true
    })

    static async call<TResponseDTO, TRequestDTO, TErrorDTO = { detail: string | TValidationError[] }>(
        callConfig: AxiosRequestConfig<TRequestDTO>
    ): Promise<TFetcherResponse<TResponseDTO, TErrorDTO>> {
        try {
            const { data } = await this._instance.request<TResponseDTO>(callConfig)
            return { data }
        } catch (err) {
            let error = err as AxiosError<TErrorDTO>
            let errorMessage = "An Error Occurred"
            if (error.response) {
                return { error: error.response.data }
            } else {
                console.log(error)
                return { error: { detail: errorMessage } as TErrorDTO }
            }
        }
    }
}
