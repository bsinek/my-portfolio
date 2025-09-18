import { SidebarItem } from "./SidebarItem"

export const Playbar = () => {
    return (
        <div className="flex items-center justify-between h-[88px] -m-2 p-2 bg-black">
            <div className="w-[30%]">
                <SidebarItem href="/now-playing" label="Now Playing" />
            </div>
            <div>
                PLAY BUTTON HERE
            </div>
            <div className="w-[30%] flex justify-end">
                ICONS HERE
            </div>
        </div>
    )
}
