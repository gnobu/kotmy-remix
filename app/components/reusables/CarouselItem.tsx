export default function CarouselItem({ children, className = '', ...props }: React.ComponentProps<'div'>) {
    return (
        <div className={`carousel-card sm:mx-2 ${className}`} {...props}>
            {children}
        </div>
    )
}