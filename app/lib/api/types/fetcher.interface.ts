import { AxiosResponseHeaders } from "axios";

export type IFetcherError = {
    detail: string | TValidationError[]
    // statusCode: number
}

export type TValidationError = {
    loc: any[],
    msg: string,
    type: string,
}

export type TFetcherResponse<TData, TError=IFetcherError> =
    | { data?: undefined; error: TError, headers?: Record<string, string>, authRequired?: boolean }
    | { data: TData; error?: undefined, headers?: Record<string, string>, authRequired?: boolean }
