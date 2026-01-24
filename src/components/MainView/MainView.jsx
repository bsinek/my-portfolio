import { useRef } from "react"
import { HeroSection } from "./HeroSection"
import { Experience } from "./Experience"
import { Projects } from "./Projects"
import { SkillsSection } from "./SkillsSection"
import { Lorem } from "../../Lorem"

export const MainView = () => {
    const scrollContainerRef = useRef(null);
    return (
        <section ref={scrollContainerRef} className="relative h-full overflow-y-auto rounded-lg bg-spotify-grey flex flex-col gap-36 scroll-smooth">
            <HeroSection scrollContainerRef={scrollContainerRef} />
            <Experience scrollContainerRef={scrollContainerRef} headerVariant="scroll" />
            <Projects />
            <SkillsSection />
        </section>
    )
}
