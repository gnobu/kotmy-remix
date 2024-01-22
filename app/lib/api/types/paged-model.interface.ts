export interface IPagedModel<T> {
    page: number
    per_page: number
    total_pages: number
    total: number
    data: T[]
}