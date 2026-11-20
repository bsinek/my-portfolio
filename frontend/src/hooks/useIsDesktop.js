import { useEffect, useState } from "react"

// matches Tailwind's xl breakpoint, where the desktop layout (sidebar, scroll timeline, hover table) kicks in
const QUERY = "(min-width: 1280px)"

export const useIsDesktop = () => {
    const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(QUERY).matches)

    useEffect(() => {
        const mql = window.matchMedia(QUERY)
        const onChange = (e) => setIsDesktop(e.matches)
        mql.addEventListener("change", onChange)
        return () => mql.removeEventListener("change", onChange)
    }, [])

    return isDesktop
}
