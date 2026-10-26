import { useEffect, useState } from 'react'
import '../styles/site-header.css'

const categories = [
  'Clothes',
  'Toys',
  'Beauty',
  'Tools',
  'Furniture',
  'Electronics',
]

function SiteHeader({
  products,
  selectedCategory,
  onSearch,
  onCategory,
  onHome,
  onCart,
  darkMode,
  onToggleTheme,
}) {
  const [searchText, setSearchText] = useState('')
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const normalizedQuery = searchText.trim().toLocaleLowerCase()

  const matches = normalizedQuery
    ? products.filter((product) =>
        `${product.name} ${product.category}`
          .toLocaleLowerCase()
          .includes(normalizedQuery),
      )
    : products.slice(0, 3)

  const suggestions = matches.slice(0, 5)

  useEffect(() => {
    function handleDocumentClick(event) {
      if (!event.target.closest('.search-form')) {
        setSuggestionsOpen(false)
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setSuggestionsOpen(false)
        setMenuOpen(false)
      }
    }

    document.addEventListener('click', handleDocumentClick)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  function submitSearch(event) {
    event.preventDefault()

    if (!searchText.trim()) {
      setSuggestionsOpen(true)
      return
    }

    onSearch(searchText)
    setSuggestionsOpen(false)
    setMenuOpen(false)
  }

  function selectSuggestion(product) {
    setSearchText(product.name)
    onSearch(product.name)
    setSuggestionsOpen(false)
    setMenuOpen(false)
  }

  function selectCategory(event, category) {
    event.preventDefault()
    setSearchText('')
    onCategory(category)
    setSuggestionsOpen(false)
    setMenuOpen(false)
  }

  function goHome(event) {
    event.preventDefault()
    setSearchText('')
    setSuggestionsOpen(false)
    setMenuOpen(false)
    onHome()
  }

  return (
    <header className="site-header">
      <div className="header-main">
        <button
          className="menu-toggle"
          type="button"
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <a
          className="brand"
          href="./"
          aria-label="Temu home"
          onClick={goHome}
        >
          TEMU
        </a>

        <form
          className="search-form"
          onSubmit={submitSearch}
          role="search"
          autoComplete="off"
        >
          <label className="visually-hidden" htmlFor="site-search">
            Search products
          </label>

          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="10.8"
              cy="10.8"
              r="7.3"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="m16.3 16.3 5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          <input
            id="site-search"
            type="search"
            placeholder="Search products..."
            aria-controls="search-suggestions"
            aria-expanded={suggestionsOpen && suggestions.length > 0}
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value)
              setSuggestionsOpen(true)
            }}
            onFocus={() => setSuggestionsOpen(true)}
          />

          <button className="search-submit" type="submit">
            Search
          </button>

          <div
            className="search-suggestions"
            id="search-suggestions"
            hidden={!suggestionsOpen || suggestions.length === 0}
            role="listbox"
            aria-label="Search suggestions"
          >
            {suggestions.map((product) => (
              <button
                className="suggestion"
                key={product.id}
                type="button"
                role="option"
                aria-selected="false"
                onClick={() => selectSuggestion(product)}
              >
                {product.name}
              </button>
            ))}
          </div>
        </form>

        <div className="header-actions">

<button
  type="button"
  className="cart-toggle"
  onClick={onCart}
  aria-label="Open shopping cart"
  title="Shopping Cart"
>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </svg>
</button>

          <button
            className="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? (
              <span aria-hidden="true">☀</span>
            ) : (
              <span aria-hidden="true">☾</span>
            )}
          </button>
        </div>
      </div>

      <nav
        className={`main-nav${menuOpen ? ' is-open' : ''}`}
        id="main-navigation"
        aria-label="Product categories"
      >
        {categories.map((category) => (
          <a
            href={`#search/${category.toUpperCase()}`}
            key={category}
            aria-current={selectedCategory === category ? 'page' : undefined}
            onClick={(event) => selectCategory(event, category)}
          >
            {category}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default SiteHeader