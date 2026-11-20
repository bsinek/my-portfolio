import { motion, useAnimate } from "motion/react"
import { useRef, useState, useEffect } from "react";
import { SECTIONS, SECTION_ORDER } from "../../config/sections";
import { contacts } from "../../config/contacts";
import { useResumeUrl } from "../../hooks/useResumeUrl";

const SidebarItem = ({ id, title, img, isActive }) => {
    return (
       <a href={`#${id}`} className="group/item relative flex items-center gap-3 h-16 p-2 rounded-md">
            {/* hover background with transition */}
            <div className="absolute inset-0 rounded-md bg-white/5 opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none" />
            {/* active background no transition */}
            {isActive && <div className="absolute inset-0 rounded-md bg-white/10 pointer-events-none" />}
            
            <div className="relative h-full aspect-square rounded-sm overflow-hidden bg-black">
                <div className="absolute inset-0 p-[15px] opacity-0 group-hover/item:opacity-100 transition-opacity">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="playbtn h-full">
                        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"/>
                    </svg>
                </div>
                <img src={img} className="group-hover/item:opacity-40 transition-opacity" />
            </div>
            <div className="flex flex-col justify-center font-light flex-1">
                <span>{title}</span>
                <span className="text-light-grey text-sm flex items-center">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="pin-angle inline h-3 text-spotify-green mr-1">
                        <path d="M8.822.797a2.72 2.72 0 0 1 3.847 0l2.534 2.533a2.72 2.72 0 0 1 0 3.848l-3.678 3.678-1.337 4.988-4.486-4.486L1.28 15.78a.75.75 0 0 1-1.06-1.06l4.422-4.422L.156 5.812l4.987-1.337z"/>
                    </svg>
                    <span>Playlist</span>
                    <span className="font-semibold mx-0.5">•</span>
                    <span>Sinek</span>
                </span>
            </div>
            <div className={`text-light-grey h-full py-4 px-3 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}>
                <svg fill="currentColor" className="rotate-180 arrow-right h-full" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </div>
       </a>
    );
};

const IconWrapper = ({ children, isHovered }) => {
    const [scope, animate] = useAnimate();
    const preventTrigger = useRef(false);

    useEffect(() => {
        if (isHovered && !preventTrigger.current) {
            // preventTrigger.current = true;       logic for preventing retriggering animation while in progress
            animate(scope.current, { y: [0, "-50%"] }, { type: "spring", stiffness: 400, damping: 15 }).then(() => {preventTrigger.current = false});
        }                    
    }, [isHovered, animate, scope]);

    return (
        <div className="relative h-full aspect-square overflow-hidden p-2"
            style={{
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            }}>
            <motion.div ref={scope} className="w-full flex flex-col py-2 gap-4 -translate-y-2">
                {children}
                {children}
            </motion.div>
        </div>
    );
};

const ContactItem = ({ href, label, sub, d, evenOdd }) => {
    const icon = (
        <svg fill="currentColor" className="h-full" viewBox="0 0 16 16">
            <path fillRule={evenOdd ? "evenodd" : undefined} d={d}/>
        </svg>
    );
    const [hovered, setHovered] = useState(false);
    return (
        <a href={href} target="_blank" className="group/contact hover:bg-white/5 hover:scale-105 transition-all flex items-center gap-1 h-14 rounded-md p-1"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="h-full p-1">
                <IconWrapper isHovered={hovered}>
                    {icon}
                </IconWrapper>
            </div>
            <div className="flex flex-col justify-center font-light">
                <span className="group-hover/contact:text-spotify-green transition-colors">{label}</span>
                <span className="text-xs opacity-60">{sub}</span>
            </div>
            <div className="h-full ml-auto py-4 px-3 opacity-0 group-hover/contact:opacity-100 transition-opacity">
                <svg fill="currentColor" className="arrow-right h-full" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </div>
        </a>
    );
};

export const Sidebar = ({ activeSection }) => {
    const resumeUrl = useResumeUrl();

    const links = SECTION_ORDER.map(id => SECTIONS[id]);
    return (
        <aside className="flex flex-col w-100 h-full">
            {/* quick links */}
            <div className="group/quicklinks flex-1">
                <div className="p-4 relative flex items-center overflow-hidden">
                    <svg fill="currentColor" viewBox="0 0 16 16" className="link-angle h-5 text-light-grey absolute opacity-0 -translate-x-8 group-hover/quicklinks:opacity-100 group-hover/quicklinks:translate-x-0 transition-all duration-200 group-hover/quicklinks:delay-50">
                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                    </svg>
                    <h3 className="ml-1 font-semibold transition-transform duration-200 group-hover/quicklinks:translate-x-6 delay-50 group-hover/quicklinks:delay-0">Quick Links</h3>
                </div>
                <div className="flex flex-col gap-0 px-2">
                    {links.map((item) => (
                        <SidebarItem 
                            key={item.id} 
                            id={item.id} 
                            title={item.title} 
                            img={item.img}
                            isActive={activeSection === item.id}
                        />
                    ))}
                </div>
            </div>
            {/* contact me */}
            <div className="group/contactlinks text-light-grey pb-3">
                <div className="p-4 relative flex items-center overflow-hidden">
                    <svg fill="currentColor" viewBox="0 0 16 16" className="people h-5 text-light-grey absolute opacity-0 -translate-x-8 group-hover/contactlinks:opacity-100 group-hover/contactlinks:translate-x-0 transition-all duration-200 group-hover/contactlinks:delay-50">
                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                    </svg>
                    <h3 className="ml-1 font-semibold transition-transform duration-200 group-hover/contactlinks:translate-x-6 delay-50 group-hover/contactlinks:delay-0">Contact Me</h3>
                </div>
                <div className="flex flex-col gap-0 px-5">
                    {contacts(resumeUrl).map((item) => (
                        <ContactItem key={item.href} {...item} />
                    ))}
                </div>
            </div>
        </aside>
    );
};
