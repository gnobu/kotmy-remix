const DD = 24 * 60 * 60 * 1000
const HH = 60 * 60 * 1000
const MM = 60 * 1000
const SS = 1000

export function getDuration(duration: number) {
    if (duration <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    const days = Math.floor(duration / DD)
    const hours = Math.floor((duration % DD) / HH)
    const minutes = Math.floor((duration % HH) / MM)
    const seconds = Math.floor((duration % MM) / SS)
    return { days, hours, minutes, seconds }
}