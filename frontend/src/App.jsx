import { useState, useRef, useEffect } from "react"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { MainView } from "./components/MainView/MainView"
import { Playbar } from "./components/Playbar/Playbar"
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen"
import { LAYOUT } from "./config/general"
import { MAINTENANCE } from "./config/general"
import { useMotionValue, AnimatePresence } from "motion/react"

function App() {
  const [activeSection, setActiveSection] = useState("about")
  const progressMV = useMotionValue(0)
  const mainContentRef = useRef(null)
  const [showLoading, setShowLoading] = useState(true)

  // loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // dynamically set mainview size
  useEffect(() => {
    const updateHeight = () => {
      if (mainContentRef.current) {
        const height = mainContentRef.current.offsetHeight;
        document.documentElement.style.setProperty('--spacing-mainview', `${height}px`);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
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
      <AnimatePresence>
        {showLoading && <LoadingScreen />}
      </AnimatePresence>

      {MAINTENANCE && <div className="absolute z-10 bg-spotify-grey inset-0 flex justify-center items-center flex-col gap-4">
        <p className="font-extralight tracking-wide text-3xl text-center">
          Site is being updated.
          <br/>
          Check back later.
        </p>
        <div className="h-12 aspect-square rounded-full bg-white p-2">
          <svg fill="currentColor" className="bi bi-cone text-black" viewBox="0 0 16 16">
            <path d="m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9s-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12m-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4s1.2-.036 1.725-.098m4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257z"/>
          </svg>
        </div>
      </div>}

      <div className={`h-screen grid ${gridCols} ${gridRows} ${padding} ${gap}`}>
        {LAYOUT.showSidebar && <div className={`col-span-1 overflow-hidden ${rounded} ${sidebarColor}`}>
          <Sidebar activeSection={activeSection} />
        </div>}
        <div ref={mainContentRef} className={`col-span-1 min-h-0 min-w-4xl overflow-hidden ${rounded}`}>
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
