import { useRef } from "react"
import { useScroll } from "motion/react"
import { HeroSection } from "./HeroSection"
import { Experience } from "./Experience"
import { Projects } from "./Projects"
import { SkillsSection } from "./SkillsSection"
import { Lorem } from "../../Lorem"

export const MainView = ({ img, position, size }) => {
    const scrollContainerRef = useRef(null);
    const { scrollY } = useScroll({ container: scrollContainerRef })
    return (
        <section ref={scrollContainerRef} className="relative h-full overflow-y-auto rounded-lg bg-spotify-grey flex flex-col gap-36 scroll-smooth">
            <HeroSection img={img} position={position} size={size} scrollY={scrollY} />
            <Experience scrollContainerRef={scrollContainerRef} headerVariant="scroll" />
            <Projects />
            <SkillsSection />
        </section>
    )
}
