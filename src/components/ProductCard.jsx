
import { useState, useId } from 'react'
import '../styles/product-card.css'

const colorValues = {
  Beige: '#d8c3a5',
  Burgundy: '#800020',
  Navy: '#172554',
  Black: '#171717',
  Orange: '#ff7701',
  Blue: '#2563eb',
  Pink: '#f4a6c1',
  Grey: '#808080',
  Green: '#52734d',
  Brown: '#795548',
  Silver: '#c0c0c0',
  White: '#ffffff',
  Multicolor: 'conic-gradient(red, orange, yellow, green, blue, purple, red)',
}

function ProductCard({
  image,
  name,
  price,
  originalPrice,
  colorImages,
  sizes = [],
  onProductClick,
  onAddToCart,
}) {
  const colors = Object.keys(colorImages || {})
  const sizeId = useId()

  const [selectedColor, setSelectedColor] = useState(
    () =>
      colors.find((color) => colorImages[color] === image) ||
      colors[0] ||
      ''
  )

  const [selectedSize, setSelectedSize] = useState('')
  const [sizeError, setSizeError] = useState('')

  const currentImage = colorImages?.[selectedColor] || image

  function handleAddToCart(event) {
    event.stopPropagation()

    if (sizes.length > 0 && !sizes.includes(selectedSize)) {
      setSizeError('Please select a size.')
      return
    }

    setSizeError('')
    onAddToCart?.(selectedColor, selectedSize)
  }

  return (
    <article className="product-card">

      <button
        type="button"
        className="product-card__link"
        onClick={() =>
          onProductClick?.(selectedColor, selectedSize)
        }
        aria-label={`View details for ${name}`}
      >
        <img
          className="product-card__image"
          src={currentImage}
          alt=""
        />
      </button>

      <div className="product-card__info">

        <h3 className="product-card__name">
          {name}
        </h3>

        <p className="product-card__price">
          {price}

          {originalPrice && (
            <span className="product-card__original-price">
              {originalPrice}
            </span>
          )}
        </p>

        {/* COLOR SELECTION */}
        {colors.length > 0 && (
          <div className="product-card__colors">

            <div
              className="product-card__swatches"
              role="group"
              aria-label={`Available colors for ${name}`}
            >
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`product-card__swatch ${
                    selectedColor === color
                      ? 'product-card__swatch--selected'
                      : ''
                  }`}
                  style={{
                    '--swatch-color':
                      colorValues[color] || '#808080',
                  }}
                  aria-label={`Select ${color}`}
                  aria-pressed={selectedColor === color}
                  title={color}
                  onClick={(event) => {
                    event.stopPropagation()
                    setSelectedColor(color)
                  }}
                />
              ))}
            </div>

            <span
              className="product-card__color-label"
              aria-live="polite"
            >
              {selectedColor}
            </span>

          </div>
        )}

        {/* SIZE SELECTION */}
        {sizes.length > 0 && (
          <div className="product-card__sizes">

            <label
              htmlFor={sizeId}
              className="product-card__size-label"
            >
              Size
            </label>

            <select
              id={sizeId}
              className="product-card__size-select"
              value={selectedSize}
              aria-label={`Select size for ${name}`}
              aria-required="true"
              aria-invalid={Boolean(sizeError)}
              aria-describedby={
                sizeError ? `${sizeId}-error` : undefined
              }
              onChange={(event) => {
                setSelectedSize(event.target.value)
                setSizeError('')
              }}
            >
              <option value="">Select Size</option>

              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            {sizeError && (
              <p
                id={`${sizeId}-error`}
                className="product-card__size-error"
                role="alert"
              >
                {sizeError}
              </p>
            )}

          </div>
        )}

      </div>

      <button
        type="button"
        className="product-card__button"
        onClick={handleAddToCart}
      >
        ADD TO CART
      </button>

    </article>
  )
}

export default ProductCard
