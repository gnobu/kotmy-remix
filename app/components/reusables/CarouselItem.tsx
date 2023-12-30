export default function CarouselItem({ children }: React.ComponentProps<'div'>) {
    return (
        <div className="carousel-card sm:mx-2">
            {children}
        </div>
    )
}