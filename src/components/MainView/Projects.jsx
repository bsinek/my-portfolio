import EmblaCarousel from "./EmblaCarousel"
import "./embla.css"

export const Projects = () => {
    const slides = [0, 1, 2, 3, 4]
    return (
        <section className="h-mainview">
            <h2 className="text-4xl font-semibold mb-8">Projects</h2>
            <EmblaCarousel
                slides={slides}
                options={{ loop: true, align: "center" }}
            />
        </section>
    )
}