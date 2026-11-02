
function OrderSummary({ items = [] }) {
  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const subtotal = items.reduce((total, item) => {
    const price = Number(item.price.replace('$', ''))

    return total + price * item.quantity
  }, 0)

  //default values for order summary until discounts are added on product details page
  const shipping = 0
  const discount = 0
  const estimatedTotal = subtotal + shipping - discount

  return (
    <aside className="order-summary">
      <h2>Order Summary</h2>

      <p className="order-summary-count">
        {itemCount} ITEMS
      </p>

      <div className="order-summary-row">
        <span>Item Total:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="order-summary-row">
        <span>Shipping Cost:</span>
        <span>${shipping.toFixed(2)}</span>
      </div>

      <div className="order-summary-row">
        <span>Item Discount:</span>
        <span>-${discount.toFixed(2)}</span>
      </div>

      <hr />

      <div className="order-summary-row">
        <strong>Estimated Total:</strong>
        <strong>${estimatedTotal.toFixed(2)}</strong>
      </div>
    </aside>
  )
}

export default OrderSummary
