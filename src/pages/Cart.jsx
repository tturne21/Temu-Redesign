

import { useEffect, useRef, useState } from 'react'
import '../styles/cart.css'

function Cart({
  items = [],
  onUpdateQuantity,
  onRemove,
  onCheckout
}) {
  const [animatingItem, setAnimatingItem] = useState(null)
  const [removingItem, setRemovingItem] = useState(null)
  const [feedback, setFeedback] = useState('')

  const timers = useRef([])

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout)
    }
  }, [])

  const schedule = (callback, delay) => {
    const timer = setTimeout(callback, delay)
    timers.current.push(timer)
  }

  const getItemKey = (item) =>
    `${item.id}-${item.color || 'default'}`

  const getPrice = (price) =>
    Number(String(price).replace('$', '')) || 0

  const total = items.reduce(
    (sum, item) =>
      sum + getPrice(item.price) * item.quantity,
    0
  )

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const handleQuantityChange = (item, change) => {
    const itemKey = getItemKey(item)

    if (change < 0 && item.quantity <= 1) return

    setAnimatingItem(null)

    onUpdateQuantity?.(
      item.id,
      item.color,
      item.quantity + change
    )

    schedule(() => setAnimatingItem(itemKey), 0)
    schedule(() => {
      setAnimatingItem((current) =>
        current === itemKey ? null : current
      )
    }, 350)
  }

  const handleRemove = (item) => {
    const itemKey = getItemKey(item)

    if (removingItem !== null) return

    setRemovingItem(itemKey)

    schedule(() => {
      onRemove?.(item.id, item.color)
      setRemovingItem(null)
      setFeedback(`${item.name} removed from cart`)
    }, 250)

    schedule(() => setFeedback(''), 3500)
  }

  return (
    <main className="cart-page">
      <h1>Cart</h1>

      <div
        className="cart-feedback"
        role="status"
        aria-live="polite"
      >
        {feedback}
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {items.map((item) => {
              const itemKey = getItemKey(item)

              return (
                <article
                  className={`cart-item ${
                    removingItem === itemKey
                      ? 'cart-item-removing'
                      : ''
                  }`}
                  key={itemKey}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />

                  <div className="cart-item-info">
                    <h2>{item.name}</h2>

                    {item.color && (
                      <p>Color: {item.color}</p>
                    )}

                    <p className="cart-price">
                      ${getPrice(item.price).toFixed(2)}
                    </p>

                    <div className="cart-quantity">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        disabled={item.quantity <= 1 || removingItem !== null}
                        onClick={() =>
                          handleQuantityChange(item, -1)
                        }
                      >
                        -
                      </button>

                      <span
                        key={`${itemKey}-${item.quantity}`}
                        className={
                          animatingItem === itemKey
                            ? 'cart-quantity-pop'
                            : ''
                        }
                        aria-live="polite"
                      >
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        disabled={removingItem !== null}
                        onClick={() =>
                          handleQuantityChange(item, 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="cart-remove"
                      disabled={removingItem !== null}
                      onClick={() => handleRemove(item)}
                    >
                      {removingItem === itemKey
                        ? 'Removing...'
                        : 'Remove'}
                    </button>
                  </div>
                </article>
              )
            })}
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <p>Items: {totalItems}</p>
            <p>Shipping: FREE</p>

            <div className="cart-total">
              <strong>Estimated Total:</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>

            <button
              type="button"
              className="cart-checkout"
              onClick={onCheckout}
            >
              Continue to Checkout
            </button>
          </aside>
        </div>
      )}
    </main>
  )
}

export default Cart
