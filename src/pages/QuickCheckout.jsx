
import { useEffect, useRef, useState } from 'react'
import OrderSummary from '../components/OrderSummary'
import '../styles/checkout.css'
import '../styles/quick-checkout.css'

function QuickCheckout({ product, onClose, onPlaceOrder }) {
  const [color, setColor] = useState(product?.color || 'Blue')
  const [quantity, setQuantity] = useState(
    Math.max(1, Number(product?.quantity) || 1)
  )
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [message, setMessage] = useState('')
  const closeButtonRef = useRef(null)

  const [isProcessing, setIsProcessing] = useState(false)
  const processingTimer = useRef(null)

  useEffect(() => {
    return () => clearTimeout(processingTimer.current)
  }, [])

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose?.()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [onClose])

  if (!product) return null

  const item = { ...product, color, quantity }
  const items = [item]

  const price = Number(
    String(product.price).replace(/[^0-9.]/g, '')
  ) || 0

  
  function handleSubmit(event) {
    event.preventDefault()

    if (isProcessing) return

    setMessage('')

    if (!onPlaceOrder) {
      setMessage('Checkout is not connected yet.')
      return
    }

    const order = {
      items,
      paymentMethod
    }

    setIsProcessing(true)

    processingTimer.current = setTimeout(() => {
      onPlaceOrder(order)
    }, 1000)
  }

  return (
    <div
      className="quick-checkout-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.()
        }
      }}
    >
      <section
        className="quick-checkout-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-checkout-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="quick-checkout-close"
          aria-label="Close quick checkout"
          onClick={() => onClose?.()}
        >
          ×
        </button>

        <h2
          id="quick-checkout-title"
          className="quick-checkout-title"
        >
          QUICK CHECKOUT
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="quick-checkout-product">
            <img
              className="quick-checkout-image"
              src={product.image}
              alt={product.name}
            />

            <div className="quick-checkout-info">
              <h3>{product.name}</h3>

              <p className="quick-checkout-price">
                ${price.toFixed(2)}
              </p>

              <div className="quick-checkout-selection">
                <span>COLOR</span>

                <div className="quick-checkout-colors">
                  {['Pink', 'Blue', 'Black'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={
                        color === option ? 'selected' : ''
                      }
                      aria-pressed={color === option}
                      onClick={() => setColor(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="quick-checkout-selection">
                <span>QUANTITY</span>

                <div className="quick-checkout-quantity">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={quantity === 1}
                    onClick={() =>
                      setQuantity((current) =>
                        Math.max(1, current - 1)
                      )
                    }
                  >
                    −
                  </button>

                  <output>{quantity}</output>

                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() =>
                      setQuantity((current) => current + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="quick-checkout-bottom">
            <section className="quick-checkout-payment">
              <h3>PAYMENT METHOD</h3>
              <p>Select Payment Method:</p>

              {[
                { value: 'card', label: 'Credit / Debit Card' },
                { value: 'paypal', label: 'PayPal' },
                { value: 'applepay', label: 'Apple Pay' }
              ].map((method) => (
                <label
                  key={method.value}
                  className="quick-checkout-payment-option"
                >
                  <input
                    type="radio"
                    name="quickPayment"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={() =>
                      setPaymentMethod(method.value)
                    }
                  />
                  <span>{method.label}</span>
                </label>
              ))}

              {paymentMethod === 'card' && (
                <div className="quick-checkout-card-details">
                  <h4>CARD DETAILS</h4>

                  <label>
                    Cardholder Name
                    <input
                      type="text"
                      placeholder="Enter Name"
                      autoComplete="off"
                      required
                    />
                  </label>

                  <label>
                    Credit/Debit Card Number
                    <input
                      type="text"
                      placeholder="Enter Card Number"
                      inputMode="numeric"
                      pattern="[0-9 ]{16}"
                      required
                    />
                  </label>

                  <div className="quick-checkout-card-row">
                    <label>
                      Card Expiration Date
                      <input
                        type="text"
                        placeholder="MM/YY"
                        autoComplete="off"
                        pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                        required
                      />
                    </label>

                    <label>
                      Test CVC
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="123"
                        autoComplete="off"
                        pattern="[0-9]{3,4}"
                        required
                      />
                    </label>
                  </div>
                </div>
              )}
            </section>

            <div className="quick-checkout-summary">
              <OrderSummary items={items} />

              
                <button
                  type="submit"
                  className="quick-checkout-place-order"
                  disabled={isProcessing}
                  aria-busy={isProcessing}
                >
                
                  {isProcessing ? 'PROCESSING…' : 'PLACE ORDER'}
                </button>

              {message && (
                <p className="quick-checkout-error" role="alert">
                  {message}
                </p>
              )}
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}

export default QuickCheckout
