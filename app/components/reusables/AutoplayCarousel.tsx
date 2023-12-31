import React, { useEffect, useRef, useState } from "react"

type Props = {
    children?: React.ReactNode;
    containerClass?: string;
    trackClass?: string;
    slideDuration?: number;
    reverse?: boolean;
}

export default function AutoplayCarousel({ children, containerClass = '', trackClass = '', slideDuration, reverse = false }: Props) {
    const [fillAmount, setFillAmount] = useState(1)
    const container = useRef<HTMLDivElement>(null)
    const track = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const containerWidth = container.current?.offsetWidth ?? 0
        const trackWidth = track.current?.offsetWidth ?? 0
        const soln = Math.min(Math.ceil(containerWidth / trackWidth))
        container.current?.style.setProperty('--timing', `${slideDuration ?? soln * 3}s`)
        setFillAmount(soln)
    }, [])
    return (
        <div ref={container} className={`carousel-container ${containerClass}`}>
            <div ref={track} className={`carousel-track ${reverse ? 'slide-reverse' : 'slide'} ${trackClass}`}>
                {Array(fillAmount).fill(children)}
            </div>
            <div className={`carousel-track ${reverse ? 'slide-reverse' : 'slide'} ${trackClass}`}>
                {Array(fillAmount).fill(children)}
            </div>
        </div>
    )
}