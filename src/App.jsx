import './styles/cart.css'
import { useEffect, useState } from 'react'
import SiteHeader from './components/SiteHeader'
import Home from './pages/Home'
import { allProducts } from './data/products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import QuickCheckout from './pages/QuickCheckout'
import LoadingScreen from './components/LoadingScreen'
import SiteFooter from './components/SiteFooter'

function readRoute() {
  const params = new URLSearchParams(window.location.search)
  const page = params.get('page')

  if (page === 'product') {
    const product = allProducts.find(
      (item) => String(item.id) === params.get('id'),
    )

    return product
      ? { page, selectedProduct: product, selectedCategory: null, searchQuery: '' }
      : { page: 'home', selectedProduct: null, selectedCategory: null, searchQuery: '' }
  }

  if (['cart', 'checkout', 'confirmation', 'deals'].includes(page)) {
    return { page, selectedProduct: null, selectedCategory: null, searchQuery: '' }
  }

  return {
    page: 'home',
    selectedProduct: null,
    selectedCategory: params.get('category'),
    searchQuery: params.get('search') || '',
  }
}

function readStoredValue(key, fallback, isValid) {
  try {
    const value = window.localStorage.getItem(key)
    if (value === null) return fallback
    const parsed = JSON.parse(value)
    if (isValid(parsed)) return parsed
    console.error(`Ignoring invalid persisted value for "${key}".`)
  } catch (error) {
    console.error(`Unable to read persisted value for "${key}".`, error)
  }

  return fallback
}

function readStoredTheme() {
  try {
    return window.localStorage.getItem('temu-theme') === 'dark'
  } catch (error) {
    console.error('Unable to read the selected theme.', error)
    return false
  }
}

function buildRouteUrl(route) {
  const params = new URLSearchParams()
  if (route.page !== 'home') params.set('page', route.page)
  if (route.page === 'product') params.set('id', String(route.selectedProduct.id))
  if (route.page === 'home' && route.selectedCategory) {
    params.set('category', route.selectedCategory)
  }
  if (route.page === 'home' && route.searchQuery) {
    params.set('search', route.searchQuery)
  }
  const query = params.toString()
  return `${window.location.pathname}${query ? `?${query}` : ''}`
}

function App() {
  const [darkMode, setDarkMode] = useState(readStoredTheme)
  const [cartItems, setCartItems] = useState(() =>
    readStoredValue(
      'temu-cart',
      [],
      (items) =>
        Array.isArray(items) &&
        items.every(
          (item) =>
            item &&
            Number.isInteger(item.id) &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0,
        ),
    ),
  )
  const [route, setRoute] = useState(readRoute)
  const [quickCheckoutProduct, setQuickCheckoutProduct] = useState(null)
  const [checkoutType, setCheckoutType] = useState(null)
  const [cartMessage, setCartMessage] = useState('')
  const { page: currentPage, selectedProduct, selectedCategory, searchQuery } = route

  useEffect(() => {
    try {
      window.localStorage.setItem('temu-theme', darkMode ? 'dark' : 'light')
    } catch (error) {
      console.error('Unable to save the selected theme.', error)
    }
  }, [darkMode])

  useEffect(() => {
    try {
      window.localStorage.setItem('temu-cart', JSON.stringify(cartItems))
    } catch (error) {
      console.error('Unable to save cart items.', error)
    }
  }, [cartItems])

  useEffect(() => {
    function handlePopState() {
      setRoute(readRoute())
      setQuickCheckoutProduct(null)
      window.scrollTo(0, 0)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (!cartMessage) return

    const timer = setTimeout(() => setCartMessage(''), 3000)
    return () => clearTimeout(timer)
  }, [cartMessage])

  function navigate(nextRoute, { replace = false } = {}) {
    const method = replace ? 'replaceState' : 'pushState'
    window.history[method]({}, '', buildRouteUrl(nextRoute))
    setRoute(nextRoute)
    setQuickCheckoutProduct(null)
    window.scrollTo(0, 0)
  }

  function toggleTheme() {
    setDarkMode((currentMode) => !currentMode)
  }

  function handleAddToCart(product) {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.id === product.id && item.color === product.color,
      )

      if (existingItem) {
        return previousItems.map((item) =>
          item.id === product.id && item.color === product.color
            ? { ...item, quantity: item.quantity + product.quantity }
            : item,
        )
      }

      return [...previousItems, product]
    })

    setCartMessage(`${product.name} added to cart!`)
  }

  function handleUpdateQuantity(productId, color, newQuantity) {
    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.id === productId && item.color === color
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item,
      ),
    )
  }

  function handleRemoveFromCart(productId, color) {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) => !(item.id === productId && item.color === color),
      ),
    )
  }

  function openProductDetails(product) {
    navigate({
      page: 'product',
      selectedProduct: product,
      selectedCategory: null,
      searchQuery: '',
    })
  }

  function openCart() {
    navigate({ page: 'cart', selectedProduct: null, selectedCategory: null, searchQuery: '' })
  }

  function handleHome() {
    navigate({ page: 'home', selectedProduct: null, selectedCategory: null, searchQuery: '' })
  }

  function handleSearch(query) {
    navigate({
      page: 'home',
      selectedProduct: null,
      selectedCategory: null,
      searchQuery: query,
    })
  }

  function handleClearSearch() {
  const nextRoute = {
    ...route,
    searchQuery: '',
  }

  window.history.replaceState(
    {},
    '',
    buildRouteUrl(nextRoute)
  )

  setRoute(nextRoute)
}

  function handleCategory(category) {
    navigate({
      page: 'home',
      selectedProduct: null,
      selectedCategory: category,
      searchQuery: '',
    })
  }

  function openDeals() {
    navigate({ page: 'deals', selectedProduct: null, selectedCategory: null, searchQuery: '' })
  }

  function openQuickCheckout(product) {
    setQuickCheckoutProduct(product)
  }

  function openCheckout() {
    navigate({ page: 'checkout', selectedProduct: null, selectedCategory: null, searchQuery: '' })
  }

  function startOrderProcessing(type) {
    setCheckoutType(type)
    setQuickCheckoutProduct(null)
    setRoute({ ...route, page: 'loading' })
    window.scrollTo(0, 0)
  }

  function finishOrderProcessing() {
    navigate({ page: 'confirmation', selectedProduct: null, selectedCategory: null, searchQuery: '' })
  }

  function continueShopping() {
    if (checkoutType === 'regular') {
      setCartItems([])
    }

    setCheckoutType(null)
    handleHome()
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <div data-theme={darkMode ? 'dark' : 'light'}>
      {cartMessage && (
        <div className="add-cart-toast" role="status" aria-live="polite">
          ✓ {cartMessage}
        </div>
      )}

      <SiteHeader
        key={`${currentPage}:${selectedCategory || ''}:${searchQuery}`}
        products={allProducts}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        currentPage={currentPage}
        onSearch={handleSearch}
        onCategory={handleCategory}
        onHome={handleHome}
        onCart={openCart}
        onDeals={openDeals}
        cartCount={cartCount}
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
        onClearSearch={handleClearSearch}
      />

      {(currentPage === 'home' || currentPage === 'deals') && (
        <Home
          products={allProducts}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          showDeals={currentPage === 'deals'}
          onProductClick={openProductDetails}
          onAddToCart={handleAddToCart}
        />
      )}

      {currentPage === 'product' && selectedProduct && (
        <ProductDetails
          key={selectedProduct.id}
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onQuickCheckout={openQuickCheckout}
        />
      )}

      {currentPage === 'cart' && (
        <Cart
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveFromCart}
          onCheckout={openCheckout}
        />
      )}

      {currentPage === 'checkout' && (
        <Checkout items={cartItems}onPlaceOrder={() => startOrderProcessing('regular')}/>
      )}

      {currentPage === 'loading' && (
        <LoadingScreen
          description="Processing your order..."
          duration={1200}
          onComplete={finishOrderProcessing}
        />
      )}

      {currentPage === 'confirmation' && (
        <Confirmation onContinueShopping={continueShopping} />
      )}

      {quickCheckoutProduct && (
        <QuickCheckout
          product={quickCheckoutProduct}
          onClose={() => setQuickCheckoutProduct(null)}
          onPlaceOrder={() => startOrderProcessing('quick')}
        />
      )}

      {currentPage !== 'loading' && (
        <SiteFooter onHome={handleHome} onCategory={handleCategory} />
      )}
    </div>
  )
}

export default App
