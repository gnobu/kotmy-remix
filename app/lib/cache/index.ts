import localforage from 'localforage'
import { ICache } from "./types/ICache.interface"

localforage.config({
    name: 'KOTMY',
    storeName: 'KOTMY_STORE', // Should be alphanumeric, with underscores.
    description: 'Client cache for fetch requests'
    // driver      : localforage.WEBSQL, // Force WebSQL; same as using setDriver()
    // version     : 1.0,
    // size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
})

class Cache<TData> implements ICache<TData> {
    async setItem(id: string, data: TData): Promise<void> {
        localforage.setItem(id, data)
    }
    async getItem(id: string): Promise<TData | null> {
        return await localforage.getItem(id)
    }
    async removeItem(key: string): Promise<void> {
        await localforage.removeItem(key)
    }
    async clear(): Promise<void> {
        await localforage.clear()
    }
}

class MemoryCache<TData> implements ICache<TData> {
    private _cache: Record<string, TData>
    constructor() { this._cache = {} }
    async setItem(id: string, data: TData): Promise<void> {
        this._cache[id] = data
    }
    async getItem(id: string): Promise<TData | null> {
        return this._cache[id] ?? null
    }
    async removeItem(key: string): Promise<void> {
        delete this._cache[key]
    }
    async clear(): Promise<void> {
        this._cache = {}
    }
}

const memoryCache = new MemoryCache()
const persistedCache = new Cache()
export { memoryCache, persistedCache }