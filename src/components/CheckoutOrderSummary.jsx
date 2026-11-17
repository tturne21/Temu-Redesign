
function getPrice(price) {
  return Number(
    String(price ?? 0).replace(/[^0-9.]/g, '')
  ) || 0
}

function CheckoutOrderSummary({ items = [], onColorChange }) {
  const itemCount = items.reduce(
    (total, item) => total + (Number(item.quantity) || 1),
    0
  )

  const subtotal = items.reduce((total, item) => {
    const quantity = Number(item.quantity) || 1
    return total + getPrice(item.price) * quantity
  }, 0)

  const shipping = 0
  const discount = 0
  const estimatedTotal = subtotal + shipping - discount

  return (
    <aside className="checkout-order-summary">
      <h2>Order Summary</h2>

      <p className="checkout-summary-count">
        {itemCount} ITEMS
      </p>

      <div className="checkout-summary-products">
        {items.length === 0 && (
          <p>No products in your cart.</p>
        )}

        {items.map((item, index) => {
          const colors = Object.keys(item.colorImages || {})
          const quantity = Number(item.quantity) || 1
          const price = getPrice(item.price)

          return (
            <article
              className="checkout-summary-product"
              key={`${item.id ?? item.name ?? 'item'}-${index}`}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name || item.title || 'Product'}
                />
              ) : (
                <div className="checkout-summary-placeholder">
                  No image
                </div>
              )}

              <div className="checkout-summary-info">
                <h3>{item.name || item.title || 'Product'}</h3>

                <p>Quantity: {quantity}</p>

                {colors.length > 0 ? (
                  <div className="checkout-summary-color">
                    <span>Color: {item.color}</span>

                    <div className="checkout-summary-color-options">
                      {colors.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={
                            item.color === option
                              ? 'is-selected'
                              : ''
                          }
                          aria-pressed={item.color === option}
                          onClick={() => onColorChange(index, option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  item.color && <p>Color: {item.color}</p>
                )}

                <p className="checkout-summary-price">
                  ${price.toFixed(2)} each
                </p>

                <strong>
                  ${(price * quantity).toFixed(2)}
                </strong>
              </div>
            </article>
          )
        })}
      </div>

      <div className="checkout-summary-row">
        <span>Item Total:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="checkout-summary-row">
        <span>Shipping Cost:</span>
        <span>${shipping.toFixed(2)}</span>
      </div>

      <div className="checkout-summary-row">
        <span>Item Discount:</span>
        <span>-${discount.toFixed(2)}</span>
      </div>

      <hr />

      <div className="checkout-summary-row">
        <strong>Estimated Total:</strong>
        <strong>${estimatedTotal.toFixed(2)}</strong>
      </div>
    </aside>
  )
}

export default CheckoutOrderSummary
