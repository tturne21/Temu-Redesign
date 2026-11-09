import { useState, useRef, useEffect} from 'react'
import OrderSummary from '../components/OrderSummary'
import '../styles/checkout.css'
import {
  validateRequired,
  validateEmail,
  validateCardNumber,
  validateExpiration,
  validateCVC,
  validateZipCode
} from '../utils/validation'
import '../styles/form-validation.css'

// start form fields off with nothign inside 
const initialValues = {
  email: '',
  fullName: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  cardholderName: '',
  cardNumber: '',
  expirationDate: '',
  cvc: ''
}

// uses the new validator functions for each field
const validators = {
  email: validateEmail,
  fullName: (value) => validateRequired(value, 'Full name'),
  address: (value) => validateRequired(value, 'Street address'),
  city: (value) => validateRequired(value, 'City'),
  state: (value) => validateRequired(value, 'State'),
  zip: validateZipCode,
  cardholderName: (value) =>
    validateRequired(value, 'Cardholder name'),
  cardNumber: validateCardNumber,
  expirationDate: validateExpiration,
  cvc: validateCVC
}

const shippingFields = [
  'email', 'fullName', 'address', 'city', 'state', 'zip'
]

const cardFields = [
  'cardholderName', 'cardNumber', 'expirationDate', 'cvc'
]

// updated checkoutField function that will work with the new validation forms
function CheckoutField({
  label,
  id,
  placeholder,
  type = 'text',
  inputMode,
  autoComplete,
  value,
  onChange,
  onBlur,
  error,
  showFeedback
}) {
  const hasError = showFeedback && Boolean(error)
  const isValid = showFeedback && !error

 return (
    <label className="checkout-field" htmlFor={id}>
      <span>{label}</span>

      <input
        id={id}
        name={shippingFields.includes(id) ? id : undefined}
        type={type}
        placeholder={placeholder}

        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={hasError}
        aria-describedby={
          showFeedback ? `${id}-feedback` : undefined
        }
        className={
          hasError
            ? 'form-input-error'
            : isValid
              ? 'form-input-success'
              : ''
        }
      />
      
      {hasError && (
        <small
          id={`${id}-feedback`}
          className="form-error-message"
        >
          {error}
        </small>
      )}

      {isValid && (
        <small
          id={`${id}-feedback`}
          className="form-success-message"
        >
          Done!
        </small>
      )}
    </label>
  )
}


function Checkout({ items = [], onPlaceOrder }) {
  const [paymentMethod, setPaymentMethod] = useState('card')

  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  const [connectionError, setConnectionError] = useState('')

  const [isProcessing, setIsProcessing] = useState(false)

  

  const activeFields = paymentMethod === 'card'
    ? [...shippingFields, ...cardFields]
    : shippingFields

  const invalidFields = activeFields.filter((id) =>
    Boolean(validators[id](values[id]))
  )

  const hasErrors = invalidFields.length > 0
  /*
  const processingTimer = useRef(null)

  useEffect(() => {
    return () => clearTimeout(processingTimer.current)
    }, [])
 
  */

    function getFieldProps(id) {
    return {
      value: values[id],
      error: validators[id](values[id]),
      showFeedback: Boolean(touched[id] || attemptedSubmit),

      onChange: (event) => {
        const nextValue = event.target.value

        setValues((current) => ({
          ...current,
          [id]: nextValue
        }))

        setTouched((current) => ({
          ...current,
          [id]: true
        }))
      },

      onBlur: () => {
        setTouched((current) => ({
          ...current,
          [id]: true
        }))
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    //if (isProcessing || !onPlaceOrder) return

    if (isProcessing) return

    setAttemptedSubmit(true)
    setConnectionError('')

    if (hasErrors) {
      document.getElementById(invalidFields[0])?.focus()
      return
    }

    if (!onPlaceOrder) {
      setConnectionError('Checkout is not connected yet.')
      return
    }


    const customer = {
      email: values.email.trim(),
      fullName: values.fullName.trim(),
      address: values.address.trim(),
      city: values.city.trim(),
      state: values.state.trim(),
      zip: values.zip.trim()
    }

    const order = {
      items,
      paymentMethod,
      customer
    }

    setIsProcessing(true)

    onPlaceOrder(order)

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
            className="checkout-submit"
            disabled={isProcessing}
            >
            PLACE ORDER
          </button>
        </form>

        <OrderSummary items={items} />
      </div>
    </main>
  )
}

export default Checkout
