import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { SECTIONS } from "../../config/sections"
import expSnapshot from "../../data/experiences.json"
import projSnapshot from "../../data/projects.json"
import skillSnapshot from "../../data/skills.json"

const Icon = ({ d, className, evenOdd }) => (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
        <path fillRule={evenOdd ? "evenodd" : undefined} d={d} />
    </svg>
)
const PATHS = {
    linkedin: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z",
    github: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8",
    email: "M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z",
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
    const [resumeUrl, setResumeUrl] = useState("/docs/Benjamin_Sinek_Resume.pdf")
    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL
        const get = path => fetch(`${apiUrl}/api/${path}/`).then(res => { if (!res.ok) throw new Error(res.status); return res.json() })
        get("experiences").then(d => setCounts(c => ({ ...c, experience: d.length }))).catch(() => {})
        get("projects").then(d => setCounts(c => ({ ...c, projects: d.length }))).catch(() => {})
        get("skills").then(d => setCounts(c => ({ ...c, skills: d.reduce((n, cat) => n + cat.skills.length, 0) }))).catch(() => {})
        get("resume").then(d => d.file && setResumeUrl(`${apiUrl}${d.file}`)).catch(() => {})
    }, [])
    return { counts, resumeUrl }
}

const HERO_H = "h-[max(300px,50svh)]"

// car photo stays put, shrinks from 1.05 to 1 and fades as the page slides over it (same as desktop)
const Hero = () => {
    const { scrollY } = useScroll()
    const heroPx = Math.max(300, window.innerHeight * 0.5)
    const scale = useTransform(scrollY, [0, heroPx], [1.05, 1])
    const opacity = useTransform(scrollY, [0, heroPx], [1, 0])
    return (
        <>
            <motion.div style={{ scale, opacity }}
                className={`sticky top-0 ${HERO_H} bg-[url(/img/car.jpg)] bg-cover bg-[72%_50%] after:absolute after:inset-0 after:bg-linear-to-b after:from-transparent after:from-45% after:to-black/50`} />
            <div className={`@container absolute inset-x-0 top-0 z-[1] flex ${HERO_H} flex-col justify-end p-4`}>
                <div className="mb-1 text-[13px] font-medium opacity-90">CS @ Georgia Tech</div>
                {/* sized to the screen width so the name always fills exactly one line */}
                <h1 className="whitespace-nowrap text-[13cqw] font-black leading-none tracking-[-0.03em]">benjamin sinek</h1>
                <div className="mt-2 flex items-center gap-1.5 text-[13px] opacity-90">
                    <Icon d={PATHS.location} className="size-3" />Los Angeles, CA · Atlanta, GA
                </div>
            </div>
        </>
    )
}

const Contacts = ({ resumeUrl }) => (
    <div className="flex items-center gap-[18px] px-4 pt-1 pb-2">
        <a href={resumeUrl} target="_blank"
            className="flex items-center gap-1.5 rounded-full border border-[#7c7c7c] px-3.5 py-1.5 text-[13px] font-semibold">
            <Icon d={PATHS.download} className="size-3" />Resume
        </a>
        {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/bsinek/", d: PATHS.linkedin },
            { label: "GitHub", href: "https://github.com/bsinek", d: PATHS.github },
            { label: "Email", href: "mailto:bsinek2024+contact@gmail.com", d: PATHS.email },
        ].map(({ label, href, d }) => (
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
    <div className="mx-4 overflow-hidden rounded-lg bg-[#1f1f1f] [&_b]:font-semibold [&_b]:text-white">
        <div className="relative h-[180px] bg-[url(/img/cat1.jpg)] bg-cover bg-center">
            <span className="absolute bottom-3 left-4 text-[15px] font-bold">Benjamin Sinek</span>
        </div>
        <p className="px-4 pt-3.5 text-sm leading-normal text-light-grey">I'm a Computer Science student at <b>Georgia Tech</b> studying <b>AI/ML</b> and exploring their application to financial fields.</p>
        <p className="px-4 pt-3.5 text-sm leading-normal text-light-grey">I enjoy building interactive projects that intersect technology and music, including a hands-free facial emotion-based music recommendation system.</p>
        <p className="px-4 pt-3.5 pb-4 text-sm leading-normal text-light-grey">Beyond that, I love producing music, tinkering with cars, and snowboarding.</p>
    </div>
)

// below xl: Spotify artist page (mockup A)
export const MobileHome = () => {
    const { counts, resumeUrl } = useCounts()
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
