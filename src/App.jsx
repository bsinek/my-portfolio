// imports
import { Sidebar } from "./components/Sidebar"
import { MainView } from "./components/MainView"
import { Playbar } from "./components/Playbar"

function App() {
  return (
    <>
      <div className="h-screen grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] gap-2 p-2">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-1 min-h-0">
          <MainView img="/img/jet.jpg" position="center 70%" size="cover" opacity="0.9" />
        </div>
        <div className="col-span-2">
          <Playbar />
        </div>
      </div>
    </>
  )
}

export default App
