export function numberSlang(value: number) {
    if (value >= 1000000000) return `${(value / 1000000000)}b`
    else if (value >= 1000000) return `${(value / 1000000)}m`
    else if (value >= 1000) return `${(value / 1000)}k`
    else return value
}