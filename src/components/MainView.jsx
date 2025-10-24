import { useRef } from "react"
import { HorizontalScroll } from "./HorizontalScroll"
import { Lorem } from "../Lorem"

const HeroSection = ({ img, position, size, opacity }) => {
    return (
        <section className="relative h-mainview">
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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4bb3ff" className="h-6">
                            <path d="M10.814.5a1.66 1.66 0 0 1 2.372 0l2.512 2.572 3.595-.043a1.66 1.66 0 0 1 1.678 1.678l-.043 3.595 2.572 2.512c.667.65.667 1.722 0 2.372l-2.572 2.512.043 3.595a1.66 1.66 0 0 1-1.678 1.678l-3.595-.043-2.512 2.572a1.66 1.66 0 0 1-2.372 0l-2.512-2.572-3.595.043a1.66 1.66 0 0 1-1.678-1.678l.043-3.595L.5 13.186a1.66 1.66 0 0 1 0-2.372l2.572-2.512-.043-3.595a1.66 1.66 0 0 1 1.678-1.678l3.595.043zm6.584 9.12a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308z"/>
                        </svg>
                        <span className="text-sm">Certified Baller</span>
                    </span>
                    <h1 className="font-black text-8xl leading-28">benjamin sinek</h1>
                    <span className="mt-2">0 lifetime visitors</span>
            </div>

            {/* ABOUT ME */}
            <div className="relative h-full bg-spotify-grey">
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
                <div className="relative grid grid-cols-2 px-6 gap-6">
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
        </section>
    )
}

const Experience = () => {
    return (
        <section>
            
        </section>
    )
}

export const MainView = ({ img, position, size, opacity }) => {
    const scrollContainerRef = useRef(null);

    return (
        <section ref={scrollContainerRef} className="relative h-full overflow-y-auto rounded-lg bg-spotify-grey">
            <HeroSection img={img} position={position} size={size} opacity={opacity} />
            <div className="h-mainview" />
        </section>
    )
}
