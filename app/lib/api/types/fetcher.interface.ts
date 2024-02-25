export type IFetcherError = {
    detail: string
    statusCode: number
}

export type TValidationError = {
    loc: any[],
    msg: string,
    type: string,
}

export type TFetcherResponse<TData, TError=IFetcherError> =
    | { data?: undefined; error: TError }
    | { data: TData; error?: undefined }
