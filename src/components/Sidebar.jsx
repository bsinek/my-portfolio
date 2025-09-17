import { SidebarItem } from "./SidebarItem"

export const Sidebar = () => {
    return (
        <aside className="w-[420px] h-full">
            <div className="p-4">
                <h2 className="font-bold">Quick Links</h2>
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