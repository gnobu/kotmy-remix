export function parseDateForInput(date = new Date().toISOString()){
    return date.split('T')[0]
}