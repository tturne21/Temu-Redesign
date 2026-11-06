/** Shared checkout validators return an error message, or '' when valid. */
function text(value) {
  return String(value ?? '').trim()
}

export function validateRequired(value, label = 'This field') {
  return text(value) ? '' : `${label} is required.`
}

export function validateEmail(value) {
  const email = text(value)
  return validateRequired(email, 'Email address') ||
    (/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(email)
      ? ''
      : 'Enter a valid email address, such as name@example.com.')
}

// Match the existing checkout's 16-digit format, including grouped spaces.
export function validateCardNumber(value) {
  const card = text(value)
  return validateRequired(card, 'Card number') ||
    (/^(?:[0-9]{16}|[0-9]{4}(?: [0-9]{4}){3})$/.test(card)
      ? ''
      : 'Enter a 16-digit card number, with no spaces or in groups of four.')
}

// A card remains valid through the end of its expiration month.
// Pass a reference date when deterministic validation is needed (e.g. tests).
export function validateExpiration(value, referenceDate = new Date()) {
  const expiration = text(value)
  const requiredError = validateRequired(expiration, 'Expiration date')
  if (requiredError) return requiredError

  if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiration)) {
    return 'Enter the expiration date as MM/YY, such as 12/29.'
  }

  const [month, year] = expiration.split('/').map(Number)
  const currentYear = referenceDate.getFullYear()
  const expirationYear = 2000 + year
  return expirationYear < currentYear ||
    (expirationYear === currentYear && month < referenceDate.getMonth() + 1)
    ? 'This card has expired. Enter a current expiration date.'
    : ''
}

export function validateCVC(value) {
  const cvc = text(value)
  return validateRequired(cvc, 'CVC') ||
    (/^[0-9]{3,4}$/.test(cvc)
      ? ''
      : 'Enter the 3- or 4-digit security code on your card.')
}

export function validateZipCode(value) {
  const zip = text(value)
  return validateRequired(zip, 'ZIP code') ||
    (/^[0-9]{5}(?:-[0-9]{4})?$/.test(zip)
      ? ''
      : 'Enter a 5-digit ZIP code or ZIP+4, such as 12345 or 12345-6789.')
}
