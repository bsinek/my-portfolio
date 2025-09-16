export const Navbar = () => {
    return (
        <nav className="h-16 grid grid-cols-[1fr_auto_1fr] grid-rows-1 p-2">
            <a href="#" className="h-full">
                <img src="/logo_black.svg" alt="Sinek" className="h-full w-auto"/>
            </a>
            <div>
                <i class="bi bi-house-door-fill"></i>
                <div className="bg-[#1f1f1f] rounded-[500px] w-[474px] inline-block">
                    <p>Search Bar</p>
                </div>
            </div>
        </nav>
    )
}
