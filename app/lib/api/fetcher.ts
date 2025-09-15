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
            console.log("--------------------------------")
            console.log("API CALL: ", this._instance.getUri(callConfig), callConfig.method)
            console.log("+++++++++++++++++++++++++++++++++")

            const { data } = await this._instance.request<TResponseDTO>(callConfig)
            // console.log(data)
            return { data }
        } catch (err) {
            let error = err as AxiosError<TErrorDTO>
            let errorMessage = "An Error Occurred"
            if (error.response) {
                if(error.response.data && typeof error.response.data  !== 'string') {
                    for(const key in error.response.data) {
                        console.log(key)
                    }
                    }
                console.log({_error: error.response.data})
                return { error: error.response.data }
            } else {
                // console.log({ errorMessage })
                return { error: { detail: errorMessage } as TErrorDTO }

            }
        }
    }
}
