import { useEffect, useState } from "react"
import expSnapshot from "../data/experiences.json"
import projSnapshot from "../data/projects.json"
import skillSnapshot from "../data/skills.json"

// experiences, projects and skills: bundled snapshot first, live API if it loads (same sources as desktop)
export const useSiteData = () => {
    const [exps, setExps] = useState(expSnapshot)
    const [projs, setProjs] = useState(projSnapshot)
    const [cats, setCats] = useState(skillSnapshot)
    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL
        const get = (path, set) => fetch(`${apiUrl}/api/${path}/`)
            .then(res => { if (!res.ok) throw new Error(res.status); return res.json() })
            .then(set)
            .catch(() => console.warn(`Failed to fetch ${path} from API, using snapshot`))
        get("experiences", setExps)
        get("projects", setProjs)
        get("skills", setCats)
    }, [])
    return { exps, projs, cats }
}

export const itemCounts = ({ exps, projs, cats }) => ({
    experience: exps.length,
    projects: projs.length,
    skills: cats.reduce((n, c) => n + c.skills.length, 0),
})
