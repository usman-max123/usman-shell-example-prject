import { useAddToCart } from '../context/ShopContext'
import { money } from '../utils/helpers'

export default function ProductCard({ product }) {
  const addToCart = useAddToCart()
  return (
    <div className="product-card" id={`product-${product.id}`}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">{money(product.price)}</p>
      {product.stock > 0 ? (
        <button className="add-cart-btn" onClick={() => addToCart(product.id)}>
          <i className="fa fa-shopping-cart"></i> Add to Cart
        </button>
      ) : (
        <button className="add-cart-btn out-of-stock" disabled>Out of Stock</button>
      )}
    </div>
  )
}
