// icons from:  https://techicons.dev/
//              https://icons8.com/
//              https://www.svgrepo.com/
//              https://www.streamlinehq.com/
import { useEffect, useState } from "react";
import { SECTIONS } from "../../config/sections";
import { 
    PythonIcon, JavaIcon, CIcon, JavaScriptIcon, HTMLIcon, CSSIcon, 
    ReactIcon, TailwindCSSIcon, TensorFlowIcon, DjangoIcon, 
    NumPyIcon, PandasIcon, ScikitLearnIcon, MatplotlibIcon, KerasIcon, 
    GitIcon, NodeJSIcon, ViteIcon, QuantConnectIcon, VercelIcon
} from "../../icons"

const iconMap = {
    PythonIcon, JavaIcon, CIcon, JavaScriptIcon, HTMLIcon, CSSIcon,
    ReactIcon, TailwindCSSIcon, TensorFlowIcon, DjangoIcon,
    NumPyIcon, PandasIcon, ScikitLearnIcon, MatplotlibIcon, KerasIcon,
    GitIcon, NodeJSIcon, ViteIcon, QuantConnectIcon, VercelIcon
};

const SkillsItem = ({ index, name, icon: Icon }) => {
    return (
        <div className="group h-14 px-4 flex items-center gap-4 rounded-md hover:text-white transition-colors">
            <div className="relative w-4 h-full overflow-visible tabular-nums">
                <svg viewBox="0 0 24 24" fill="currentColor" className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-0">
                    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"/>
                </svg>
                <span className="absolute top-1/2 right-1/2 translate-x-[0.5ch] -translate-y-1/2 group-hover:opacity-0 transition-opacity duration-0">
                    {index}
                </span>
            </div>

            <div className="flex-1 flex gap-3 items-center">
                <div className="h-10 aspect-square rounded-sm overflow-hidden">
                    <Icon />
                </div>
                <span className="text-sm">{name}</span>
            </div>
        </div>
    )
}

const SkillsCategory = ({ category, skills, startIndex, isFirst }) => {
    return (
        <section className={!isFirst ? "mt-4" : ""}>
            <div className="h-9 px-4 mb-4 flex items-center gap-4 border-b border-light-grey/20">
                <span className="w-4 text-center">
                    {isFirst && "#"}
                </span>
                <span className="flex-1 text-sm">{category}</span>
            </div>
            {skills.map((skill, index) => {
                const IconComponent = iconMap[skill.icon];
                return (
                    <SkillsItem 
                        key={index} 
                        index={startIndex + index} 
                        name={skill.name}
                        icon={IconComponent || (() => <div>?</div>)}
                    />
                );
            })}
        </section>
    )
}

export const SkillsSection = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL
        fetch(`${apiUrl}/api/skills/`)
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            }).catch(err => console.error("Error fetching skills:", err))
    }, [])

    const totalSkills = categories.reduce((counter, category) => counter + category.skills.length, 0);

    return (
        <section id="skills" className="pb-6">
            <div className="h-72 p-6 flex gap-6">
                <div className="h-full aspect-square rounded-md bg-dark-grey overflow-hidden">
                    {/* IMAGE HERE */}
                    <img src={SECTIONS.skills.img}/>
                </div>
                <div className="flex flex-col justify-end gap-2">
                    <span>Playlist</span>
                    <span className="text-8xl font-black">Skills</span>
                    <div className="flex gap-1 text-sm items-center mt-2">
                        <a href="#about" className="flex gap-1 items-center">
                            <div className="h-6 aspect-square rounded-full bg-dark-grey mr-1 overflow-hidden">
                                <img src="/img/cat1.jpg" className="h-full w-full object-cover" />
                            </div>
                            <h2 className="font-semibold">Benjamin Sinek</h2>
                        </a>
                        <span className="text-light-grey font-bold">•</span>
                        <span className="text-light-grey font-light">{totalSkills} {totalSkills > 1 ? "items" : "item"}</span>
                    </div>
                </div>
            </div>
            {/* CONTENT */}
            <div className="px-6 text-light-grey font-light">
                {categories.map((category, categoryIndex) => {
                    const startIndex = categories.slice(0, categoryIndex).reduce((counter, prevCategory) => counter + prevCategory.skills.length, 1);
                    return (
                        <SkillsCategory
                            key={category.category}
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