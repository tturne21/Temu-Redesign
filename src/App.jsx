import { useState } from 'react'
import SiteHeader from './components/SiteHeader'
import Home from './pages/Home'
import { allProducts } from './data/products'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  function toggleTheme() {
    setDarkMode((currentMode) => !currentMode)
  }

  function handleSearch(query) {
    setSearchQuery(query)
    setSelectedCategory(null)
  }

  function handleCategory(category) {
    setSelectedCategory(category)
    setSearchQuery('')
  }

  function handleHome() {
    setSelectedCategory(null)
    setSearchQuery('')
  }

  return (
    <div data-theme={darkMode ? 'dark' : 'light'}>
      <SiteHeader
  products={allProducts}
  selectedCategory={selectedCategory}
  onSearch={handleSearch}
  onCategory={handleCategory}
  onHome={handleHome}
  darkMode={darkMode}
  onToggleTheme={toggleTheme}
/>

      <Home
        products={allProducts}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
      />
    </div>
  )
}

export default App