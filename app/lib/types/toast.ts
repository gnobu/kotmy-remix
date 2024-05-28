export type Alert = 'success' | 'error'
export type Message = string
export type ToastMessage = `${Alert}::${Message}::${number}`
export type SplitToast<T extends string> = T extends `${Alert}::${infer M}::${infer E}` ? [Alert, M, E] : never