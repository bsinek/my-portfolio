import { useState, useRef, useEffect } from "react"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { MainView } from "./components/MainView/MainView"
import { Playbar } from "./components/Playbar/Playbar"
import { LAYOUT } from "./config/general"
import { useMotionValue } from "motion/react"

function App() {
  const [activeSection, setActiveSection] = useState("about")
  const progressMV = useMotionValue(0)
  const mainContentRef = useRef(null)

  // dynamically set mainview size
  useEffect(() => {
    if (mainContentRef.current) {
      const height = mainContentRef.current.offsetHeight;
      document.documentElement.style.setProperty('--spacing-mainview', `${height}px`);
    }
  }, [LAYOUT]);

  const gridCols = LAYOUT.showSidebar ? "grid-cols-[auto_1fr]" : "grid-cols-[1fr]";
  const gridRows = LAYOUT.showPlaybar ? "grid-rows-[1fr_auto]" : "grid-rows-[1fr]";
  const rounded = LAYOUT.rounded ? "rounded-lg" : "";
  const padding = LAYOUT.padding ? "p-2" : "";
  const gap = LAYOUT.gap ? "gap-2" : "";
  const playbarMargin = LAYOUT.gap ? "-m-2" : "";
  const sidebarColor = LAYOUT.contrast ? "bg-[#0B0B0B]" : "bg-spotify-grey";

  return (
    <>
      <div className={`h-screen grid ${gridCols} ${gridRows} ${padding} ${gap}`}>
        {LAYOUT.showSidebar && <div className={`col-span-1 overflow-hidden ${rounded} ${sidebarColor}`}>
          <Sidebar activeSection={activeSection} />
        </div>}
        <div ref={mainContentRef} className={`col-span-1 min-h-0 overflow-hidden ${rounded}`}>
          <MainView 
            setActiveSection={setActiveSection}
            progressMV={progressMV}
          />
        </div>
        {LAYOUT.showPlaybar && <div className={`col-span-2 ${playbarMargin}`}>
          <Playbar 
            activeSection={activeSection}
            progressMV={progressMV}
          />
        </div>}
      </div>
    </>
  )
}

export default App
