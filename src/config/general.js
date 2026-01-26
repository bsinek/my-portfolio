export const LAYOUT = {
    showSidebar: true,
    showPlaybar: false,
    rounded: false,
    padding: false,
    gap: false,
}

export const getMainviewHeight = () => 
    LAYOUT.padding && LAYOUT.showPlaybar ? "calc(100vh - 6rem)" :
    LAYOUT.padding ? "calc(100vh - 1rem)" :
    LAYOUT.showPlaybar ? "calc(100vh - 5rem)" :
    "100vh";