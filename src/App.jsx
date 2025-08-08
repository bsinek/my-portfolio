import { Navbar } from './components/Navbar.jsx'
import './App.css'

function App() {
  return (
    <>
      <div className='panel-layout'>
        <div className='top-banner'>
          <Navbar />
        </div>
        <div className='left-sidebar'>
          {/* <Sidebar /> */}
        </div>
        <div className='main-view'>
          {/* <MainView /> */}
        </div>
        <div className='player'>
          {/* <Player /> */}
        </div>
      </div>
    </>
  )
}

export default App
