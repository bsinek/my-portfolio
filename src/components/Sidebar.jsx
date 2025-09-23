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
                <div className="absolute inset-0 flex justify-center items-center">
                     <i className="bi bi-play-fill opacity-0 group-hover/item:opacity-100 text-2xl ml-0.5"></i>
                </div>
            </div>
            <div className="flex flex-col justify-center font-light">
                <span>{label}</span>
                <span className="text-light-grey text-sm">
                    <i className="bi bi-pin-angle-fill text-spotify-green mr-1"></i>
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
            <div className="p-4 relative flex items-center overflow-hidden justify-between">
                <i className="bi bi-layout-sidebar text-light-grey text-lg absolute opacity-0 -translate-x-8 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0 transition-all duration-200 group-hover/sidebar:delay-[50ms]"></i>
                <span className="ml-1 font-semibold transition-transform duration-200 group-hover/sidebar:translate-x-6 delay-[50ms] group-hover/sidebar:delay-0">Quick Links</span>
                <i className="bi bi-link-45deg text-xl mr-1.5"></i>
            </div>
            <div className="px-2 h-full">
                {links.map((item) => (
                    <SidebarItem key={item.href} {...item} />
                ))}
            </div>
        </aside>
    );
};
