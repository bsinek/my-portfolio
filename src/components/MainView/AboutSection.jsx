import { motion, useTransform, useScroll } from "motion/react"
import { useRef, useState } from "react"

export const AboutSection = ({ scrollContainerRef }) => {
    const { scrollY } = useScroll({ container: scrollContainerRef })
    const IMAGE_HEIGHT_REM = 24; // h-96 = 24rem
    const imageHeightPx = IMAGE_HEIGHT_REM * 16;
    const scale = useTransform(scrollY, [0, imageHeightPx], [1.05, 1]);
    const opacity = useTransform(scrollY, [0, imageHeightPx], [1, 0]);

    const doNotPressref = useRef(null);
    const [counter, setCounter] = useState(0);

    return (
        <section id="about" className="relative h-mainview overflow-x-clip flex flex-col">
            {/* fixed image container */}
            <motion.div className="sticky top-0 min-h-96"
                style={{
                    height: `${imageHeightPx}px`,
                    backgroundImage: "url(/img/car.jpg)",
                    backgroundPosition: "0% 50%",
                    backgroundSize: "cover",
                    scale: scale,
                    opacity: opacity,
                }}
            >
            </motion.div>
            {/* floating hero text */}
            <div className="absolute top-0 flex flex-col justify-end p-6 font-light" style={{ height: `${imageHeightPx}px` }}>
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
            <div className="relative bg-spotify-grey flex-1 flex flex-col">
                {/* gradient */}
                <div className="absolute inset-0 h-44 bg-linear-to-b from-zinc-800 to-transparent" />
                {/* buttons */}
                <div className="relative h-24 p-6 flex gap-8 items-center">
                    {/* <button className="h-full aspect-square p-4 rounded-full bg-spotify-green hover:scale-105 transition-transform duration-100">
                        <svg viewBox="0 0 16 16" fill="currentColor" className="h-full text-black">
                            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"/>
                        </svg>
                    </button> */}
                    <button className="flex justify-center items-center h-8 rounded-full border border-[#7c7c7c] p-4 hover:scale-[103%] hover:border-white transition-all duration-100 cursor-pointer"
                        onClick={() => {
                            if (!doNotPressref.current) return;
                            doNotPressref.current.currentTime = 0;
                            doNotPressref.current.play();
                            setCounter((counter + 1) % 3);
                        }}
                    >
                        <p className="text-sm">Mystery Button...</p>
                    </button>
                    <audio ref={doNotPressref} src="/sounds/meow.mp3" preload="auto" />
                </div>
                {/* content */}
                <div className="relative grid grid-cols-[4fr_3fr] px-6 gap-6">
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
                        <div className="h-72 flex justify-center items-cesnter rounded-2xl overflow-hidden">
                            <img src={`/img/cat${counter + 1}.jpg`} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
                {/* bouncing chevron */}
                <div className="flex-1 flex justify-center items-center">
                    <motion.svg viewBox="0 0 16 16" fill="currentColor" className="h-6 text-dark-grey"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                    </motion.svg>
                </div>
            </div>
        </section>
    )
}
