import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, AnimatePresence } from "motion/react"

const TimelineDot = ({ item, isPassed, isActive, index }) => {
    const isLeft = index % 2 === 0;
    const dotTransition = {duration: 0.2};
    return (
        <div className="relative z-10 h-5 aspect-square">
            <div className="absolute inset-0 bg-dark-grey rounded-sm"/>
            <motion.div className="absolute inset-0 bg-white rounded-sm"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: isPassed ? 1 : 0, scale: isActive ? 2 : 1 }}
                transition={dotTransition}
            />
            <motion.div className={`absolute top-1/2 -translate-y-1/2 flex flex-col ${isLeft ? "right-full mr-10" : "left-full ml-10"}`}
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1.05 : 1 }}
                transition={dotTransition}
            >
                <span className="font-semibold whitespace-nowrap">{item.title}</span>
                <span className="text-sm text-light-grey whitespace-nowrap">{item.company} <b>•</b> {item.location}</span>
                <span className="text-sm text-light-grey whitespace-nowrap">{item.duration}</span>
            </motion.div>
        </div>
    )
}

const TimelineCard = ({ item, index }) => {
    const dataRef = useRef({ item, index });
    const currentItem = dataRef.current.item;
    const currentIndex = dataRef.current.index;
    
    return (
        <motion.div className="absolute w-full flex flex-col gap-6 p-16"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.2 }}
        >
            <div className="relative min-w-max flex justify-between items-baseline gap-4">
                {/* title */}
                <motion.h3 className="text-4xl font-bold"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                >
                    {currentItem.title}
                </motion.h3>
                {/* number */}
                <motion.span className="text-2xl font-light text-light-grey"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                >
                    0{currentIndex + 1}
                </motion.span>
                {/* underline */}
                <motion.div className="absolute -bottom-2 left-0 w-full h-0.5 bg-spotify-green"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    style={{ transformOrigin: "right" }}
                />
            </div>

            {/* metadata */}
            <motion.div className="flex gap-4 text-light-grey mt-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 }}
            >
                <span>{currentItem.company}</span>
                <span>•</span>
                <span>{currentItem.location}</span>
                <span>•</span>
                <span>{currentItem.duration}</span>
            </motion.div>

            {/* description */}
            <motion.ul className="flex flex-col gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.1 }}
            >
                {currentItem.description.map((desc, index) => (
                    <li key={index} className="pl-4 border-l-2 border-spotify-green/50">{desc}</li>
                ))}
            </motion.ul>
        </motion.div>
    )
}

export const Experience = ({ scrollContainerRef, headerVariant = "scroll" }) => {
    //        EDIT WORK EXPERIENCE HERE
    /*****************************************/
    const timelineData = [
        { 
            title: "Senior Software Engineer", 
            company: "Tech Corp", 
            location: "San Francisco, CA", 
            duration: "Jan 2024 - Present", 
            description: [
                "Led development of microservices architecture serving 10M+ users",
                "Reduced API response time by 40% through optimization",
                "Mentored team of 5 junior developers",
                "Implemented CI/CD pipeline reducing deployment time by 60%"
            ]
        },
        { 
            title: "Full Stack Developer", 
            company: "StartUp Inc", 
            location: "Remote", 
            duration: "Mar 2022 - Dec 2023", 
            description: [
                "Built responsive web applications using React and Node.js",
                "Designed and implemented RESTful APIs",
                "Collaborated with design team on UI/UX improvements",
                "Increased user engagement by 25% through feature development"
            ]
        },
        { 
            title: "Frontend Developer", 
            company: "Digital Agency", 
            location: "New York, NY", 
            duration: "Jun 2020 - Feb 2022", 
            description: [
                "Developed client websites using modern JavaScript frameworks",
                "Improved website performance and accessibility scores",
                "Worked directly with clients to gather requirements",
                "Maintained and updated legacy codebases"
            ]
        },
        { 
            title: "Junior Developer", 
            company: "Software Solutions", 
            location: "Austin, TX", 
            duration: "Aug 2018 - May 2020", 
            description: [
                "Assisted in development of enterprise web applications",
                "Fixed bugs and implemented new features",
                "Participated in code reviews and team meetings",
                "Learned best practices in software development"
            ]
        },
    ]
    
    /*================================= CONFIG & CONSTANTS =================================*/
    const ITEM_COUNT = timelineData.length;
    const timelineProgressMax = (ITEM_COUNT - 1) / ITEM_COUNT;
    const morphTransition = { duration: 0.8, ease: "easeInOut" };
    const morphRatio = 0.5; // relative to side panel

    /*================================= HEADER ANIMATIONS =================================*/
    // tracking
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { amount: 0.7 });
    const { scrollYProgress: headerScrollProgress } = useScroll({
        container: scrollContainerRef,
        target: headerRef,
        offset: ["start end", "end start"]
    });

    // header variations
    const scrollHeader = {
        pathStyle: { pathLength: useTransform(headerScrollProgress, [0.1, 0.5], [0, 1]) },
        textStyle: { 
            opacity: useTransform(headerScrollProgress, [0.1, 0.5], [0, 1]), 
            y: useTransform(headerScrollProgress, [0.1, 0.5], [50, 0])
        },
        pathAnimate: undefined,
        textAnimate: undefined,
        pathTransition: undefined,
        textTransition: undefined,
    };
    const inViewHeader = {
        pathStyle: undefined,
        textStyle: undefined,
        pathAnimate: { pathLength: headerInView ? 1 : 0 },
        textAnimate: { opacity: headerInView ? 1 : 0, y: headerInView ? 0 : 50},
        pathTransition: { duration: headerInView ? 0.5 : 0.2, delay: headerInView ? 0.3 : 0 },
        textTransition: { duration: 0.5 },
    };
    const headers = { scroll: scrollHeader, inView: inViewHeader };
    const header = headers[headerVariant] ?? headers.scroll;

    /*================================= TIMELINE LOGIC =================================*/
    // tracking & states
    const [activeIndex, setActiveIndex] = useState(0);
    const [cardKey, setCardKey] = useState(0);
    const [timelineActive, setTimelineActive] = useState(false);
    const [showIndicator, setShowIndicator] = useState(false);
    const timelineSectionRef = useRef(null);
    const { scrollYProgress: timelineScrollProgress } = useScroll({
        container: scrollContainerRef,
        target: timelineSectionRef,
        offset: ["start start", "end end"]
    });
    const timelineProgress = useTransform(timelineScrollProgress, [0, timelineProgressMax], [0, 1]);
    const indicatorProgress = useTransform(timelineScrollProgress, [timelineProgressMax, 1], [0, 1]);

    // active index & card rendering
    useMotionValueEvent(timelineScrollProgress, "change", (v) => {
        const index = Math.min(Math.floor(v * ITEM_COUNT), ITEM_COUNT - 1)
        setActiveIndex(index)
        setTimelineActive(v > 0)
        setShowIndicator(v > timelineProgressMax && v < 1)
    });
    useEffect(() => {
        setCardKey(prev => prev + 1);
    }, [timelineActive, activeIndex]);

    return (
        <section id="experience">
            {/* HEADER */}
            <div ref={headerRef} className="relative h-60 flex justify-center items-center mb-20">
                <svg viewBox="0 0 48 48" className="h-12 absolute top-0 left-100 stroke-white stroke-6 fill-none">
                    <motion.path
                        d="M3 48 L3 3 L48 3"
                        style={header.pathStyle}
                        animate={header.pathAnimate}
                        transition={header.pathTransition}
                    />
                </svg>
                <motion.h2 className="text-5xl font-semibold"
                    style={header.textStyle}
                    animate={header.textAnimate}
                    transition={header.textTransition}
                >
                    Experience
                </motion.h2>
                <svg viewBox="0 0 48 48" className="rotate-180 h-12 absolute bottom-0 right-100 stroke-white stroke-6 fill-none">
                    <motion.path
                        d="M3 48 L3 3 L48 3"
                        style={header.pathStyle}
                        animate={header.pathAnimate}
                        transition={header.pathTransition}
                    />
                </svg>
            </div>
            {/* BODY */}
            <div className="flex">
                {/* TIMELINE */}
                <section ref={timelineSectionRef} className="h-[400vh] flex-1">
                    <div className="sticky top-0 h-mainview flex justify-center p-16">
                        <div className="relative min-h-100">
                            <div className="absolute inset-y-2.5 left-1/2 -translate-x-1/2 w-1 bg-dark-grey/50"/>
                            <motion.div className="absolute inset-y-2.5 left-1/2 -translate-x-1/2 w-1 bg-spotify-green"
                                style={{
                                    scaleY: timelineProgress,
                                    originY: 0,
                                }}
                            />
                            <div className="h-full flex flex-col justify-between">
                                {timelineData.map((item, index) => (
                                    <TimelineDot
                                        key={index}
                                        item={item}
                                        isPassed={timelineActive && index <= activeIndex}
                                        isActive={timelineActive && index === activeIndex}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                {/* SIDE PANEL */}
                <motion.div className="sticky top-0 h-mainview overflow-hidden flex justify-center items-center"
                    initial={{ width: 0 }}
                    animate={{ width: timelineActive ? `${morphRatio * 100}%` : 0 }}
                    transition={morphTransition}
                >
                    <div className="relative h-full w-full flex justify-center items-center whitespace-nowrap">
                        {/* info cards */}
                        <AnimatePresence>
                            {timelineActive && (
                                <TimelineCard
                                    key={cardKey}
                                    item={timelineData[activeIndex]}
                                    index={activeIndex}
                                />
                            )}
                        </AnimatePresence>
                        
                        {/* next section indicator */}
                        <motion.div 
                            className="absolute bottom-8 right-8 flex gap-3 items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: showIndicator ? 1 : 0, y: showIndicator ? 0 : 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="text-sm text-light-grey">Next Section</span>
                            <div className="relative h-10 aspect-square flex justify-center items-center">
                                {/* progress ring */}
                                <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90 stroke-2 fill-none">
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r="16"
                                        className="stroke-dark-grey"
                                    />
                                    <motion.circle
                                        cx="20"
                                        cy="20"
                                        r="16"
                                        className="stroke-spotify-green"
                                        style={{ pathLength: indicatorProgress }}
                                    />
                                </svg>
                                {/* down arrow */}
                                <svg viewBox="0 0 16 16" className="w-4 h-4 fill-light-grey">
                                    <path d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                </svg>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
