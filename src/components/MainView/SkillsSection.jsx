const SkillsItem = ({ name, index }) => {
    return (
        <div className="group h-14 px-4 flex items-center gap-4 rounded-md hover:bg-white/5">
            <div className="relative w-4 h-full overflow-visible tabular-nums">
                <svg viewBox="0 0 24 24" fill="currentColor" className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-0">
                    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"/>
                </svg>
                <span className="absolute top-1/2 right-1/2 translate-x-[0.5ch] -translate-y-1/2 group-hover:opacity-0 transition-opacity duration-0">
                    {index}
                </span>
            </div>

            <div className="flex-1 flex gap-3 items-center">
                <div className="h-10 aspect-square rounded-sm bg-dark-grey"></div>
                <span className="text-sm">{name}</span>
            </div>
        </div>
    )
}

const SkillsCategory = ({ title, items, startIndex, isFirst }) => {
    return (
        <section className={!isFirst ? "mt-4" : ""}>
            <div className="h-9 px-4 mb-4 flex items-center gap-4 border-b border-light-grey/20">
                <span className="w-4 text-center">
                    {isFirst && "#"}
                </span>
                <span className="flex-1 text-sm">{title}</span>
            </div>
            {items.map((item, index) => (
                <SkillsItem key={index} name={item.name} index={startIndex + index} />
            ))}
        </section>
    )
}

export const SkillsSection = () => {
    const categories = [
        {
            title: "Development",
            items: [
                { name: "React" },
                { name: "Vite" },
                { name: "TailwindCSS" },
                { name: "React" },
                { name: "Vite" },
                { name: "TailwindCSS" },
            ]
        },
        {
            title: "Design",
            items: [
                { name: "Figma" },
                { name: "Blender" },
                { name: "Figma" },
                { name: "Blender" },
            ]
        },
        {
            title: "Admin",
            items: [
                { name: "??" },
                { name: "??" },
                { name: "??" },
                { name: "??" },
            ]
        },
    ]

    const totalSkills = categories.reduce((counter, category) => counter + category.items.length, 0);

    return (
        <section className="pb-8">
            <div className="h-72 p-6 flex gap-6">
                <div className="h-full aspect-square rounded-md bg-dark-grey"/>
                <div className="flex flex-col justify-end gap-2">
                    <span>Playlist</span>
                    <span className="text-8xl font-black">Skills</span>
                    <div className="flex gap-1 text-sm items-center mt-2">
                        <div className="h-6 aspect-square rounded-full bg-dark-grey mr-1"/>
                        <h2 className="font-semibold">Benjamin Sinek</h2>
                        <span className="text-light-grey font-bold">•</span>
                        <span className="text-light-grey font-light">{totalSkills} skills</span>
                    </div>
                </div>
            </div>
            {/* CONTENT */}
            <div className="px-6 text-light-grey font-light">
                {categories.map((category, categoryIndex) => {
                    const startIndex = categories.slice(0, categoryIndex).reduce((counter, prevCategory) => counter + prevCategory.items.length, 1);
                    return (
                        <SkillsCategory
                            key={category.title}
                            {...category}
                            startIndex={startIndex}
                            isFirst={categoryIndex === 0}
                        />
                    );
                })}
            </div>
        </section>
    )
}