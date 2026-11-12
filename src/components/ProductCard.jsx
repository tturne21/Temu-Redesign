import '../styles/product-card.css'

function ProductCard({ image, name, price, onProductClick, onAddToCart }) {
  return (
    
<article className="product-card">

      
      <button
        type="button"
        className="product-card__link"
        onClick={onProductClick}
        aria-label={`View details for ${name}`}
      >
        <img
          className="product-card__image"
          src={image}
          alt=""
        />
      </button>

      <div className="product-card__info">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">{price}</p>
      </div>

      
<button
  type="button"
  className="product-card__button"
  onClick={(event) => {
    event.stopPropagation()
    onAddToCart?.()
  }}
>
  ADD TO CART
</button>

    </article>
  )
}

export default ProductCard