import { useState } from "react"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { MainView } from "./components/MainView/MainView"
import { Playbar } from "./components/Playbar/Playbar"
import { LAYOUT, getMainviewHeight } from "./config/general"
import { useMotionValue } from "motion/react"

function App() {
  const [activeSection, setActiveSection] = useState("about")
  const progressMV = useMotionValue(0)

  const gridCols = LAYOUT.showSidebar ? "grid-cols-[auto_1fr]" : "grid-cols-[1fr]";
  const gridRows = LAYOUT.showPlaybar ? "grid-rows-[1fr_auto]" : "grid-rows-[1fr]";
  const rounded = LAYOUT.rounded ? "rounded-lg" : "";
  const padding = LAYOUT.padding ? "p-2" : "";
  const gap = LAYOUT.gap ? "gap-2" : "";

  return (
    <>
      <div className={`h-screen grid ${gridCols} ${gridRows} ${padding} ${gap}`} style={{ '--spacing-mainview': getMainviewHeight() }}>
        {LAYOUT.showSidebar && <div className={`col-span-1 overflow-hidden ${rounded}`}>
          <Sidebar activeSection={activeSection} />
        </div>}
        <div className={`col-span-1 min-h-0 overflow-hidden ${rounded}`}>
          <MainView 
            setActiveSection={setActiveSection}
            progressMV={progressMV}
          />
        </div>
        {LAYOUT.showPlaybar && <div className="col-span-2">
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
