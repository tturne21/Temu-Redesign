import { useState } from 'react'
import { allProducts } from '../data/products'
import '../styles/product-details.css'

function ProductDetails({ product, onAddToCart, onQuickCheckout }) {
  const selectedProduct = product || allProducts[0]

  const availableColors = selectedProduct.colorImages
    ? Object.keys(selectedProduct.colorImages)
    : []

  const defaultColor = availableColors.includes('Black')
    ? 'Black'
    : availableColors[0] || ''

  const [color, setColor] = useState(defaultColor)
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')

  const price = Number(selectedProduct.price.replace('$', ''))

  const displayedImage =
    selectedProduct.colorImages && color
      ? selectedProduct.colorImages[color]
      : selectedProduct.image

  function handleAddToCart() {
    if (onAddToCart) {
      onAddToCart({
        ...selectedProduct,
        image: displayedImage,
        color,
        quantity,
      })
    }

    setMessage('Product added to cart!')
  }

  function handleQuickCheckout() {
    if (onQuickCheckout) {
      onQuickCheckout({
        ...selectedProduct,
        image: displayedImage,
        color,
        quantity,
      })
    }
  }

  return (
    <main className="product-details">
      <div className="product-details__container">
        <div className="product-details__image">
          <img
            src={displayedImage}
            alt={
              color
                ? `${selectedProduct.name} in ${color}`
                : selectedProduct.name
            }
          />
        </div>

        <div className="product-details__info">
          <h1>{selectedProduct.name}</h1>

          <p className="product-details__price">
            ${price.toFixed(2)}
          </p>

          {availableColors.length > 0 && (
            <div className="product-details__section">
              <h3>COLOR:</h3>

              <div className="product-details__colors">
                {availableColors.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={color === option ? 'selected' : ''}
                    onClick={() => {
                      setColor(option)
                      setMessage('')
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="product-details__section">
            <h3>QUANTITY:</h3>

            <div className="product-details__quantity">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() =>
                  setQuantity(Math.max(1, quantity - 1))
                }
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="product-details__actions">
            <button
              type="button"
              className="product-details__add"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>

            <button
              type="button"
              className="product-details__checkout"
              onClick={handleQuickCheckout}
            >
              QUICK CHECKOUT
            </button>
          </div>

          {message && (
            <p className="product-details__message" role="status">
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

export default ProductDetails