import { useRef } from "react"
import { AboutSection } from "./AboutSection"
import { Experience } from "./Experience"
import { Projects } from "./Projects"
import { SkillsSection } from "./SkillsSection"
import { Lorem } from "../../Lorem"
import { useMotionValueEvent, useScroll } from "motion/react"
import { SECTION_ORDER } from "../../config/sections"

export const MainView = ({ setActiveSection, setSectionProgress }) => {
    const scrollContainerRef = useRef(null);

    const aboutRef = useRef(null)
    const experienceRef = useRef(null)
    const projectsRef = useRef(null)
    const skillsRef = useRef(null)

    const refsMap = {
        about: aboutRef,
        experience: experienceRef,
        projects: projectsRef,
        skills: skillsRef,
    };

    const { scrollY } = useScroll({ container: scrollContainerRef })

    useMotionValueEvent(scrollY, "change", (v) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let index = 0;
        for (let i = 0; i < SECTION_ORDER.length; i++) {
            const section = SECTION_ORDER[i];
            const top = refsMap[section].current.offsetTop;
            if (v >= top) index = i;
        }
        
        const activeId = SECTION_ORDER[index];
        const nextId = SECTION_ORDER[index + 1];

        const start = refsMap[activeId].current.offsetTop;
        const end = nextId ? refsMap[nextId].current.offsetTop : container.scrollHeight - container.clientHeight;

        const progress = (v - start) / (end - start);

        setActiveSection(activeId)
        setSectionProgress(progress)
    })

    const sectionComponents = {
        about: <AboutSection scrollContainerRef={scrollContainerRef} />,
        experience: <Experience scrollContainerRef={scrollContainerRef} headerVariant="scroll" />,
        projects: <Projects />,
        skills: <SkillsSection />,
    };

    return (
        <section ref={scrollContainerRef} className="relative h-full overflow-y-auto rounded-lg bg-spotify-grey flex flex-col gap-36 scroll-smooth">
            {SECTION_ORDER.map(id => (
                <div key={id} ref={refsMap[id]}>
                    {sectionComponents[id]}
                </div>
            ))}
        </section>
    )
}
