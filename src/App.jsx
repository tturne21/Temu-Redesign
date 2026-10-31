

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

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quickCheckoutProduct, setQuickCheckoutProduct] = useState(null)
  const [cartMessage, setCartMessage] = useState('')

useEffect(() => {
  if (!cartMessage) return

  const timer = setTimeout(() => {
    setCartMessage('')
  }, 3000)

  return () => clearTimeout(timer)
}, [cartMessage])


  function toggleTheme() {
    setDarkMode((currentMode) => !currentMode)
  }

  function handleAddToCart(product) {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) =>
          item.id === product.id &&
          item.color === product.color
      )

      if (existingItem) {
        return previousItems.map((item) =>
          item.id === product.id &&
          item.color === product.color
            ? {
                ...item,
                quantity: item.quantity + product.quantity,
              }
            : item
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
          ? {
              ...item,
              quantity: Math.max(1, newQuantity),
            }
          : item
      )
    )
  }

  function handleRemoveFromCart(productId, color) {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) =>
          !(item.id === productId && item.color === color)
      )
    )
  }

  function openProductDetails(product) {
    setSelectedProduct(product)
    setCurrentPage('product')
    window.scrollTo(0, 0)
  }

  function openCart() {
    setQuickCheckoutProduct(null)
    setCurrentPage('cart')
    window.scrollTo(0, 0)
  }

  function handleHome() {
    setSelectedCategory(null)
    setSearchQuery('')
    setSelectedProduct(null)
    setQuickCheckoutProduct(null)
    setCurrentPage('home')
    window.scrollTo(0, 0)
  }

  function handleSearch(query) {
    setSearchQuery(query)
    setSelectedCategory(null)
    setSelectedProduct(null)
    setQuickCheckoutProduct(null)
    setCurrentPage('home')
    window.scrollTo(0, 0)
  }

  function handleCategory(category) {
    setSelectedCategory(category)
    setSearchQuery('')
    setSelectedProduct(null)
    setQuickCheckoutProduct(null)
    setCurrentPage('home')
    window.scrollTo(0, 0)
  }

  function openQuickCheckout(product) {
    setQuickCheckoutProduct(product)
  }

  function openCheckout() {
    setQuickCheckoutProduct(null)
    setCurrentPage('checkout')
    window.scrollTo(0, 0)
  }

  function completeOrder() {
    setQuickCheckoutProduct(null)
    setCurrentPage('confirmation')
    window.scrollTo(0, 0)
  }

  function continueShopping() {
    setCartItems([])
    setSelectedCategory(null)
    setSearchQuery('')
    setSelectedProduct(null)
    setQuickCheckoutProduct(null)
    setCurrentPage('home')
    window.scrollTo(0, 0)
  }

  return (
    <div data-theme={darkMode ? 'dark' : 'light'}>

{cartMessage && (
  <div
    className="add-cart-toast"
    role="status"
    aria-live="polite"
  >
    ✓ {cartMessage}
  </div>
)}

      <SiteHeader
        products={allProducts}
        selectedCategory={selectedCategory}
        onSearch={handleSearch}
        onCategory={handleCategory}
        onHome={handleHome}
        onCart={openCart}
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
      />

      {currentPage === 'home' && (
        <Home
          products={allProducts}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onProductClick={openProductDetails}
          onAddToCart={handleAddToCart}
        />
      )}

      {currentPage === 'product' && selectedProduct && (
        <ProductDetails
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
        <Checkout
          items={cartItems}
          onPlaceOrder={completeOrder}
        />
      )}

      {currentPage === 'confirmation' && (
        <Confirmation
          onContinueShopping={continueShopping}
        />
      )}

      {quickCheckoutProduct && (
        <QuickCheckout
          product={quickCheckoutProduct}
          onClose={() => setQuickCheckoutProduct(null)}
          onPlaceOrder={completeOrder}
        />
      )}
    </div>
  )
}

export default App