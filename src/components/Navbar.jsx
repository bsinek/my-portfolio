import './Navbar.css'

export const Navbar = () => {
    return (
        <nav className="top-banner">
            <a className="logo" href="#">
                <img src="/logo_black.svg" alt="Sinek" />
            </a>
            {/* search bar is a place holder */}
            <p>&lt;Search bar here&gt;</p>
            <button className="icon-wrapper">
                <i className="bi bi-person-circle" />
            </button>
        </nav>
    )
}