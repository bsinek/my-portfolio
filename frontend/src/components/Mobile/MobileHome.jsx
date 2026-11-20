import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { SECTIONS } from "../../config/sections"
import { contacts } from "../../config/contacts"
import { ABOUT } from "../../config/about"
import { useResumeUrl } from "../../hooks/useResumeUrl"
import { useSiteData, itemCounts } from "../../hooks/useSiteData"
import { Hero } from "../Hero/Hero"
import * as SkillIcons from "../../icons"

const PLAYLISTS = ["experience", "projects", "skills"]

const Icon = ({ d, className, evenOdd }) => (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
        <path fillRule={evenOdd ? "evenodd" : undefined} d={d} />
    </svg>
)
const DownloadIcon = ({ className }) => <Icon className={className} d="M8 1a.5.5 0 0 1 .5.5v9.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 1 1 .708-.708L7.5 11.293V1.5A.5.5 0 0 1 8 1" />
const PinIcon = ({ className }) => <Icon className={className} d="M8.822.797a2.72 2.72 0 0 1 3.847 0l2.534 2.533a2.72 2.72 0 0 1 0 3.848l-3.678 3.678-1.337 4.988-4.486-4.486L1.28 15.78a.75.75 0 0 1-1.06-1.06l4.422-4.422L.156 5.812l4.987-1.337z" />
const ChevronIcon = ({ className }) => <Icon className={className} evenOdd d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
const CloseIcon = ({ className }) => <Icon className={className} d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />

// same wording as desktop: "3 items" / "1 item"
const Items = ({ n }) => <>{n} {n === 1 ? "item" : "items"}</>

// a numbered list row, like Spotify's "Popular" list; tappable when onClick is given
const Row = ({ num, art, title, sub, onClick }) => {
    const Tag = onClick ? "button" : "div"
    return (
        <Tag onClick={onClick} className={`mx-2 flex min-h-16 w-[calc(100%-16px)] items-center gap-3 rounded-md px-2 py-2 text-left ${onClick ? "active:bg-white/5" : ""}`}>
            <span className="w-4 flex-none text-center text-[15px] text-light-grey">{num}</span>
            {art && <span className="grid size-12 flex-none place-items-center overflow-hidden rounded [&>img]:size-full [&>img]:object-cover [&>svg]:size-[34px]">{art}</span>}
            <span className="min-w-0 flex-1">
                <div className="truncate text-base">{title}</div>
                {sub && <div className="mt-0.5 flex min-w-0 items-center gap-1 text-sm text-light-grey [&>span]:truncate">{sub}</div>}
            </span>
            {onClick && <ChevronIcon className="size-4 flex-none text-light-grey" />}
        </Tag>
    )
}


const Contacts = ({ resumeUrl }) => (
    <div className="flex items-center gap-[18px] px-4 pt-1 pb-2">
        <a href={resumeUrl} target="_blank"
            className="flex items-center gap-1.5 rounded-full border border-[#7c7c7c] px-3.5 py-1.5 text-[13px] font-semibold">
            <DownloadIcon className="size-3" />Resume
        </a>
        {contacts(resumeUrl).filter(c => ["LinkedIn", "GitHub", "Email"].includes(c.label)).map(({ label, href, d }) => (
            <a key={label} href={href} target="_blank" aria-label={label} className="size-[26px] text-light-grey active:text-white">
                <Icon d={d} className="size-full" />
            </a>
        ))}
    </div>
)

const Heading = ({ children }) => <h2 className="px-4 pt-6 pb-3 text-xl font-bold tracking-[-0.3px]">{children}</h2>

const AboutCard = () => (
    <div className="mx-4 overflow-hidden rounded-lg bg-[#1f1f1f] [&_p_span]:font-semibold">
        <div className="relative h-[180px] bg-[url(/img/cat1.jpg)] bg-cover bg-center">
            <span className="absolute bottom-3 left-4 text-[15px] font-bold">Benjamin Sinek</span>
        </div>
        {ABOUT.map((text, i) => <p key={i} className="px-4 pt-3.5 text-sm leading-normal text-light-grey last:pb-4">{text}</p>)}
    </div>
)

// front page: Spotify artist page (mockup A)
const Home = ({ counts, onOpen, hidden }) => {
    const resumeUrl = useResumeUrl()
    return (
        <main hidden={hidden} className="relative min-h-svh overflow-x-clip bg-spotify-grey pb-[calc(32px+env(safe-area-inset-bottom))] text-white">
            <Hero />
            <div className="relative z-[2] bg-spotify-grey pt-3">
                <Contacts resumeUrl={resumeUrl} />
                <Heading>Playlists</Heading>
                {PLAYLISTS.map((id, i) => (
                    <Row key={id} num={i + 1} onClick={() => onOpen(id)} title={SECTIONS[id].title}
                        art={<span className="size-full bg-cover bg-top" style={{ backgroundImage: `url(${SECTIONS[id].img})` }} />}
                        sub={<><PinIcon className="size-[11px] flex-none text-spotify-green" /><span>Playlist · <Items n={counts[id]} /></span></>} />
                ))}
                <Heading>About</Heading>
                <AboutCard />
            </div>
        </main>
    )
}

const Tracks = ({ id, data }) => {
    const { exps, projs, cats } = data
    if (id === "experience") return exps.map((e, i) => (
        <Row key={i} num={i + 1} title={e.role} sub={<span>{e.company} · {e.date_range}</span>} />
    ))
    if (id === "projects") return projs.map((p, i) => (
        <Row key={i} num={i + 1} art={<img src={p.icon} alt="" />} title={p.name}
            sub={<span>{p.year} · {p.techstack.slice(0, 3).join(", ")}</span>} />
    ))
    // skills: numbered straight through, grouped under category headings
    let n = 0
    return cats.map((c, i) => (
        <div key={c.category}>
            <div className={`px-4 pb-1 text-[13px] font-semibold text-light-grey ${i === 0 ? "" : "pt-4"}`}>{c.category}</div>
            {c.skills.map(s => {
                const SkillIcon = SkillIcons[s.icon]
                return <Row key={s.name} num={++n} art={SkillIcon && <SkillIcon />} title={s.name} />
            })}
        </div>
    ))
}

// a section shown as a Spotify album page
const Playlist = ({ id, data, onClose }) => (
    <main className="min-h-svh bg-spotify-grey pb-[calc(32px+env(safe-area-inset-bottom))] text-white">
        <button onClick={onClose} aria-label="Close" className="fixed top-3 left-3 z-10 grid size-9 place-items-center rounded-full bg-black/45">
            <CloseIcon className="size-4" />
        </button>
        <div className="bg-linear-to-b from-light-grey to-spotify-grey to-[340px] px-4 pt-14 pb-3">
            <div className="mx-auto aspect-square w-[236px] rounded-md bg-cover bg-top shadow-[0_8px_32px_rgba(0,0,0,.5)]"
                style={{ backgroundImage: `url(${SECTIONS[id].img})` }} />
            <h1 className="mt-5 text-2xl font-bold tracking-[-0.4px]">{SECTIONS[id].title}</h1>
            <div className="mt-2.5 flex items-center gap-2 text-[13px] font-bold">
                <img src="/img/cat1.jpg" alt="" className="size-6 rounded-full object-cover" />Benjamin Sinek
            </div>
            <div className="mt-2 text-[13px] text-light-grey">Playlist · <Items n={itemCounts(data)[id]} /></div>
        </div>
        <div className="pt-3">
            <Tracks id={id} data={data} />
        </div>
    </main>
)

// below xl. #experience etc. goes in the address, so the phone's back gesture closes an open playlist
export const MobileHome = () => {
    const data = useSiteData()
    const [openId, setOpenId] = useState(null)
    const homeY = useRef(0)

    useEffect(() => {
        if (location.hash) history.replaceState(null, "", location.pathname)   // always start on the front page
        const onHash = () => {
            const id = location.hash.slice(1)
            setOpenId(PLAYLISTS.includes(id) ? id : null)
        }
        window.addEventListener("hashchange", onHash)
        return () => window.removeEventListener("hashchange", onHash)
    }, [])

    // fetch and decode project icons and thumbnails in the background, so Projects (and its popups) open fully drawn.
    // the Image objects are kept, otherwise the browser can drop them and fetch again on open
    const preloaded = useRef([])
    useEffect(() => {
        preloaded.current = data.projs.flatMap(p => [p.icon, p.thumbnail]).map(src => {
            const img = new Image()
            img.src = src
            img.decode().catch(() => {})
            return img
        })
    }, [data.projs])

    // playlists open at the top; closing returns to where the front page was
    useLayoutEffect(() => { window.scrollTo(0, openId ? 0 : homeY.current) }, [openId])

    const open = id => { homeY.current = window.scrollY; location.hash = id }

    // the front page stays mounted (just hidden) under an open playlist, so closing shows it instantly
    // with its images already loaded instead of rebuilding it and re-fetching every cover
    return (
        <>
            <Home counts={itemCounts(data)} onOpen={open} hidden={!!openId} />
            {openId && <Playlist id={openId} data={data} onClose={() => history.back()} />}
        </>
    )
}
