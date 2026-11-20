import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

// car photo that stays pinned, shrinks 1.05 -> 1 and fades out over its own height as the page scrolls over it.
// desktop scrolls inside MainView (pass its ref); mobile scrolls the window (no ref)
export const Hero = ({ scrollContainerRef }) => {
    const imageRef = useRef(null)
    const { scrollY } = useScroll(scrollContainerRef ? { container: scrollContainerRef } : undefined)
    const progress = useTransform(scrollY, y => Math.min(Math.max(y, 0) / (imageRef.current?.offsetHeight || 1), 1))
    const scale = useTransform(progress, [0, 1], [1.05, 1])
    const opacity = useTransform(progress, [0, 1], [1, 0])

    return (
        <>
            <motion.div ref={imageRef} style={{ scale, opacity }}
                className="sticky top-0 h-[max(300px,50svh)] xl:h-96 bg-[url(/img/car.jpg)] bg-cover bg-[72%_50%] xl:bg-[0%_50%] after:absolute after:inset-0 after:bg-linear-to-b after:from-transparent after:from-45% after:to-black/50 xl:after:hidden"
            />
            {/* floating hero text; on mobile the name is sized to the screen width so it always fills one line */}
            <div className="@container xl:[container-type:normal] absolute inset-x-0 xl:inset-x-auto top-0 z-[1] xl:z-auto flex h-[max(300px,50svh)] xl:h-96 flex-col justify-end p-4 xl:p-6 xl:font-light">
                <span className="mb-1 text-[13px] font-medium opacity-90 xl:mb-0 xl:ml-1 xl:text-sm xl:font-light xl:opacity-100">CS @ Georgia Tech</span>
                <h1 className="whitespace-nowrap xl:whitespace-normal font-black text-[13cqw] leading-none tracking-[-0.03em] xl:text-8xl xl:leading-28 xl:tracking-normal">benjamin sinek</h1>
                <span className="mt-2 flex items-center gap-1.5 text-[13px] opacity-90 xl:items-stretch xl:gap-2 xl:text-base xl:opacity-100">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="size-3 xl:size-auto xl:h-6 xl:p-1">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                    </svg>
                    <span className="flex items-center xl:text-sm">
                        <span>Los Angeles, CA</span>
                        <span className="mx-1.5 font-semibold xl:mx-2">•</span>
                        <span>Atlanta, GA</span>
                    </span>
                </span>
            </div>
        </>
    )
}
