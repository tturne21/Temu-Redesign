
import { useState, useRef, useEffect} from 'react'
import OrderSummary from '../components/OrderSummary'
import '../styles/checkout.css'

function CheckoutField({ label, id, placeholder, type = 'text' }) {
  return (
    <label className="checkout-field" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required
      />
    </label>
  )
}

function Checkout({ items = [], onPlaceOrder }) {
  const [paymentMethod, setPaymentMethod] = useState('card')

  function handleSubmit(event) {
    event.preventDefault()

    if (isProcessing || !onPlaceOrder) return

    const customer = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    )

    const order = {
      items,
      paymentMethod,
      customer
    }

    setIsProcessing(true)

    processingTimer.current = setTimeout(() => {
      onPlaceOrder(order)
    }, 1000)
}

  const [isProcessing, setIsProcessing] = useState(false)
  const processingTimer = useRef(null)

  useEffect(() => {
    return () => clearTimeout(processingTimer.current)
    }, [])

  return (
    <main className="checkout-page">
      <h1 className="checkout-title">CHECKOUT</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>

          <section className="checkout-section">
            <h2>CONTACT INFORMATION</h2>

            <CheckoutField
              label="Email Address"
              id="email"
              type="email"
              placeholder="Enter email address"
            />
          </section>

          <section className="checkout-section">
            <h2>SHIPPING ADDRESS</h2>

            <div className="checkout-fields">
              <CheckoutField
                label="Full Name"
                id="fullName"
                placeholder="Enter full name"
              />

              <CheckoutField
                label="Street Address"
                id="address"
                placeholder="Enter street address"
              />
            </div>

            <div className="checkout-address-row">
              <CheckoutField
                label="City"
                id="city"
                placeholder="Enter city"
              />

              <CheckoutField
                label="State"
                id="state"
                placeholder="Enter state"
              />

              <CheckoutField
                label="ZIP"
                id="zip"
                placeholder="ZIP code"
              />
            </div>
          </section>

          <section className="checkout-section">
            <h2>PAYMENT METHOD</h2>

            <div className="checkout-payment-methods">
              <p>Select Payment Method:</p>

              {[
                { value: 'card', label: 'Credit / Debit Card' },
                { value: 'paypal', label: 'PayPal' },
                { value: 'applepay', label: 'Apple Pay' }
              ].map((method) => (
                <label
                  className="checkout-payment-option"
                  key={method.value}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={() => setPaymentMethod(method.value)}
                  />
                  <span>{method.label}</span>
                </label>
              ))}
            </div>

              {paymentMethod === 'card' && (
                <div className="checkout-card-details">
                  <h3>CARD DETAILS</h3>

                  <div className="checkout-fields">
                    <label className="checkout-field">
                      <span>Cardholder Name</span>
                      <input
                        type="text"
                        placeholder="Enter Cardholder Name"
                        autoComplete="off"
                        required
                      />
                    </label>

                    <label className="checkout-field">
                      <span>Credit/Debit Card Number</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter Card Number"
                        pattern="[0-9]{16}|[0-9]{4}( [0-9]{4}){3}"
                        autoComplete="off"
                        required
                      />
                    </label>
                  </div>

                  <div className="checkout-fields">
                    <label className="checkout-field">
                      <span>Expiration Date</span>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                        autoComplete="off"
                        required
                      />
                    </label>

                    <label className="checkout-field">
                      <span>Test CVC</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="123"
                        pattern="[0-9]{3,4}"
                        autoComplete="off"
                        required
                      />
                    </label>
                  </div>
                </div>
              )}

          </section>

          <button
            type="submit"
            className="checkout-submit processing-button "
            disabled={isProcessing}
            aria-busy={isProcessing}
            >
            {isProcessing && (
              <span className="order-spinner" aria-hidden="true" />
            )}

            {isProcessing ? 'PROCESSING…' : 'PLACE ORDER'}
          </button>
        </form>

        <OrderSummary items={items} />
      </div>
    </main>
  )
}

export default Checkout
