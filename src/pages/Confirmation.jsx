
import '../styles/confirmation.css'

function Confirmation({ onContinueShopping }) {
  return (
    <main className="confirmation-page">
      <div className="confirmation-content">

        <div
          className="confirmation-status"
          role="status"
        >
          <span className="confirmation-check">✓</span>
          <span>ORDER CONFIRMED!</span>
        </div>

        <p className="confirmation-message">
          THANK YOU! YOUR ORDER HAS BEEN PLACED SUCCESSFULLY AND IS ON ITS WAY!!
        </p>

        <button
          type="button"
          className="confirmation-button"
          onClick={onContinueShopping}
        >
          CONTINUE SHOPPING
        </button>

      </div>
    </main>
  )
}

export default Confirmation
