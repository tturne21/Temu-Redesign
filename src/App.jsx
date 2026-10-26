import { useState } from 'react'
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




const handleAddToCart = (product) => {
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
              quantity: item.quantity + product.quantity
            }
          : item
      )
    }




    return [...previousItems, product]
  })
}


const handleUpdateQuantity = (productId, color, newQuantity) => {
  setCartItems((previousItems) =>
    previousItems.map((item) =>
      item.id === productId && item.color === color
        ? { ...item, quantity: Math.max(1, newQuantity) }
        : item
    )
  )
}


const handleRemoveFromCart = (productId, color) => {
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
  setCurrentPage('cart')
  window.scrollTo(0, 0)
}

function openHome() {
  setCurrentPage('home')
  window.scrollTo(0, 0)
}




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
  setCurrentPage('home')
  setSelectedProduct(null)
  window.scrollTo(0, 0)
}


  return (
    <div data-theme={darkMode ? 'dark' : 'light'}>
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
  />
)}

{currentPage === 'cart' && (
  <Cart
    items={cartItems}
    onUpdateQuantity={handleUpdateQuantity}
    onRemove={handleRemoveFromCart}
    onCheckout={() => setCurrentPage('checkout')}
  />
)}

{currentPage === 'checkout' && (
  <Checkout
    items={cartItems}
    onPlaceOrder={() => {
      setCurrentPage('confirmation')
      window.scrollTo(0, 0)
    }}
  />
)}

{currentPage === 'confirmation' && (
  <Confirmation
    onContinueShopping={openHome}
  />
)}

{quickCheckoutProduct && (
  <QuickCheckout
    product={quickCheckoutProduct}
    onClose={() => setQuickCheckoutProduct(null)}
    onPlaceOrder={() => {
      setQuickCheckoutProduct(null)
      setCurrentPage('confirmation')
      window.scrollTo(0, 0)
    }}
  />
)}






    </div>
  )
}

export default App