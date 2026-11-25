
import ProductCard from '../components/ProductCard'
import { weeklyDeals, popularProducts, otherProducts } from '../data/products'
import '../styles/home.css'

function Home({
  products,
  searchQuery,
  selectedCategory,
  showDeals,
  onProductClick,
  onAddToCart,
}) {

  function renderProductCard(product) {
  return (
    <ProductCard
      key={product.id}
      image={product.image}
      name={product.name}
      price={product.price}
      originalPrice={product.originalPrice}
      colorImages={product.colorImages}
      sizes={product.sizes || []}

      onProductClick={(selectedColor, selectedSize) => {
        onProductClick?.({
          ...product,
          color: selectedColor,
          size: selectedSize,
          image:
            product.colorImages?.[selectedColor] ||
            product.image,
        })
      }}

      onAddToCart={(selectedColor, selectedSize) => {
        onAddToCart?.({
          ...product,
          color: selectedColor,
          size: selectedSize,
          image:
            product.colorImages?.[selectedColor] ||
            product.image,
          quantity: 1,
        })
      }}
    />
  )
}

  if (showDeals) {
    return (
      <main className="home">
        <section className="home__section">
          <h1 className="home__title">DEALS</h1>

          <p>
            Save on these featured products while the deals last.
          </p>

          <div className="home__products">
            {weeklyDeals.map(renderProductCard)}
          </div>
        </section>
      </main>
    )
  }

  if (searchQuery || selectedCategory) {
    const normalizedQuery = (searchQuery || '').toLocaleLowerCase()

    const filteredProducts = products.filter((product) => {
      const matchesCategory =
        !selectedCategory ||
        product.category === selectedCategory

      const matchesQuery =
        !normalizedQuery ||
        `${product.name} ${product.category}`
          .toLocaleLowerCase()
          .includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })

    const title = searchQuery
      ? `RESULTS FOR “${searchQuery}”`
      : selectedCategory.toUpperCase()

    return (
      <main className="home">
        <section className="home__section">
          <h2 className="home__title">{title}</h2>

          {filteredProducts.length > 0 ? (
            <div className="home__products">
              {filteredProducts.map(renderProductCard)}
            </div>
          ) : (
            <p className="no-results">
              Try another search or choose a department from the navigation.
            </p>
          )}
        </section>
      </main>
    )
  }

  return (
    <main className="home">

      <section
        className="home__hero"
        aria-labelledby="home-hero-title"
      >
        <div className="home__hero-content">

          <p className="home__hero-label">
            DISCOVER SOMETHING NEW
          </p>

          <h1 id="home-hero-title">
            Great Finds, Great Prices
          </h1>

          <p className="home__hero-description">
            Explore clothing, electronics, beauty, home essentials,
            and more—all in one place.
          </p>

          <a
            className="home__hero-button"
            href="#shop-all-products"
          >
            Shop Now
          </a>

        </div>
      </section>

      <section className="home__section">
        <h2 className="home__title">WEEKLY DEALS</h2>

        <div className="home__products">
          {weeklyDeals.map(renderProductCard)}
        </div>
      </section>

      <section className="home__section">
        <h2 className="home__title">POPULAR</h2>

        <div className="home__products">
          {popularProducts.map(renderProductCard)}
        </div>
      </section>

      <section
        className="home__section"
        id="shop-all-products"
      >
        <h2 className="home__title">SHOP ALL PRODUCTS</h2>

        <div className="home__products">
          {otherProducts.map(renderProductCard)}
        </div>
      </section>

    </main>
  )
}

export default Home
