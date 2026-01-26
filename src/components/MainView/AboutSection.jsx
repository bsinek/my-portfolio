import { motion, useTransform, useScroll } from "motion/react"
import { useRef, useState } from "react"

export const AboutSection = ({ scrollContainerRef }) => {
    const { scrollY } = useScroll({ container: scrollContainerRef })
    const IMAGE_HEIGHT = 384; // h-96 == 384px
    const scale = useTransform(scrollY, [0, IMAGE_HEIGHT], [1.05, 1]);
    const opacity = useTransform(scrollY, [0, IMAGE_HEIGHT], [1, 0]);

    const doNotPressref = useRef(null);
    const [counter, setCounter] = useState(0);

    return (
        <section id="about" className="relative h-mainview overflow-x-clip flex flex-col">
            {/* fixed image container */}
            <motion.div className="sticky top-0"
                style={{
                    height: `${IMAGE_HEIGHT}px`,
                    backgroundImage: "url(img/car.jpg)",
                    backgroundPosition: "0% 50%",
                    backgroundSize: "cover",
                    scale: scale,
                    opacity: opacity,
                }}
            >
            </motion.div>
            {/* floating hero text */}
            <div className="absolute top-0 flex flex-col justify-end p-6 font-light" style={{ height: `${IMAGE_HEIGHT}px` }}>
                <span className="text-sm ml-1">CS @ Georgia Tech</span>
                <h1 className="font-black text-8xl leading-28">benjamin sinek</h1>
                <span className="flex justify-items gap-2 mt-2">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="h-6 p-1">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                    </svg>
                    <span className="text-sm flex items-center">
                        <span>Los Angeles, CA</span>
                        <span className="mx-2 font-bold">•</span>
                        <span>Atlanta, GA</span>
                    </span>
                </span>
            </div>

            {/* ABOUT ME */}
            <div className="relative bg-spotify-grey flex-1">
                {/* gradient */}
                <div className="absolute inset-0 h-44 bg-linear-to-b from-zinc-800 to-transparent" />
                {/* buttons */}
                <div className="relative h-24 p-6 flex gap-8 items-center">
                    <button className="h-full aspect-square p-4 rounded-full bg-spotify-green hover:scale-105 transition-transform duration-100">
                        <svg viewBox="0 0 16 16" fill="currentColor" className="h-full text-black">
                            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"/>
                        </svg>
                    </button>
                    <button className="flex justify-center items-center h-8 rounded-full border-1 border-[#7c7c7c] p-4 hover:scale-[103%] hover:border-white transition-all duration-100"
                        onClick={() => {
                            if (!doNotPressref.current) return;
                            doNotPressref.current.currentTime = 0;
                            doNotPressref.current.play();
                            setCounter(counter + 1);
                        }}
                    >
                        <p className="text-sm">Do Not Press</p>
                    </button>
                    <audio ref={doNotPressref} src="sounds/meow.mp3" preload="auto" />
                </div>
                {/* content */}
                <div className="relative grid grid-cols-2 px-6 gap-6">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">About me</h2>
                        <div className="px-4 py-5 text-lg leading-relaxed flex flex-col gap-4">
                            <p>
                                I'm a Computer Science student at Georgia Tech studying AI/ML and exploring their application to financial fields.
                            </p>
                            <p>
                                I enjoy building interactive projects that intersect technology and music, including a hands-free facial emotion-based music recommendation system.
                            </p>
                            <p>
                                Beyond that, I love producing music, tinkering with cars, and snowboarding.
                            </p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">cat.</h2>
                        <div className="h-72 flex justify-center items-center rounded-2xl overflow-hidden">
                            <img src={`img/${counter % 2 === 0 ? "cat1.jpg" : "cat2.jpg"}`} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
