import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { TFetcherResponse, TValidationError } from "./types/fetcher.interface"

export class ApiCall {
    static _proxy = process.env._API_URL
    
    static _instance = axios.create({
        baseURL: this._proxy,
        timeout: 20000,
        withCredentials: true
    })

    static convertObjToQueryString(params: Record<string, any>): string {
        const queryString = new URLSearchParams(
        Object.entries(params ?? {})
            .filter(([_, value]) => value !== null && value !== undefined)
            .map(([key, value]) => [key, String(value)])
        );
        return queryString.toString();  
    }

    static async call<TResponseDTO, TRequestDTO, TErrorDTO = { detail: string | TValidationError[] }>(
        callConfig: AxiosRequestConfig<TRequestDTO>, cookieHeader?: string
    ): Promise<TFetcherResponse<TResponseDTO, TErrorDTO>> {
        try {
            
            
            const configWithCookies = { ...callConfig, headers: { ...callConfig.headers ?? {} } };

            // 2. Add the Cookie header if provided
            if (cookieHeader) {
                configWithCookies.headers['Cookie'] = cookieHeader; // <-- SENDING IT BACK
            }

            console.log("--------------------------------")
            console.log("API CALL: ", this._instance.getUri(callConfig), callConfig.method, configWithCookies.headers)
            console.log("+++++++++++++++++++++++++++++++++")

            const { data, headers } = await this._instance.request<TResponseDTO>(configWithCookies)

            const responseHeaders: Record<string, string> = {};
            const cookieValue = headers['set-cookie'];
            const cookieString = Array.isArray(cookieValue) ? cookieValue.join(', ') : cookieValue ?? '';
    
            if (cookieString) {
                responseHeaders['Set-Cookie'] = cookieString;
            }
            // console.log(data)
            return { data, headers: responseHeaders, authRequired: false }
        } catch (err) {
            let error = err as AxiosError<TErrorDTO>
            let errorMessage = "An Error Occurred"
            if (error.response) {
               const authRequired = error.response.status === 403
                if(error.response.data && typeof error.response.data  !== 'string') {
                    for(const key in error.response.data) {
                        console.log(key)
                    }
                    }
                console.log({_error: error.response.data})

                error.status
                return { error: error.response.data, authRequired }
            } else {
                // console.log({ errorMessage })
                console.log( JSON.stringify(error.message) )
                return { error: { detail: errorMessage } as TErrorDTO, authRequired: false }

            }
        }
    }
}
