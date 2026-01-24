import { useState } from "react"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { MainView } from "./components/MainView/MainView"
import { Playbar } from "./components/Playbar/Playbar"

function App() {
  const [activeSection, setActiveSection] = useState("about")
  const [sectionProgress, setSectionProgress] = useState(0)

  return (
    <>
      <div className="h-screen grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] gap-2 p-2">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-1 min-h-0">
          <MainView 
            setActiveSection={setActiveSection}
            setSectionProgress={setSectionProgress}
          />
        </div>
        <div className="col-span-2">
          <Playbar 
            activeSection={activeSection}
            sectionProgress={sectionProgress}
          />
        </div>
      </div>
    </>
  )
}

export default App
