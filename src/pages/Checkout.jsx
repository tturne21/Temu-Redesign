
import { useEffect, useRef, useState } from 'react'
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submitTimerRef = useRef(null)

  useEffect(() => () => window.clearTimeout(submitTimerRef.current), [])

  function handleSubmit(event) {
    event.preventDefault()

    if (!onPlaceOrder || isSubmitting) {
      return
    }

    const order = {
      items,
      paymentMethod,
      customer: Object.fromEntries(
        new FormData(event.currentTarget).entries()
      )
    }

    setIsSubmitting(true)
    submitTimerRef.current = window.setTimeout(() => {
      onPlaceOrder(order)
    }, 600)
  }

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
          </section>

          <button
            className="checkout-submit"
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <span className="checkout-loading" role="status">
                <span className="loading-spinner" aria-hidden="true" />
                Placing order…
              </span>
            ) : (
              'PLACE ORDER'
            )}
          </button>
        </form>

        <OrderSummary items={items} />
      </div>
    </main>
  )
}

export default Checkout
