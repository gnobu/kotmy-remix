export interface ICache<TData> {
    setItem(id: string, data: TData): Promise<void>

    getItem(id: string): Promise<TData | null>

    removeItem(key: string): Promise<void>

    clear(): Promise<void>

    // length(): Promise<number>

    // key(keyIndex: number): Promise<string>

    // keys(): Promise<string[]>

    // iterate<T, U>(iteratee: (value: T, key: string, iterationNumber: number) => U,
    //     callback?: (err: any, result: U) => void): Promise<U>
}