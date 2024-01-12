export type Alert = 'success' | 'error'
export type Message = string
export type ToastMessage = `${Alert}::${Message}`
export type SplitToast<T extends string> = T extends `${Alert}::${infer M}` ? [Alert, M] : never