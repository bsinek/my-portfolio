import { useRef } from "react"
import { HorizontalScroll } from "./HorizontalScroll"
import { Lorem } from "../Lorem"

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
            {/* buttons */}
            <div className="relative h-24 p-6 flex gap-8 items-center">
                <button className="h-full aspect-square p-4 rounded-full bg-spotify-green hover:scale-105 transition-transform duration-100">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-full text-black">
                        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"/>
                    </svg>
                </button>
                <button className="flex justify-center items-center h-8 rounded-full border-1 border-[#7c7c7c] p-4 hover:scale-[103%] hover:border-white transition-all duration-100">
                    <p className="text-sm">Do Not Press</p>
                </button>
            </div>
            {/* content */}
            <div className="relative grid grid-cols-2 h-48 px-6 gap-6">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">About me</h2>
                    <div className="px-4 text-lg">
                        <Lorem/>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Artist pick</h2>
                    <div className="h-72 flex justify-center items-center border rounded-2xl">
                        THINGY HERE
                    </div>
                </div>
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
