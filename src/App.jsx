// imports
import { Sidebar } from "./components/Sidebar"

function App() {
  return (
    <>
      <div className="h-screen grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] gap-2 p-2">
        <div className="col-span-1 rounded-lg bg-spotify-grey">
          <Sidebar/>
        </div>
        <div className="col-span-1 rounded-lg bg-spotify-grey">
          {/* <MainView /> */}
        </div>
        <div className="col-span-2 -m-2">
          {/* <Player /> */}
        </div>
      </div>
    </>
  )
}

export default App
