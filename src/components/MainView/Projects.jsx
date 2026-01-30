import { SECTIONS } from "../../config/sections";
import { useState } from "react";

const ProjectsItem = ({ index, name, date, tech, desc, icon, href, onHover, onLeave }) => {
    return (
        <a href={href} target="_blank" className="group relative h-14 px-4 flex items-center gap-12 rounded-md hover:bg-white/5 transition-colors text-sm"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            <div className="relative w-4 h-full overflow-visible tabular-nums">
                <svg viewBox="0 0 24 24" fill="currentColor" className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-0">
                    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"/>
                </svg>
                <span className="text-base absolute top-1/2 right-1/2 translate-x-[0.5ch] -translate-y-1/2 group-hover:opacity-0 transition-opacity duration-0">
                    {index}
                </span>
            </div>
            <div className="flex-2 flex gap-3 items-center -ml-8">
                <div className="h-10 aspect-square rounded-sm overflow-hidden">
                    {/* <Icon /> */}
                    <img src={icon} className="h-full w-full object-cover" />
                </div>
                <span className="line-clamp-1">{name}</span>
            </div>
            <span className="flex-3 line-clamp-2">{desc}</span>
            <span className="flex-3 flex flex-wrap line-clamp-2">
                {tech.map((item, index) => (
                    <span key={index} className="">
                        {item}
                        {index !== tech.length - 1 && (
                            <span className="mx-1.5">|</span>
                        )}
                    </span>
                ))}
            </span>
            <span className="flex-2 flex justify-center">{date}</span>
        </a>
    )
}

export const Projects = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [lastHoveredIndex, setLastHoveredIndex] = useState(0);
    
    const items = [
        {
            name: "Developer Portfolio",
            date: 2026,
            tech: ["React", "Tailwind CSS", "Framer Motion", "Tailwind CSS"],
            desc: "Interactive portfolio with Spotify-inspired design and smooth animations.",
            img: "/img/projects/portfolio.jpg",
            icon: "/img/favicon.svg",
            href: "https://github.com/bsinek/my-portfolio"
        },
        {
            name: "Chicken Tournament",
            date: 2026,
            tech: ["TensorFlow", "Keras", "Python"],
            desc: "Modern showcase of development projects with responsive design.",
            img: "/img/projects/chicken.png",
            icon: "/img/projects/chicken_icon.png",
            href: "https://github.com/bsinek/cs3600-chicken-game"
        },
        {
            name: "Developer Portfolio",
            date: 2026,
            tech: ["React", "Tailwind CSS", "Framer Motion"],
            desc: "Portfolio featuring dynamic content and seamless UX.",
            img: "/img/projects/travelsmart.jpg",
            icon: "/img/projects/travelsmart_icon.png",
            href: "https://github.com/johnkingdon/TravelSmart"
        },
    ]

    const titleBarHeight = 36 + 16; // h-9 + mb-4
    const itemHeight = 56; // h-14
    const currentIndex = hoveredIndex !== null ? hoveredIndex : lastHoveredIndex;
    const tooltipTop = titleBarHeight + (currentIndex * itemHeight) + (itemHeight / 2);

    return (
        <section id="projects" className="pb-6">
            <div className="h-72 p-6 flex gap-6">
                <div className="h-full aspect-square rounded-md bg-dark-grey overflow-hidden">
                    {/* IMAGE HERE */}
                    <img src={SECTIONS.projects.img}/>
                </div>
                <div className="flex flex-col justify-end gap-2">
                    <span>Playlist</span>
                    <span className="text-8xl font-black">Projects</span>
                    <div className="flex gap-1 text-sm items-center mt-2">
                        <a href="#about" className="flex gap-1 items-center">
                            <div className="h-6 aspect-square rounded-full bg-dark-grey mr-1 overflow-hidden">
                                <img src="/img/cat1.jpg" className="h-full w-full object-cover" />
                            </div>
                            <h2 className="font-semibold">Benjamin Sinek</h2>
                        </a>
                        <span className="text-light-grey font-bold">•</span>
                        <span className="text-light-grey font-light">{items.length} {items.length > 1 ? "items" : "item"}</span>
                    </div>
                </div>
            </div>
            {/* CONTENT */}
            <section className="px-6 text-light-grey font-light relative">
                {/* title bar */}
                <div className="h-9 px-4 mb-4 flex items-center gap-12 border-b border-light-grey/20 text-sm">
                    <span className="w-4 text-center text-base -mr-8">#</span>
                    <span className="flex-2">Project Name</span>
                    <span className="flex-3">Description</span>
                    <span className="flex-3">Tech Stack</span>
                    <span className="flex-2 flex justify-center">Year</span>
                </div>
                {/* items */}
                {items.map((item, index) => (
                    <ProjectsItem 
                        key={index} 
                        index={index + 1} 
                        {...item}
                        onHover={() => { setHoveredIndex(index); setLastHoveredIndex(index); }}
                        onLeave={() => setHoveredIndex(null)}
                    />
                ))}
                {/* floating container */}
                <div className={`absolute pointer-events-none top-0 right-6 -translate-y-1/2 transition-all duration-300 ${hoveredIndex === null ? 'opacity-0' : 'opacity-100'}`}
                    style={{ transform: `translateY(${tooltipTop}px)` }}
                >
                    <div className="bg-white/10 rounded-md h-34 aspect-video overflow-hidden">
                        {hoveredIndex !== null && (
                            <img src={items[hoveredIndex].img} className="h-full w-full object-cover" />
                        )}
                    </div>
                </div>
            </section>
        </section>
    )
}