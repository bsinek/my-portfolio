import { SidebarItem } from "./SidebarItem"

export const Playbar = () => {
    return (
        <div className="flex items-center justify-between h-[88px] -m-2 p-2 bg-black">
            <div className="w-[30%]">
                CURRENT SECTION HERE
            </div>
            <div className="flex flex-col">
                <div className="flex justify-center items-center gap-4 h-8">
                    <button className="h-8 w-8 p-2 text-light-grey hover:text-white hover:scale-105 transition-all duration-75">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-full">
                            <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7z"/>
                        </svg>
                    </button>

                    <button className="h-8 w-8 p-2 rounded-full bg-current hover:scale-105 transition-transform duration-75">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-full text-black">
                            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"/>
                        </svg>
                    </button>

                    <button className="h-8 w-8 p-2 text-light-grey hover:text-white hover:scale-105 transition-all duration-75">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-full rotate-180">
                            <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="w-[30%] flex justify-end">
                ICONS HERE
            </div>
        </div>
    )
}
