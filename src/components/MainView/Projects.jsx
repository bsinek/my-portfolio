import { ProjectsCarousel } from "./ProjectsCarousel"

export const Projects = () => {
    return (
        <section className="h-mainview flex flex-col justify-center gap-12 px-8 mt-24">
            <h2 className="text-5xl font-bold mb-4">Projects</h2>
            <ProjectsCarousel />
        </section>
    )
}