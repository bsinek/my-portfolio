import { SidebarItem } from "./SidebarItem"

export const Sidebar = () => {
    return (
        <aside className="group/sidebar w-[420px] h-full">
            <div className="p-4 relative flex items-center overflow-hidden justify-between">
                <i className="bi bi-layout-sidebar text-light-grey text-lg absolute opacity-0 -translate-x-8 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0 transition-all duration-200 group-hover/sidebar:delay-[50ms]"></i>
                <span className="ml-1 font-semibold transition-transform duration-200 group-hover/sidebar:translate-x-6 delay-[50ms] group-hover/sidebar:delay-0">Quick Links</span>
                <i class="bi bi-link-45deg text-xl mr-1.5"></i>
            </div>
            <div className="px-2 h-full">
                <SidebarItem href="/about" label="About" />
                <SidebarItem href="/experience" label="Experience" />
                <SidebarItem href="/projects" label="Projects" />
                <SidebarItem href="/skills" label="Skills" />
                <SidebarItem href="/contact" label="Contact" />
            </div>
        </aside>
    )
}
