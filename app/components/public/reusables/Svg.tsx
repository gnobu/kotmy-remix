import React from "react"

type Props = {
    src: string;
    use_width?: string;
} & React.ComponentProps<'svg'>

export default function Svg({ src, width = '1.2em', height = '1.2em', use_width = '100%', className, onClick }: Props) {
    return (
        <svg onClick={onClick}
            className={className}
            width={width}
            height={height}>
            <use width={use_width} height={'100%'} href={src}></use>
        </svg>
    )
}
