import { useEffect, useState } from "react"
import { SECTIONS } from "../../config/sections"
import { contacts } from "../../config/contacts"
import { ABOUT } from "../../config/about"
import { useResumeUrl } from "../../hooks/useResumeUrl"
import { Hero } from "../Hero/Hero"
import expSnapshot from "../../data/experiences.json"
import projSnapshot from "../../data/projects.json"
import skillSnapshot from "../../data/skills.json"

const Icon = ({ d, className, evenOdd }) => (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
        <path fillRule={evenOdd ? "evenodd" : undefined} d={d} />
    </svg>
)
const PATHS = {
    download: "M8 1a.5.5 0 0 1 .5.5v9.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 1 1 .708-.708L7.5 11.293V1.5A.5.5 0 0 1 8 1",
    location: "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6",
    pin: "M8.822.797a2.72 2.72 0 0 1 3.847 0l2.534 2.533a2.72 2.72 0 0 1 0 3.848l-3.678 3.678-1.337 4.988-4.486-4.486L1.28 15.78a.75.75 0 0 1-1.06-1.06l4.422-4.422L.156 5.812l4.987-1.337z",
    chevron: "M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708",
}

// same wording as desktop: "3 items" / "1 item"
const items = n => `${n} ${n === 1 ? "item" : "items"}`
const PLAYLISTS = ["experience", "projects", "skills"]

// item counts for the playlist rows: bundled snapshot first, live API if it loads (same sources as desktop)
const useCounts = () => {
    const [counts, setCounts] = useState({
        experience: expSnapshot.length,
        projects: projSnapshot.length,
        skills: skillSnapshot.reduce((n, c) => n + c.skills.length, 0),
    })
    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL
        const get = path => fetch(`${apiUrl}/api/${path}/`).then(res => { if (!res.ok) throw new Error(res.status); return res.json() })
        get("experiences").then(d => setCounts(c => ({ ...c, experience: d.length }))).catch(() => {})
        get("projects").then(d => setCounts(c => ({ ...c, projects: d.length }))).catch(() => {})
        get("skills").then(d => setCounts(c => ({ ...c, skills: d.reduce((n, cat) => n + cat.skills.length, 0) }))).catch(() => {})
    }, [])
    return counts
}

const Contacts = ({ resumeUrl }) => (
    <div className="flex items-center gap-[18px] px-4 pt-1 pb-2">
        <a href={resumeUrl} target="_blank"
            className="flex items-center gap-1.5 rounded-full border border-[#7c7c7c] px-3.5 py-1.5 text-[13px] font-semibold">
            <Icon d={PATHS.download} className="size-3" />Resume
        </a>
        {contacts(resumeUrl).filter(c => ["LinkedIn", "GitHub", "Email"].includes(c.label)).map(({ label, href, d }) => (
            <a key={label} href={href} target="_blank" aria-label={label} className="size-[26px] text-light-grey active:text-white">
                <Icon d={d} className="size-full" />
            </a>
        ))}
    </div>
)

const Heading = ({ children }) => <h2 className="px-4 pt-6 pb-3 text-xl font-bold tracking-[-0.3px]">{children}</h2>

// rows styled like Spotify's "Popular" list
const PlaylistRow = ({ id, num, count }) => (
    <div className="flex min-h-16 items-center gap-3 px-4 py-2">
        <span className="w-4 flex-none text-center text-[15px] text-light-grey">{num}</span>
        <span className="size-12 flex-none rounded bg-cover bg-top" style={{ backgroundImage: `url(${SECTIONS[id].img})` }} />
        <span className="min-w-0 flex-1">
            <div className="truncate text-base">{SECTIONS[id].title}</div>
            <div className="mt-0.5 flex items-center gap-1 text-sm text-light-grey">
                <Icon d={PATHS.pin} className="size-[11px] flex-none text-spotify-green" />Playlist · {items(count)}
            </div>
        </span>
        <Icon d={PATHS.chevron} evenOdd className="size-4 flex-none text-light-grey" />
    </div>
)

const AboutCard = () => (
    <div className="mx-4 overflow-hidden rounded-lg bg-[#1f1f1f] [&_p_span]:font-semibold">
        <div className="relative h-[180px] bg-[url(/img/cat1.jpg)] bg-cover bg-center">
            <span className="absolute bottom-3 left-4 text-[15px] font-bold">Benjamin Sinek</span>
        </div>
        {ABOUT.map((text, i) => <p key={i} className="px-4 pt-3.5 text-sm leading-normal text-light-grey last:pb-4">{text}</p>)}
    </div>
)

// below xl: Spotify artist page (mockup A)
export const MobileHome = () => {
    const counts = useCounts()
    const resumeUrl = useResumeUrl()
    return (
        <main className="relative min-h-svh overflow-x-clip bg-spotify-grey pb-[calc(32px+env(safe-area-inset-bottom))] text-white">
            <Hero />
            <div className="relative z-[2] bg-spotify-grey pt-3">
                <Contacts resumeUrl={resumeUrl} />
                <Heading>Playlists</Heading>
                {PLAYLISTS.map((id, i) => <PlaylistRow key={id} id={id} num={i + 1} count={counts[id]} />)}
                <Heading>About</Heading>
                <AboutCard />
            </div>
        </main>
    )
}
