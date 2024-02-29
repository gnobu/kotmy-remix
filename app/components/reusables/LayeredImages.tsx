import { noImage } from "~/assets/images"

export default function LayeredImages({ images, length = 5 }: { images: (string | null | { image: string | null })[], length?: number }) {
    const remaining = images.length - length
    const lastLayer = remaining > 0
        ? <div className="w-8 aspect-square inline-flex justify-center items-center -ml-2 rounded-full ring-2 ring-white bg-tertiary text-accent font-semibold text-sm">+{remaining}</div>
        : null
    return (
        <div>
            {images.slice(0, length).map((image, index) => {
                if (typeof image === 'string') {
                    return <img key={index} src={image || noImage} alt="people smiling" className="w-8 aspect-square inline-block -ml-2 first:ml-0 rounded-full object-cover ring-2 ring-white" />
                }
                return <img key={index} src={image?.image || noImage} alt="people smiling" className="w-8 aspect-square inline-block -ml-2 first:ml-0 rounded-full object-cover ring-2 ring-white" />

            })}
            {lastLayer}
        </div>
    )
}
