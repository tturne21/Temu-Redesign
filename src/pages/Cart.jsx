
import '../styles/cart.css'

function Cart({
  items = [],
  onUpdateQuantity,
  onRemove,
  onCheckout
}) {
  const getPrice = (price) =>
    Number(String(price).replace('$', '')) || 0

  const total = items.reduce(
    (sum, item) =>
      sum + getPrice(item.price) * item.quantity,
    0
  )

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <main className="cart-page">
      <h1>Cart</h1>

      {items.length === 0 ? (
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {items.map((item) => (
              <article
                className="cart-item"
                key={`${item.id}-${item.color || 'default'}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-item-info">
                  <h2>{item.name}</h2>

                  {item.color && (
                    <p>Color: {item.color}</p>
                  )}

                  <p className="cart-price">
                    ${getPrice(item.price).toFixed(2)}
                  </p>

                  <div className="cart-quantity">
                    <button
                      type="button"
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() =>
                        onUpdateQuantity?.(
                          item.id,
                          item.color,
                          item.quantity - 1
                        )
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() =>
                        onUpdateQuantity?.(
                          item.id,
                          item.color,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="cart-remove"
                    onClick={() =>
                      onRemove?.(item.id, item.color)
                    }
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <p>Items: {totalItems}</p>
            <p>Shipping: FREE</p>

            <div className="cart-total">
              <strong>Estimated Total:</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>

            <button
              type="button"
              className="cart-checkout"
              onClick={onCheckout}
            >
              Continue to Checkout
            </button>
          </aside>
        </div>
      )}
    </main>
  )
}

export default Cart
