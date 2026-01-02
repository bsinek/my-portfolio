import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView, useMotionValueEvent } from "motion/react"
import { HorizontalScroll } from "./HorizontalScroll"
import { Lorem } from "../Lorem"

const HeroSection = ({ img, position, size, scrollY }) => {
    const IMAGE_HEIGHT = 384; // h-96 == 384px
    const scale = useTransform(scrollY, [0, IMAGE_HEIGHT], [1.05, 1]);
    const opacity = useTransform(scrollY, [0, IMAGE_HEIGHT], [1, 0]);
    return (
        <section className="relative h-mainview overflow-x-clip flex flex-col">
            {/* fixed image container */}
            <motion.div className="rounded-t-lg sticky top-0"
                style={{
                    height: `${IMAGE_HEIGHT}px`,
                    backgroundImage: `url(${img})`,
                    backgroundPosition: position,
                    backgroundSize: size,
                    scale: scale,
                    opacity: opacity,
                }}>
            </motion.div>
            {/* floating hero text */}
            <div className="absolute top-0 flex flex-col justify-end p-6 font-light" style={{ height: `${IMAGE_HEIGHT}px` }}>
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
            <div className="relative bg-spotify-grey flex-1">
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

const TimelineDot = ({ isPassed }) => {
    return (
        <div className="relative z-10 h-5 aspect-square">
            <div className="absolute inset-0 bg-dark-grey"/>
            <motion.div className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: isPassed ? 1 : 0 }}
                transition={{ duration: 0.2 }}
            />
        </div>
    )
}


const TimelineCard = ({ item, isActive, index, activeIndex }) => {
    let x;
    if (index === activeIndex) {
        x = 0;
    } else if (index > activeIndex) {
        x = '100%';
    } else {
        x = '-100%';
    }
    
    return (
        <motion.div className="absolute"
            animate={{ opacity: isActive ? 1 : 0, x: x }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            {item.title}
        </motion.div>
    )
}

const Experience = ({ scrollContainerRef }) => {
    //        EDIT WORK EXPERIENCE HERE
    /*****************************************/
    const timelineData = [
        { title: "Item 1" },
        { title: "Item 2 "},
        { title: "Item 3 "},
        { title: "Item 4 "},
    ]
    const ITEM_COUNT = timelineData.length;
    const [activeIndex, setActiveIndex] = useState(0);

    const headerRef = useRef(null);
    const timelineSectionRef = useRef(null);
    const timelineRef = useRef(null);
    const headerInView = useInView(headerRef, { amount: 0.5 });
    const timelineInView = useInView(timelineRef, { amount: 1 });

    const { scrollYProgress } = useScroll({
        container: scrollContainerRef,
        target: timelineSectionRef,
    });

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        const index = Math.floor(v * (ITEM_COUNT - 1))
        setActiveIndex(index)
    });
    
    const svgTransition = { duration: headerInView ? 0.5 : 0.2, delay: headerInView ? 0.3 : 0 };
    const morphTransition = { duration: 0.8, ease: "easeInOut" };
    const morphRatio = 0.6; // relative to side panel

    return (
        <section className="flex">
            <div className="flex-1">
                {/* HEADER */}
                <div ref={headerRef} className="h-[32rem] mt-24 flex justify-center items-center">
                    <motion.div className="relative"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: timelineInView ? 0 : 1 }}
                        transition={morphTransition}
                    >
                        <motion.svg viewBox="0 0 48 48" className="h-12 absolute -top-24 -left-32 overflow-visible" stroke="currentColor" strokeWidth="6" fill="none">
                            <motion.path
                                d="M0 48 L0 0 L48 0"
                                animate={{ pathLength: headerInView ? 1 : 0 }}
                                transition={svgTransition}
                            />
                        </motion.svg>
                        <motion.div
                            animate={{ opacity: headerInView ? 1 : 0, y: headerInView ? 0 : 50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-5xl font-semibold">Experience</h2>
                        </motion.div>
                        <motion.svg viewBox="0 0 48 48" className="rotate-180 h-12 absolute -bottom-24 -right-32 overflow-visible" stroke="currentColor" strokeWidth="6" fill="none">
                            <motion.path
                                d="M0 48 L0 0 L48 0"
                                animate={{ pathLength: headerInView ? 1 : 0 }}
                                transition={svgTransition}
                            />
                        </motion.svg>
                    </motion.div>
                </div>
                {/* TIMELINE */}
                <section ref={timelineSectionRef} className="h-[200vh]">
                    <div ref={timelineRef} className="sticky top-0 h-mainview flex justify-center p-16">
                        <div className="relative">
                            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-dark-grey/50"/>
                            <motion.div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-spotify-green"
                                style={{
                                    scaleY: scrollYProgress,
                                    originY: 0,
                                }}>
                            </motion.div>
                            <div className="h-full flex flex-col justify-between">
                                {timelineData.map((_, index) => (
                                    <TimelineDot key={index} isPassed={timelineInView && (index <= activeIndex)} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* SIDE PANEL */}
            <motion.div className="sticky top-0 h-mainview overflow-hidden flex justify-center items-center"
                initial={{ width: 0 }}
                animate={{ width: timelineInView ? `${morphRatio * 100}%` : 0 }}
                transition={morphTransition}
            >
                <div className="relative h-full w-full flex justify-center items-center">
                    {timelineData.map((item, index) => (
                        <TimelineCard 
                            key={index} 
                            item={item}
                            isActive={index === activeIndex}
                            index={index}
                            activeIndex={activeIndex}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    )
}

export const MainView = ({ img, position, size }) => {
    const scrollContainerRef = useRef(null);
    const { scrollY } = useScroll({ container: scrollContainerRef })
    return (
        <section ref={scrollContainerRef} className="relative h-full overflow-y-auto rounded-lg bg-spotify-grey">
            <HeroSection img={img} position={position} size={size} scrollY={scrollY} />
            <Experience scrollContainerRef={scrollContainerRef} />
        </section>
    )
}
