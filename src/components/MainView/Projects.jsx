const ProjectsItem = ({ index, name, date, tech }) => {
    return (
        <div className="group h-14 px-4 flex items-center gap-4 rounded-md hover:bg-white/5 text-sm">
            <div className="relative w-4 h-full overflow-visible tabular-nums">
                <svg viewBox="0 0 24 24" fill="currentColor" className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-0">
                    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"/>
                </svg>
                <span className="text-base absolute top-1/2 right-1/2 translate-x-[0.5ch] -translate-y-1/2 group-hover:opacity-0 transition-opacity duration-0">
                    {index}
                </span>
            </div>
            <div className="flex-2 flex gap-3 items-center">
                <div className="h-10 aspect-square rounded-sm overflow-hidden bg-dark-grey">
                    {/* <Icon /> */}
                </div>
                <span>{name}</span>
            </div>
            <span className="flex-3">
                {tech.map((item, index) => (
                    <>
                        <span key={index}>
                            {item}
                            {index !== tech.length - 1 && (
                                <span className="font-bold mx-2">•</span>
                            )}
                        </span>
                    </>
                ))}
            </span>
            <span className="w-32">{date}</span>
        </div>
    )
}

export const Projects = () => {
    const items = [
        {
            name: "Developer Portfolio",
            date: 2026,
            tech: ["React", "Tailwind CSS", "Framer Motion"],
        },
        {
            name: "Developer Portfolio",
            date: 2026,
            tech: ["React", "Tailwind CSS", "Framer Motion"],
        },
        {
            name: "Developer Portfolio",
            date: 2026,
            tech: ["React", "Tailwind CSS", "Framer Motion"],
        },
        {
            name: "Developer Portfolio",
            date: 2026,
            tech: ["React", "Tailwind CSS", "Framer Motion"],
        },
    ]

    return (
        <section className="pb-6">
            <div className="h-72 p-6 flex gap-6">
                <div className="h-full aspect-square rounded-md bg-dark-grey">
                    {/* IMAGE HERE */}
                </div>
                <div className="flex flex-col justify-end gap-2">
                    <span>Playlist</span>
                    <span className="text-8xl font-black">Projects</span>
                    <div className="flex gap-1 text-sm items-center mt-2">
                        <div className="h-6 aspect-square rounded-full bg-dark-grey mr-1"/>
                        <h2 className="font-semibold">Benjamin Sinek</h2>
                        <span className="text-light-grey font-bold">•</span>
                        <span className="text-light-grey font-light">{items.length} {items.length > 1 ? "items" : "item"}</span>
                    </div>
                </div>
            </div>
            {/* CONTENT */}
            <section className="px-6 text-light-grey font-light">
                {/* title bar */}
                <div className="h-9 px-4 mb-4 flex items-center gap-4 border-b border-light-grey/20 text-sm">
                    <span className="w-4 text-center text-base">#</span>
                    <span className="flex-2">Project Name</span>
                    <span className="flex-3">Tech Stack</span>
                    <span className="w-32">Year</span>
                </div>
                {/* items */}
                {items.map((item, index) => (
                    <ProjectsItem key={index} index={index + 1} {...item} />
                ))}
            </section>
        </section>
    )
}