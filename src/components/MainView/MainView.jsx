import { useRef } from "react"
import { HeroSection } from "./HeroSection"
import { Experience } from "./Experience"
import { Projects } from "./Projects"
import { SkillsSection } from "./SkillsSection"
import { Lorem } from "../../Lorem"
import { useMotionValueEvent, useScroll, useTransform } from "motion/react"

export const MainView = ({ setActiveSection, setSectionProgress }) => {
    const scrollContainerRef = useRef(null);

    const aboutRef = useRef(null)
    const experienceRef = useRef(null)
    const projectsRef = useRef(null)
    const skillsRef = useRef(null)

    const { scrollY } = useScroll({ container: scrollContainerRef })

    useMotionValueEvent(scrollY, "change", (v) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        
        const sections = [
            { id: "about", ref: aboutRef },
            { id: "experience", ref: experienceRef },
            { id: "projects", ref: projectsRef },
            { id: "skills", ref: skillsRef },
        ]

        let index = 0;
        for (let i = 0; i < sections.length; i++) {
            const top = sections[i].ref.current.offsetTop;
            if (v >= top) index = i;
        }
        
        const active = sections[index]
        const next = sections[index + 1]

        const start = active.ref.current.offsetTop;
        const end = next?.ref.current.offsetTop ?? container.scrollHeight - container.clientHeight;

        const progress = (v - start) / (end - start);

        setActiveSection(active.id)
        setSectionProgress(progress)
    })

    return (
        <section ref={scrollContainerRef} className="relative h-full overflow-y-auto rounded-lg bg-spotify-grey flex flex-col gap-36 scroll-smooth">
            <div ref={aboutRef}>
                <HeroSection scrollContainerRef={scrollContainerRef} />
            </div>
            <div ref={experienceRef}>
                <Experience scrollContainerRef={scrollContainerRef} headerVariant="scroll" />
            </div>
            <div ref={projectsRef}>
                <Projects />
            </div>
            <div ref={skillsRef}>
                <SkillsSection />
            </div>
        </section>
    )
}
