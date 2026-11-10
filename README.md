# Temu Redesign

This project is a responsive redesign of the Temu website created using React, Vite, HTML, CSS, and JavaScript.

## Features

- Responsive mobile and desktop layouts
- Product search with real-time suggestions and no-results feedback
- Loading feedback while placing an order
- Smooth product card and button hover animations
- Product category navigation
- Product details
- Product color and quantity selection
- Shopping cart
- Checkout
- Quick checkout
- Order confirmation
- Light and dark mode

## How to Run the Project Locally

### 1. Install Node.js

Make sure Node.js is installed on your computer.

You can check by opening a terminal and running:

    node --version

You can also check npm by running:

    npm --version

### 2. Open the Project

Download and extract the Temu-Redesign ZIP file.

Open the extracted `Temu-Redesign` folder in Visual Studio Code or another code editor.

### 3. Open a Terminal

In Visual Studio Code, open a terminal by selecting:

Terminal > New Terminal

Make sure the terminal is located inside the project folder.

### 4. Install Dependencies

Run:

    npm install

Wait for all required project dependencies to install.

### 5. Start the Development Server

Run:

    npm run dev

### 6. Open the Website

The terminal will display a local URL, usually similar to:

    http://localhost:5173/

Open the URL shown in the terminal in a web browser.

## Building the Project

To create a production build, run:

    npm run build

The completed build will be created in the `dist` folder.

## Team Members

- Tiana Turner
- Charles Foote
- Nour Eltair
- Tre'on Russell

## Shared Checkout Validation (Charles)

Import the named helpers from `src/utils/validation.js` in either checkout form:

```js
import { validateRequired, validateEmail, validateCardNumber,
  validateExpiration, validateCVC, validateZipCode } from '../utils/validation'

const emailError = validateEmail(email)
const nameError = validateRequired(fullName, 'Full name')
```

Every helper returns an empty string (`''`) for valid input or a specific,
user-facing error message for invalid input. All six helpers reject blank values
and trim surrounding whitespace. Keep input values as strings to preserve leading
zeros in ZIP codes and CVCs.

- `validateRequired(value, label = 'This field')`: required names, addresses, city, or state.
- `validateEmail(value)`: email with a local part and dotted domain.
- `validateCardNumber(value)`: 16 digits, unspaced or grouped as `1234 5678 9012 3456`, matching the regular checkout format. Checks format only.
- `validateExpiration(value, referenceDate = new Date())`: `MM/YY`, interpreted as 2000-2099, with the current month still valid.
- `validateCVC(value)`: three or four digits.
- `validateZipCode(value)`: US five-digit ZIP or ZIP+4 (`12345-6789`).

For Nour and Tre'on: call these helpers after blur or a submission attempt, then
revalidate affected fields on change so corrected errors clear. Skip card checks
when another payment method is selected. Use the returned messages for inline
errors and block submission while any applicable error remains. The helpers do
not track interaction state, change styling, or verify payment credentials.

Run the validation checks with `node --test tests/validation.test.js`.

## Form Validation & User Feedback

The Checkout and Quick Checkout forms include real-time
validation and user feedback to improve the shopping experience.

### Validation Features
- Required field validation
- Email, ZIP code, and payment information validation
- Red borders around invalid fields
- Specific inline error messages near invalid inputs
- Error messages that disappear when corrected
- Helpful guidance messages
- Prevention of order submission with invalid information
- Loading feedback during order processing

### Testing
- Tested regular Checkout with valid and invalid inputs
- Tested Quick Checkout with valid and invalid inputs
- Confirmed errors disappear when corrected
- Confirmed successful orders reach the confirmation page
- Successfully ran npm run build
