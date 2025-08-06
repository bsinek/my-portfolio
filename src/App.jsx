import { Panel } from './components/Panel.jsx'

import './App.css'

function App() {
  return (
    <>
      <div className="panel-layout">
        <div className="sidebar">
          <Panel></Panel>
        </div>
        <div className="hero">
          <Panel></Panel>
        </div>
      </div>
    </>
  )
}

export default App
