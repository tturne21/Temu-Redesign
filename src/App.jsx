import { useState } from 'react'
import Home from './pages/Home'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  function toggleTheme() {
    setDarkMode((currentMode) => !currentMode)
  }

  return (
    <div data-theme={darkMode ? 'dark' : 'light'}>
      <button className="theme-test-button" onClick={toggleTheme}>
        Toggle Theme
      </button>

      <Home />
    </div>
  )
}

export default App