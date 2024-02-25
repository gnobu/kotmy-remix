import { IFetcherError } from "./types/fetcher.interface"

export class FetcherError extends Error implements IFetcherError {
    public detail: string
    public statusCode: number
    constructor(error: string, statusCode: number) {
        super()
        this.detail = error
        this.statusCode = statusCode
    }
}