import { useRef } from "react"
import { motion, useTransform, useScroll } from "motion/react"

export const HorizontalScroll = ({ children, scrollContainerRef }) => {
    const containerRef = useRef(null);
    
    const { scrollYProgress } = useScroll({
        container: scrollContainerRef,
        target: containerRef,
    });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
    return (
        <div ref={containerRef} className="relative h-[500vh] bg-neutral-900">
            <div className="sticky top-1/2 h-[50vh]">
                <motion.div style={{ x }} className="absolute flex gap-4">
                    {children}
                </motion.div>
            </div>
        </div>
    );
}
