import { IFetcherError } from "./types/error.interface"

export class FetcherError extends Error implements IFetcherError {
    public error: string
    public statusCode: number
    constructor(error: string, statusCode: number) {
        super()
        this.error = error
        this.statusCode = statusCode
    }
}