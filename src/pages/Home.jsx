import ProductCard from '../components/ProductCard'
import { weeklyDeals, popularProducts, otherProducts } from '../data/products'
import '../styles/home.css'

function Home({ products, searchQuery, selectedCategory, onProductClick, onAddToCart }) {
  if (searchQuery || selectedCategory) {
    const normalizedQuery = searchQuery.toLocaleLowerCase()
    const filteredProducts = products.filter((product) => {
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory
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
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  onProductClick={() => onProductClick?.(product)}

onAddToCart={() => onAddToCart?.({
  ...product,
  quantity: 1
})}

                />
              ))}
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
    <section className="home__hero" aria-labelledby="home-hero-title">
      <div className="home__hero-content">
        <p className="home__hero-label">DISCOVER SOMETHING NEW</p>
        <h1 id="home-hero-title">Great Finds, Great Prices</h1>
        <p className="home__hero-description">
          Explore clothing, electronics, beauty, home essentials,
          and more—all in one place.
        </p>
        <a className="home__hero-button" href="#shop-all-products">
          Shop Now
        </a>
      </div>
    </section>

    <section className="home__section">
      <h2 className="home__title">WEEKLY DEALS</h2>

        <div className="home__products">
          {weeklyDeals.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              onProductClick={() => onProductClick?.(product)}

onAddToCart={() => onAddToCart?.({
  ...product,
  quantity: 1
})}



            />
          ))}
        </div>
      </section>

      <section className="home__section">
        <h2 className="home__title">POPULAR</h2>

        <div className="home__products">
          {popularProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              onProductClick={() => onProductClick?.(product)}

onAddToCart={() => onAddToCart?.({
  ...product,
  quantity: 1
})}

            />
          ))}
        </div>
      </section>

<section className="home__section" id="shop-all-products">
  <h2 className="home__title">SHOP ALL PRODUCTS</h2>

  <div className="home__products">
    {otherProducts.map((product) => (
      <ProductCard
        key={product.id}
        image={product.image}
        name={product.name}
        price={product.price}
        onProductClick={() => onProductClick?.(product)}
        onAddToCart={() =>
          onAddToCart?.({
            ...product,
            quantity: 1,
          })
        }
      />
    ))}
  </div>
</section>
    </main>
  )
}

export default Home