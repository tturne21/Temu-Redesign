
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

      setMessage('Product added to cart!')
    }
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

        {/* PRODUCT IMAGE */}
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

        {/* PRODUCT INFORMATION */}
        <div className="product-details__info">

          {/* PRODUCT NAME */}
          <h1>{selectedProduct.name}</h1>

          {/* PRODUCT PRICE */}
          <p className="product-details__price">
            ${price.toFixed(2)}

            {selectedProduct.originalPrice && (
              <span className="product-details__original-price">
                {selectedProduct.originalPrice}
              </span>
            )}
          </p>

          {/* PRODUCT DESCRIPTION */}
          <section
            className="product-details__section"
            aria-labelledby="product-description-title"
          >
            <h2 id="product-description-title">
              Product Description
            </h2>

            <p>
              {selectedProduct.description ||
                'No product description available.'}
            </p>
          </section>

          {/* COLOR SELECTION */}
          {availableColors.length > 0 && (
            <div className="product-details__section">
              <h3>COLOR:</h3>

              <div className="product-details__colors">
                {availableColors.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={color === option ? 'selected' : ''}
                    aria-pressed={color === option}
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

          {/* QUANTITY SELECTION */}
          <div className="product-details__section">
            <h3>QUANTITY:</h3>

            <div className="product-details__quantity">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() => {
                  setQuantity(Math.max(1, quantity - 1))
                  setMessage('')
                }}
              >
                −
              </button>

              <span aria-live="polite">{quantity}</span>

              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => {
                  setQuantity(quantity + 1)
                  setMessage('')
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* PURCHASE BUTTONS */}
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

          {/* ADD TO CART CONFIRMATION */}
          <div
            className="product-details__feedback"
            role="status"
            aria-live="polite"
          >
            {message && (
              <p className="product-details__message">
                {message}
              </p>
            )}
          </div>

          {/* PRODUCT SPECIFICATIONS */}
          {selectedProduct.details?.length > 0 && (
            <section
              className="product-details__section"
              aria-labelledby="product-specifications-title"
            >
              <h2 id="product-specifications-title">
                Product Specifications
              </h2>

              <ul>
                {selectedProduct.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </section>
          )}

          {/* PRODUCT AND DELIVERY INFORMATION */}
          <section
            className="product-details__section"
            aria-labelledby="product-info-title"
          >
            <h2 id="product-info-title">
              Product &amp; Delivery Information
            </h2>

            <p>
              Category: {selectedProduct.category}
            </p>

            <p>
              Price per item: ${price.toFixed(2)}
            </p>

            <p>
              Delivery options and estimated arrival dates
              are shown at checkout when available.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}

export default ProductDetails
