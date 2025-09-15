// import './Navbar.css'

export const Navbar = () => {
    return (
        <nav className="navbar">
            <a className="logo" href="#">
                <img src="/logo_black.svg" alt="Sinek" />
            </a>

            {/* search bar is a place holder */}
            <div className="search-bar">
                <p>&lt;Search bar here&gt;</p>
            </div>
            
            <button className="icon-wrapper">
                <i className="bi bi-person-circle" />
            </button>
        </nav>
    )
}