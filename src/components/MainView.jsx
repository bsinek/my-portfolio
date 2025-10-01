import { useRef } from "react"
import { HorizontalScroll } from "./HorizontalScroll"

const MainViewHeader = ({ img, position, size, opacity }) => {
    return (
        <>
            {/* fixed image container */}
            <div className="h-96 rounded-t-lg sticky top-0"
                style={{
                    backgroundImage: `url(${img})`,
                    backgroundPosition: position,
                    backgroundSize: size,
                    opacity: opacity,
                }}>
            </div>
            {/* floating hero text */}
            <div className="absolute top-0 flex flex-col justify-end h-96 p-6 font-light">
                <span className="flex items-center gap-2">
                    <i className="bi bi-patch-check-fill text-2xl text-[#4bb3ff]"></i>
                    <span className="text-sm">Certified Baller</span>
                </span>
                <h1 className="font-black text-8xl leading-[1.1]">benjamin sinek</h1>
                <span className="mt-3">0 lifetime visitors</span>
            </div>
        </>
    )
}

const AboutSection = () => {
    return (
        <div className="relative bg-spotify-grey">
            {/* gradient */}
            <div className="absolute inset-0 h-44 bg-gradient-to-b from-zinc-800 to-transparent" />
            {/* content */}
            <div className="relative p-12">
                
            </div>
        </div>
    )
}

export const MainView = ({ img, position, size, opacity }) => {
    const scrollContainerRef = useRef(null);

    return (
        <section ref={scrollContainerRef} className="relative h-full overflow-y-auto rounded-lg bg-spotify-grey">
            <MainViewHeader img={img} position={position} size={size} opacity={opacity} />
            <AboutSection />
        </section>
    )
}
