import { useState, useRef } from "react"

const projects = [
    { title: "E-Commerce Platform", tech: ["React", "Node.js", "MongoDB"] },
    { title: "Task Manager App", tech: ["Vue", "Firebase", "Tailwind"] },
    { title: "Portfolio Website", tech: ["Next.js", "TypeScript", "Framer"] },
    { title: "Weather Dashboard", tech: ["Angular", "RxJS", "Chart.js"] },
    { title: "Blog Platform", tech: ["React", "Vite", "Supabase"] },
]

const CarouselSlide = ({ title, tech, isActive, offset }) => {
    const getScale = () => {
        if (offset === 0) return 1
        if (Math.abs(offset) === 1) return 0.7
        return 0.5
    }

    const isWrapping = Math.abs(offset) > 2

    return (
        <div 
            className="absolute top-0 flex flex-col items-center transition-all duration-500 ease-out"
            style={{
                left: `${50 + offset * 35}%`,
                transform: `translateX(-50%) scale(${getScale()})`,
                opacity: isWrapping ? 0 : Math.abs(offset) > 1.5 ? 0 : 1,
                zIndex: isActive ? 10 : 1,
                visibility: isWrapping ? 'hidden' : 'visible',
            }}
        >
            <div className="h-72 aspect-square bg-dark-grey rounded-3xl"></div>
            <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                    {tech.map((t, i) => (
                        <span key={i} className="text-sm px-3 py-1 bg-spotify-grey rounded-full text-light-grey">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const ProjectsCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const dragStartX = useRef(0)
    const isDragging = useRef(false)
    const lastScrollTime = useRef(0)

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
    }

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % projects.length)
    }

    const handleMouseDown = (e) => {
        isDragging.current = true
        dragStartX.current = e.clientX
    }

    const handleMouseMove = (e) => {
        if (!isDragging.current) return
        const diff = e.clientX - dragStartX.current
        if (Math.abs(diff) > 50) {
            if (diff > 0) handlePrev()
            else handleNext()
            isDragging.current = false
        }
    }

    const handleMouseUp = () => {
        isDragging.current = false
    }

    const handleWheel = (e) => {
        e.preventDefault()
        const now = Date.now()
        if (now - lastScrollTime.current < 300) return
        lastScrollTime.current = now
        
        if (Math.abs(e.deltaY) > 20) {
            if (e.deltaY > 0) handleNext()
            else handlePrev()
        }
    }

    const getDisplayedSlides = () => {
        const slides = []
        for (let i = -2; i <= 2; i++) {
            const index = (activeIndex + i + projects.length) % projects.length
            slides.push({ ...projects[index], offset: i, index })
        }
        return slides
    }

    return (
        <div className="relative w-full">
            <div 
                className="relative h-[450px] cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
            >
                {projects.map((project, i) => {
                    const offset = (i - activeIndex + projects.length + 2) % projects.length - 2
                    if (Math.abs(offset) > 2) return null
                    return (
                        <CarouselSlide
                            key={i}
                            title={project.title}
                            tech={project.tech}
                            isActive={offset === 0}
                            offset={offset}
                        />
                    )
                })}
            </div>
            <div className="flex justify-center gap-4 mt-8">
                <button onClick={handlePrev} className="px-6 py-2 bg-dark-grey rounded-full hover:bg-light-grey/20 transition-colors">
                    Prev
                </button>
                <button onClick={handleNext} className="px-6 py-2 bg-dark-grey rounded-full hover:bg-light-grey/20 transition-colors">
                    Next
                </button>
            </div>
        </div>
    )
}
