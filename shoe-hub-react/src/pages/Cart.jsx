import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { money } from '../utils/helpers'

export default function Cart() {
  const { cartItems, cartTotal, updateQty, removeFromCart, placeOrder } = useShop()
  const [ordered, setOrdered] = useState(false)
  // local qty edits are applied when the user presses the refresh button (same as the PHP version)
  const [draft, setDraft] = useState({})

  const checkout = () => { placeOrder(); setOrdered(true) }

  return (
    <div className="cart-page">
      <h1><i className="fa fa-shopping-cart"></i> My Cart</h1>

      {ordered && (
        <div className="alert alert-success" style={{ margin: '20px auto', maxWidth: 700 }}>
          ✅ Order placed successfully! Thank you for shopping with Shoe Hub! <Link to="/profile">View my orders</Link>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <i className="fa fa-shopping-cart"></i>
          <p>Your cart is empty!</p>
          <Link to="/" className="add-cart-btn">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-container">
          <table className="cart-table">
            <thead>
              <tr><th>Product</th><th>Name</th><th>Price</th><th>Qty</th><th>Subtotal</th><th>Action</th></tr>
            </thead>
            <tbody>
              {cartItems.map(({ product, qty }) => (
                <tr key={product.id}>
                  <td><img src={product.image} alt={product.name} width="70" /></td>
                  <td>{product.name}</td>
                  <td>{money(product.price)}</td>
                  <td>
                    <div style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
                      <input
                        type="number" min="1" className="qty-input"
                        value={draft[product.id] ?? qty}
                        onChange={(e) => setDraft({ ...draft, [product.id]: e.target.value })}
                      />
                      <button className="update-btn" title="Update quantity"
                        onClick={() => { updateQty(product.id, parseInt(draft[product.id] ?? qty, 10)); setDraft({ ...draft, [product.id]: undefined }) }}>
                        <i className="fa fa-sync"></i>
                      </button>
                    </div>
                  </td>
                  <td>{money(product.price * qty)}</td>
                  <td>
                    <button className="remove-btn" title="Remove" onClick={() => removeFromCart(product.id)}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Subtotal:</span><span>{money(cartTotal)}</span></div>
            <div className="summary-row"><span>Shipping:</span><span>Free</span></div>
            <div className="summary-row total-row"><span>Total:</span><span>{money(cartTotal)}</span></div>
            <button className="checkout-btn" onClick={checkout}>Place Order</button>
            <Link to="/" className="continue-btn">Continue Shopping</Link>
          </div>
        </div>
      )}
    </div>
  )
}
