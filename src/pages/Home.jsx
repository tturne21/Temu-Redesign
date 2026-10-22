import ProductCard from '../components/ProductCard'
import { weeklyDeals, popularProducts } from '../data/products'
import '../styles/home.css'

function Home() {
  return (
    <main className="home">
      <section className="home__section">
        <h2 className="home__title">WEEKLY DEALS</h2>

        <div className="home__products">
          {weeklyDeals.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
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
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home