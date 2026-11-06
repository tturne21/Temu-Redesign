import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  validateRequired,
  validateEmail,
  validateCardNumber,
  validateExpiration,
  validateCVC,
  validateZipCode,
} from '../src/utils/validation.js'

test('required fields reject missing and whitespace-only values with a useful label', () => {
  for (const value of [undefined, null, '', '   ']) {
    assert.equal(validateRequired(value, 'Full name'), 'Full name is required.')
  }
  assert.equal(validateRequired(' Charles Foote '), '')
})

test('all format validators explain missing values', () => {
  for (const validator of [validateEmail, validateCardNumber, validateExpiration, validateCVC, validateZipCode]) {
    assert.match(validator('   '), /required/)
    assert.match(validator(undefined), /required/)
  }
})

test('email accepts common addresses and rejects incomplete or whitespace-containing addresses', () => {
  for (const value of ['name@example.com', ' name+orders@shop.example.co.uk ']) {
    assert.equal(validateEmail(value), '')
  }
  for (const value of ['name', 'name@', '@example.com', 'name@example', 'a b@example.com', 'a@@example.com']) {
    assert.match(validateEmail(value), /valid email/)
  }
})

test('card numbers accept the checkout formats and reject malformed grouping or characters', () => {
  for (const value of ['1234567890123456', '1234 5678 9012 3456']) {
    assert.equal(validateCardNumber(value), '')
  }
  for (const value of ['123456789012345', '12345678901234567', '1234-5678-9012-3456', '1234 56789012 3456', '123456789012345a']) {
    assert.match(validateCardNumber(value), /16-digit/)
  }
})

test('expiration requires MM/YY and permits the current month through its last day', () => {
  const now = new Date(2026, 10, 30, 23, 59)
  for (const value of ['11/26', '12/26', '01/27']) {
    assert.equal(validateExpiration(value, now), '')
  }
  for (const value of ['10/26', '12/25']) {
    assert.match(validateExpiration(value, now), /expired/)
  }
  for (const value of ['00/27', '13/27', '1/27', '01/2027', 'ab/cd']) {
    assert.match(validateExpiration(value, now), /MM\/YY/)
  }
  assert.match(validateExpiration('12/26', new Date(2027, 0, 1)), /expired/)
})

test('CVC preserves leading zeros and requires three or four digits', () => {
  for (const value of ['012', '0123']) assert.equal(validateCVC(value), '')
  for (const value of ['12', '12345', '1a3', '1 23']) {
    assert.match(validateCVC(value), /3- or 4-digit/)
  }
})

test('ZIP codes accept five digits or ZIP+4 and preserve leading zeros', () => {
  for (const value of ['01234', '01234-5678']) assert.equal(validateZipCode(value), '')
  for (const value of ['1234', '123456', '123456789', '12345-abcd']) {
    assert.match(validateZipCode(value), /5-digit/)
  }
})
