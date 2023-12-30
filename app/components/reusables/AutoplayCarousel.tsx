import React from "react"

type Props = {
    containerClass?: string;
    trackClass?: string;
} & React.ComponentProps<'div'>

export default function AutoplayCarousel({ children, containerClass, trackClass }: Props) {
    return (
        <div className={`carousel-container ${containerClass}`}>
            <div className={`carousel-track ${trackClass}`}>
                {Array(10).fill(children)}
            </div>
        </div>
    )
}