import { useEffect, useRef, useState } from 'react'
import OrderSummary from '../components/OrderSummary'
import '../styles/checkout.css'
import '../styles/quick-checkout.css'

import {
  validateRequired,
  validateCardNumber,
  validateExpiration,
  validateCVC
} from '../utils/validation'

import '../styles/form-validation.css'


function QuickCheckout({ product, onClose, onPlaceOrder }) {
  const availableColors = product?.colorImages
    ? Object.keys(product.colorImages)
    : []

  const startingColor =
    product?.color ||
    (availableColors.includes('Black')
      ? 'Black'
      : availableColors[0] || '')

  const [color, setColor] = useState(startingColor)
  const [quantity, setQuantity] = useState(
    Math.max(1, Number(product?.quantity) || 1)
  )
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

const [cardFields, setCardFields] = useState({
  cardholder: '',
  cardNumber: '',
  expiration: '',
  cvc: ''
})

const [fieldErrors, setFieldErrors] = useState({})
const [touchedFields, setTouchedFields] = useState({})

const validators = {
  cardholder: (value) => validateRequired(value, 'Cardholder name'),
  cardNumber: validateCardNumber,
  expiration: validateExpiration,
  cvc: validateCVC
}

const cardDetailsComplete =
  paymentMethod === 'card' &&
  Object.keys(validators).every(
    (field) =>
      cardFields[field].trim() !== '' &&
      validators[field](cardFields[field]) === ''
  )


function handleCardFieldChange(event) {
  const { name, value } = event.target

  setCardFields((previous) => ({
    ...previous,
    [name]: value
  }))

  if (touchedFields[name]) {
    setFieldErrors((previous) => ({
      ...previous,
      [name]: validators[name](value)
    }))
  }
}

function handleCardFieldBlur(event) {
  const { name, value } = event.target

  setTouchedFields((previous) => ({
    ...previous,
    [name]: true
  }))

  setFieldErrors((previous) => ({
    ...previous,
    [name]: validators[name](value)
  }))
}


  const closeButtonRef = useRef(null)
  const isSubmittingRef = useRef(false)
  const submitTimerRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (
        event.key === 'Escape' &&
        !isSubmittingRef.current
      ) {
        onClose?.()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [onClose])

  useEffect(() => {
    return () => {
      window.clearTimeout(submitTimerRef.current)
    }
  }, [])

  if (!product) {
    return null
  }

  const displayedImage =
    product.colorImages && color
      ? product.colorImages[color]
      : product.image

  const item = {
    ...product,
    image: displayedImage,
    color,
    quantity,
  }

  const items = [item]

  const price =
    Number(String(product.price).replace(/[^0-9.]/g, '')) || 0

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

if (paymentMethod === 'card') {
  const errors = {
    cardholder: validators.cardholder(cardFields.cardholder),
    cardNumber: validators.cardNumber(cardFields.cardNumber),
    expiration: validators.expiration(cardFields.expiration),
    cvc: validators.cvc(cardFields.cvc)
  }

  setFieldErrors(errors)

  setTouchedFields({
    cardholder: true,
    cardNumber: true,
    expiration: true,
    cvc: true
  })

  if (Object.values(errors).some(Boolean)) {
    setMessage('Please correct the highlighted payment fields before placing your order.')
    return
  }
}


    if (isSubmitting) {
      return
    }

    if (!onPlaceOrder) {
      setMessage('Checkout is not connected yet.')
      return
    }

    const order = {
      items,
      paymentMethod,
    }

    isSubmittingRef.current = true
    setIsSubmitting(true)

    submitTimerRef.current = window.setTimeout(() => {
      onPlaceOrder(order)
    }, 600)
  }

  return (
    <div
      className="quick-checkout-overlay"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isSubmitting
        ) {
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
          disabled={isSubmitting}
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

        
<form onSubmit={handleSubmit} noValidate>

          <div className="quick-checkout-product">
            <img
              className="quick-checkout-image"
              src={displayedImage}
              alt={
                color
                  ? `${product.name} in ${color}`
                  : product.name
              }
            />

            <div className="quick-checkout-info">
              <h3>{product.name}</h3>

              <p className="quick-checkout-price">
                ${price.toFixed(2)}
              </p>

              {availableColors.length > 0 && (
                <div className="quick-checkout-selection">
                  <span>COLOR</span>

                  <div className="quick-checkout-colors">
                    {availableColors.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={
                          color === option ? 'selected' : ''
                        }
                        aria-pressed={color === option}
                        disabled={isSubmitting}
                        onClick={() => setColor(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="quick-checkout-selection">
                <span>QUANTITY</span>

                <div className="quick-checkout-quantity">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={quantity === 1 || isSubmitting}
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
                    disabled={isSubmitting}
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
                {
                  value: 'card',
                  label: 'Credit / Debit Card',
                },
                {
                  value: 'paypal',
                  label: 'PayPal',
                },
                {
                  value: 'applepay',
                  label: 'Apple Pay',
                },
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
                    disabled={isSubmitting}
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
  name="cardholder"

className={fieldErrors.cardholder ? 'form-input-error' : ''}

  placeholder="Enter Name"
  autoComplete="off"
  value={cardFields.cardholder}
  onChange={handleCardFieldChange}
  onBlur={handleCardFieldBlur}
  aria-invalid={Boolean(fieldErrors.cardholder)}
  aria-describedby={fieldErrors.cardholder ? 'cardholder-error' : undefined}
  disabled={isSubmitting}
  required
/>
{fieldErrors.cardholder && (
  <span
    id="cardholder-error"
    className="form-error-message"
    role="alert"
  >
    {fieldErrors.cardholder}
  </span>
)}

                  </label>

                  <label>
                    Credit/Debit Card Number

                   
<input
  type="text"
  name="cardNumber"

className={fieldErrors.cardNumber ? 'form-input-error' : ''}

  placeholder="Enter Card Number"
  inputMode="numeric"
  value={cardFields.cardNumber}
  onChange={handleCardFieldChange}
  onBlur={handleCardFieldBlur}
  aria-invalid={Boolean(fieldErrors.cardNumber)}
  aria-describedby={fieldErrors.cardNumber ? 'card-number-error' : undefined}
  disabled={isSubmitting}
  required
/>
{fieldErrors.cardNumber && (
  <span
    id="card-number-error"
    className="form-error-message"
    role="alert"
  >
    {fieldErrors.cardNumber}
  </span>
)}

                  </label>

                  <div className="quick-checkout-card-row">
                    <label>
                      Card Expiration Date

                      
<input
  type="text"
  name="expiration"

className={fieldErrors.expiration ? 'form-input-error' : ''}

  placeholder="MM/YY"
  autoComplete="off"
  inputMode="numeric"
  value={cardFields.expiration}
  onChange={handleCardFieldChange}
  onBlur={handleCardFieldBlur}
  aria-invalid={Boolean(fieldErrors.expiration)}
  aria-describedby={fieldErrors.expiration ? 'expiration-error' : undefined}
  disabled={isSubmitting}
  required
/>
{fieldErrors.expiration && (
  <span
    id="expiration-error"
   className="form-error-message"
    role="alert"
  >
    {fieldErrors.expiration}
  </span>
)}

                    </label>

                    <label>
                      Test CVC

                      
<input
  type="text"
  name="cvc"

className={fieldErrors.cvc ? 'form-input-error' : ''}

  inputMode="numeric"
  placeholder="123"
  autoComplete="off"
  value={cardFields.cvc}
  onChange={handleCardFieldChange}
  onBlur={handleCardFieldBlur}
  aria-invalid={Boolean(fieldErrors.cvc)}
  aria-describedby={fieldErrors.cvc ? 'cvc-error' : undefined}
  disabled={isSubmitting}
  required
/>
{fieldErrors.cvc && (
  <span
    id="cvc-error"
    className="form-error-message"
    role="alert"
  >
    {fieldErrors.cvc}
  </span>
)}

                    </label>
                  </div>
                </div>
              )}

{cardDetailsComplete && (
  <p className="form-success-message" role="status">
    ✓ Card details complete
  </p>
)}

            </section>

            <div className="quick-checkout-summary">
              <OrderSummary items={items} />

              <button
                type="submit"
                className="quick-checkout-place-order"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <span
                    className="checkout-loading"
                    role="status"
                  >
                    <span
                      className="loading-spinner"
                      aria-hidden="true"
                    />
                    PROCESSING...
                  </span>
                ) : (
                  'PLACE ORDER'
                )}
              </button>

              {message && (
                <p
                  className="quick-checkout-error"
                  role="alert"
                >
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