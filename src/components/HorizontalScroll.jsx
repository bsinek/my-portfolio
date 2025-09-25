import { useState, useEffect, useRef } from "react"

export const HorizontalScroll = ({ children }) => {
    const containerRef = useRef(null);
    const [translateX, setTranslateX] = useState(0);
    
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            e.preventDefault();
            setTranslateX(prev => prev - e.deltaY);
        };
        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, []);

    return (
        <div ref={containerRef} className="h-[300px] overflow-hidden">
            <div className="h-full flex transition-transform duration-100" style={{ transform: `translateX(${translateX}px)` }}>
                {children}
            </div>
        </div>
    );
}
