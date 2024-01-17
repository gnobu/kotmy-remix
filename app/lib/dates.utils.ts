export function parseDateForInput(date = new Date().toISOString()) {
    return date.split('T')[0]
}


export function formatDate(date?: number | Date, options: Intl.DateTimeFormatOptions = {}) {
    return new Intl.DateTimeFormat('en-NG', options).format(date)
}