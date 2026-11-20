import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
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

const Tracks = ({ id, data, onProject }) => {
    const { exps, projs, cats } = data
    if (id === "experience") return exps.map((e, i) => (
        <Row key={i} num={i + 1} title={e.role} sub={<span>{e.company} · {e.date_range}</span>} />
    ))
    if (id === "projects") return projs.map((p, i) => (
        <Row key={i} num={i + 1} art={<img src={p.icon} alt="" />} title={p.name} onClick={e => onProject(p, e.currentTarget)}
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

const NO_SCROLLBAR = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"

// chevron beside a playlist cover: fills the gap between the cover and the screen edge, with the icon in its middle
const StepButton = ({ label, onClick, flip }) => (
    <button onClick={onClick} aria-label={label} className="grid h-20 min-w-0 flex-1 place-items-center text-light-grey active:text-white">
        <ChevronIcon className={`size-5 ${flip ? "rotate-180" : ""}`} />
    </button>
)

// a section shown as a Spotify album page, scrolling inside its own box. order is its place in the row
const Page = ({ id, order, data, onStep, onProject }) => (
    <div style={{ order }} className={`size-full flex-none snap-center snap-always overflow-y-auto bg-spotify-grey pb-[calc(32px+env(safe-area-inset-bottom))] ${NO_SCROLLBAR}`}>
        <div className="bg-linear-to-b from-light-grey to-spotify-grey to-[340px] px-4 pt-14 pb-3">
            <div className="-mx-4 flex items-center">
                <StepButton label="Previous playlist" onClick={() => onStep(-1)} flip />
                <div className="aspect-square w-[236px] flex-none rounded-md bg-cover bg-top shadow-[0_8px_32px_rgba(0,0,0,.5)]"
                    style={{ backgroundImage: `url(${SECTIONS[id].img})` }} />
                <StepButton label="Next playlist" onClick={() => onStep(1)} />
            </div>
            <h1 className="mt-5 text-2xl font-bold tracking-[-0.4px]">{SECTIONS[id].title}</h1>
            <div className="mt-2.5 flex items-center gap-2 text-[13px] font-bold">
                <img src="/img/cat1.jpg" alt="" className="size-6 rounded-full object-cover" />Benjamin Sinek
            </div>
            <div className="mt-2 text-[13px] text-light-grey">Playlist · <Items n={itemCounts(data)[id]} /></div>
        </div>
        <div className="pt-3">
            <Tracks id={id} data={data} onProject={onProject} />
        </div>
    </div>
)

const GITHUB = contacts().find(c => c.label === "GitHub").d
const EASE = [0.2, 0, 0, 1]   // fast start, long soft landing, no overshoot

// a piece of the card's content, fading in where it sits
const Fade = ({ delay, className, style, children }) => (
    <motion.div className={className} style={style} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.4 }}>
        {children}
    </motion.div>
)

// a project as a frosted glass card that grows out of the tapped row (card.x, card.y: the row's centre on screen).
// the growing is on a wrapper and the fade on the card itself: opacity on a parent would stop the card blurring what is behind it.
// once the card has grown, content fades in where it sits, top to bottom, and the underline draws in from the right
const ProjectCard = ({ card, onClose }) => (
    <AnimatePresence>
        {card && <motion.div key="dim" onClick={onClose} className="fixed inset-0 z-30 bg-black/20"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} />}
        {card && <motion.div key="card" className="pointer-events-none fixed inset-0 z-30 grid place-items-center p-4" style={{ transformOrigin: `${card.x}px ${card.y}px` }}
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.42, ease: EASE }}>
            <motion.div role="dialog" aria-modal="true" aria-label={card.p.name}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                className={`pointer-events-auto relative max-h-[82svh] w-full max-w-md overflow-y-auto overscroll-contain rounded-[20px] bg-[rgba(40,40,40,.45)] px-5 py-6 text-white backdrop-blur-xl backdrop-saturate-[1.6] shadow-[inset_0_1px_0_rgba(255,255,255,.14),inset_0_0_0_1px_rgba(255,255,255,.08),0_20px_60px_rgba(0,0,0,.4)] ${NO_SCROLLBAR}`}>
                <Fade delay={0.3} className="absolute top-8 right-7 z-10">
                    <button onClick={onClose} aria-label="Close" className="grid size-8 place-items-center rounded-full bg-black/45">
                        <CloseIcon className="size-3.5" />
                    </button>
                </Fade>
                <Fade delay={0.45} className="mb-6 aspect-video rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${card.p.thumbnail})` }} />
                <Fade delay={0.45} className="relative flex items-baseline justify-between gap-4">
                    <h3 className="text-[26px] leading-[1.15] font-bold">{card.p.name}</h3>
                    <span className="flex-none text-lg font-light text-light-grey">{card.p.year}</span>
                    <motion.div className="absolute inset-x-0 -bottom-2 h-0.5 origin-right bg-spotify-green"
                        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.55, duration: 0.3 }} />
                </Fade>
                <Fade delay={0.55} className="mt-6 flex flex-wrap gap-x-2 text-[15px] text-light-grey">
                    {card.p.techstack.map((t, i) => <span key={t}>{i > 0 && <span className="mr-2">|</span>}{t}</span>)}
                </Fade>
                <Fade delay={0.65}>
                    <p className="mt-4 text-[15px] leading-normal">{card.p.description}</p>
                    <a href={card.p.link} target="_blank" className="mt-5 inline-flex items-center gap-1.5 text-sm text-light-grey active:text-white">
                        <Icon d={GITHUB} className="size-4" />View on GitHub ↗
                    </a>
                </Fade>
            </motion.div>
        </motion.div>}
    </AnimatePresence>
)

// the playlists as a looping carousel on the browser's own sideways scrolling, one page per swipe.
// the open playlist is always the middle of the row: when a swipe rests on a neighbour, onSwitch(1 or -1) makes that
// the open one and the row is re-ordered and re-centred around it. while the row moves by itself (snapping after a
// swipe, or scrolling from a chevron) a transparent shield swallows touches.
// native scrolling because Safari on 120Hz iPhones ran a script-driven drag at 60Hz, which showed as jitter (observed 2026-11-20)
const Playlists = ({ openId, data, onClose, onSwitch }) => {
    const row = useRef(null), shield = useRef(null), timer = useRef(0)
    const [card, setCard] = useState(null)   // the open project and where on screen it was tapped
    const openProject = (p, el) => {
        const r = el.getBoundingClientRect()
        setCard({ p, x: r.left + r.width / 2, y: r.top + r.height / 2 })
    }
    const down = useRef(false)    // a finger is on the row
    const wheel = useRef(false)   // the last input was a wheel or trackpad: the shield would cut its scroll off
    const n = PLAYLISTS.length, cur = PLAYLISTS.indexOf(openId)
    const offCentre = () => row.current.scrollLeft / row.current.clientWidth - 1   // in pages

    // centre the row on the open playlist, and put the others back at their tops
    useLayoutEffect(() => {
        row.current.scrollLeft = row.current.clientWidth
        ;[...row.current.children].forEach((page, i) => { if (i !== cur) page.scrollTop = 0 })
    }, [cur])
    useEffect(() => () => clearTimeout(timer.current), [])

    // called by scrollend, and 100ms after the last scroll event for browsers without it
    const rested = () => {
        if (down.current) return
        shield.current.hidden = true
        const dir = Math.round(offCentre())
        if (dir && Math.abs(offCentre() - dir) < 0.01) onSwitch(dir)
    }
    const onScroll = () => {
        if (!down.current && !wheel.current && Math.abs(offCentre()) > 0.01) shield.current.hidden = false
        clearTimeout(timer.current)
        timer.current = setTimeout(rested, 100)
    }
    const onTouchEnd = () => { down.current = false; onScroll() }
    const step = dir => {
        shield.current.hidden = false
        row.current.scrollBy({ left: dir * row.current.clientWidth, behavior: "smooth" })
        onScroll()   // starts the timer, so the shield comes down even if nothing scrolls
    }

    return (
        <main className="fixed inset-0 text-white">
            <div ref={row} onScroll={onScroll} onScrollEnd={rested} onWheel={() => { wheel.current = true }}
                onTouchStart={() => { down.current = true; wheel.current = false }} onTouchEnd={onTouchEnd} onTouchCancel={onTouchEnd}
                className={`flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain ${NO_SCROLLBAR}`}>
                {PLAYLISTS.map((id, i) => <Page key={id} id={id} order={(i - cur + n + 1) % n} data={data} onStep={step} onProject={openProject} />)}
            </div>
            <button onClick={onClose} aria-label="Close" className="fixed top-3 left-3 z-10 grid size-9 place-items-center rounded-full bg-black/45">
                <CloseIcon className="size-4" />
            </button>
            <div ref={shield} hidden className="fixed inset-0 z-20 touch-none" />
            <ProjectCard card={card} onClose={() => setCard(null)} />
        </main>
    )
}

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

    // swiping wraps around, and replaces the address instead of adding to it, so back still goes to the front page
    const swipe = dir => {
        const next = PLAYLISTS[(PLAYLISTS.indexOf(openId) + dir + PLAYLISTS.length) % PLAYLISTS.length]
        history.replaceState(null, "", `#${next}`)
        setOpenId(next)
    }

    // the front page stays mounted (just hidden) under an open playlist, so closing shows it instantly
    // with its images already loaded instead of rebuilding it and re-fetching every cover
    return (
        <>
            <Home counts={itemCounts(data)} onOpen={open} hidden={!!openId} />
            {openId && <Playlists openId={openId} data={data} onClose={() => history.back()} onSwitch={swipe} />}
        </>
    )
}
