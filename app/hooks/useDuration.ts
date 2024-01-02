import { useEffect, useState } from "react"
import { getDuration } from "~/lib/duration"

export function useDuration(deadline: Date) {
    const [duration, setDuration] = useState(deadline.getTime() - Date.now())
    useEffect(() => {
        const interval = setInterval(() => {
            setDuration(prev => {
                // if timeup, stop timer
                if (prev - 1000 <= 0) {
                    clearInterval(interval)
                }
                return (prev - 1000)
            })
        }, 1000)
        return () => { clearInterval(interval) }
    }, [])
    return getDuration(duration)
}