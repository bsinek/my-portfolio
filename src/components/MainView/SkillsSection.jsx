const SkillsItem = ({ name, index }) => {
    return (
        <div className="h-14 px-4 flex items-center gap-4 rounded-md hover:bg-white/5">
            <span className="w-4 text-right">{index}</span>
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
                <span className="w-4 text-right">
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
                        <span className="text-light-grey font-light">24 skills</span>
                    </div>
                </div>
            </div>
            {/* CONTENT */}
            <div className="px-6 text-light-grey font-light">
                {categories.map((category, categoryIndex) => {
                    const startIndex = categories.slice(0, categoryIndex).reduce((acc, cat) => acc + cat.items.length, 1);
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