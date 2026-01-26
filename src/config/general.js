export const LAYOUT = {
    showSidebar: true,
    showPlaybar: true,
    rounded: true,
    padding: true,
    gap: true,
}

export const getMainviewHeight = () => 
    LAYOUT.padding && LAYOUT.showPlaybar ? "calc(100vh - 6rem)" :
    LAYOUT.padding ? "calc(100vh - 1rem)" :
    LAYOUT.showPlaybar ? "calc(100vh - 5rem)" :
    "100vh";