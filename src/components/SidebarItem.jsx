export const SidebarItem = ({ href, label }) => {
    return (
       <a href={href} className="group/item flex gap-3 h-16 p-2 rounded-md hover:bg-white/10">
            <div className="relative h-12 w-12 rounded-sm bg-amber-500 group-hover/item:bg-amber-500/50">
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
    )
}