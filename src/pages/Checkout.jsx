import { useState, useRef, useEffect} from 'react'
import CheckoutOrderSummary from '../components/CheckoutOrderSummary'
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

  //for changing color of producs in checkout

  const [selectedColors, setSelectedColors] = useState({})

  const checkoutItems = items.map((item, index) => {
  const availableColors = Object.keys(item.colorImages || {})

  const startingColor =
    item.color ||
    (availableColors.includes('Black')
      ? 'Black'
      : availableColors[0] || '')

  const color = selectedColors[index] ?? startingColor

  return {
    ...item,
    color,
    image: item.colorImages?.[color] || item.image
  }
  })
  function handleColorChange(index, newColor) {
  setSelectedColors((current) => ({
    ...current,
    [index]: newColor
  }))
  }
  

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
      items: checkoutItems,
      paymentMethod,
      customer
    }

    setIsProcessing(true)

    onPlaceOrder(order)

  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">CHECKOUT</h1>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit} noValidate>

            {attemptedSubmit && hasErrors && (
              <p className="form-feedback-error" role="alert">
                Please correct the highlighted fields
                before placing your order.
              </p>
            )}

            {connectionError && (
              <p className="form-feedback-error" role="alert">
                {connectionError}
              </p>
            )}


            <section className="checkout-section">
              <h2>CONTACT INFORMATION</h2>

              <CheckoutField
                label="Email Address"
                id="email"
                type="email"
                placeholder="Enter email address"
                {...getFieldProps('email')}
              />
            </section>

            <section className="checkout-section">
              <h2>SHIPPING ADDRESS</h2>

              <div className="checkout-fields">
                <CheckoutField
                  label="Full Name"
                  id="fullName"
                  placeholder="Enter full name"
                  {...getFieldProps('fullName')}
                />

                <CheckoutField
                  label="Street Address"
                  id="address"
                  placeholder="Enter street address"
                  {...getFieldProps('address')}
                />
              </div>

              <div className="checkout-address-row">
                <CheckoutField
                  label="City"
                  id="city"
                  placeholder="Enter city"
                  {...getFieldProps('city')}
                />

                <CheckoutField
                  label="State"
                  id="state"
                  placeholder="Enter state"
                  {...getFieldProps('state')}
                />

                <CheckoutField
                  label="ZIP"
                  id="zip"
                  placeholder="ZIP code"
                  {...getFieldProps('zip')}
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
                    <CheckoutField
                      label="Cardholder Name"
                      id="cardholderName"
                      placeholder="Enter Cardholder Name"
                      autoComplete="off"
                      {...getFieldProps('cardholderName')}
                    />

                    <CheckoutField
                      label="Credit/Debit Card Number"
                      id="cardNumber"
                      placeholder="Enter Card Number"
                      inputMode="numeric"
                      autoComplete="off"
                      {...getFieldProps('cardNumber')}
                    />
                  </div>

                  <div className="checkout-fields">
                    <CheckoutField
                      label="Expiration Date"
                      id="expirationDate"
                      placeholder="MM/YY"
                      autoComplete="off"
                      {...getFieldProps('expirationDate')}
                    />

                    <CheckoutField
                      label="Test CVC"
                      id="cvc"
                      placeholder="123"
                      inputMode="numeric"
                      autoComplete="off"
                      {...getFieldProps('cvc')}
                    />
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

          <CheckoutOrderSummary
            items={checkoutItems}
            onColorChange={handleColorChange}
          />
        </div>
      </div> 
    </main>
  )
}

export default Checkout
