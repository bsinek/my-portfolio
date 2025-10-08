const links = [
    { href: "/about", label: "About" },
    { href: "/experience", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/contact", label: "Contact" },
];

const SidebarItem = ({ href, label }) => {
    return (
       <a href={href} className="group/item flex gap-3 h-16 p-2 rounded-md hover:bg-white/10">
            <div className="relative h-12 w-12 rounded-sm bg-white/30 group-hover/item:bg-white/10">
                <div className="absolute inset-0 p-[15px] opacity-0 group-hover/item:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-full">
                        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"/>
                    </svg>
                </div>
            </div>
            <div className="flex flex-col justify-center font-light">
                <span>{label}</span>
                <span className="text-light-grey text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="inline h-3 aspect-square text-spotify-green mr-1">
                        <path d="M8.822.797a2.72 2.72 0 0 1 3.847 0l2.534 2.533a2.72 2.72 0 0 1 0 3.848l-3.678 3.678-1.337 4.988-4.486-4.486L1.28 15.78a.75.75 0 0 1-1.06-1.06l4.422-4.422L.156 5.812l4.987-1.337z"/>
                    </svg>
                    <span>Playlist</span>
                    <span className="font-bold mx-0.5">•</span>
                    <span>Sinek</span>
                </span>
            </div>
       </a>
    );
};

export const Sidebar = () => {
    return (
        <aside className="group/sidebar w-[420px] h-full rounded-lg bg-spotify-grey">
            <div className="p-4 relative flex items-center overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="bi bi-link-45deg h-5 text-light-grey absolute opacity-0 -translate-x-8 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0 transition-all duration-200 group-hover/sidebar:delay-[50ms]">
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                </svg>
                <h3 className="ml-1 font-semibold transition-transform duration-200 group-hover/sidebar:translate-x-6 delay-[50ms] group-hover/sidebar:delay-0">Quick Links</h3>
            </div>
            <div className="px-2 h-full">
                {links.map((item) => (
                    <SidebarItem key={item.href} {...item} />
                ))}
            </div>
        </aside>
    );
};
