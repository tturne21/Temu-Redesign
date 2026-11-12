
import '../styles/footer.css'

function SiteFooter({ onHome, onCategory }) {
  const departments = [
    { label: 'Clothing', category: 'Clothes' },
    { label: 'Electronics', category: 'Electronics' },
    { label: 'Beauty', category: 'Beauty' },
    { label: 'Furniture', category: 'Furniture' },
    { label: 'Toys', category: 'Toys' },
    { label: 'Tools', category: 'Tools' },
  ]

  return (
    <footer className="site-footer">
      <div className="site-footer__container">
        <div className="site-footer__column">
          <h2>Temu Redesign</h2>
          <p>
            Discover affordable finds in fashion,
            electronics, beauty, home essentials,
            and more.
          </p>
        </div>

        <nav className="site-footer__column" aria-label="Footer shop navigation">
          <h2>Shop Departments</h2>
          {departments.map((department) => (
            <button
              key={department.category}
              type="button"
              onClick={() => onCategory(department.category)}
            >
              {department.label}
            </button>
          ))}
        </nav>

        <div className="site-footer__column">
          <h2>Customer Service</h2>
          <p>Help Center</p>
          <p>Contact Us</p>
          <p>Returns & Refunds</p>
        </div>

        <div className="site-footer__column">
          <h2>About Us</h2>
          <p>About Temu</p>
          <p>Privacy Policy</p>
          <p>Terms of Use</p>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© 2026 Temu Redesign | Student Project</p>
        <button type="button" onClick={onHome}>
          Back to Home
        </button>
      </div>
    </footer>
  )
}

export default SiteFooter
