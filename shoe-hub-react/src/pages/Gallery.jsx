// import { useShop, useAddToCart } from '../context/ShopContext'
// import { money } from '../utils/helpers'

// export default function Gallery() {
//   const { products } = useShop()
//   const addToCart = useAddToCart()
//   return (
//     <>
//       <div className="page-banner">
//         <h1>GALLERY</h1>
//         <p>Explore our exclusive SHOE HUB collection in detail.</p>
//       </div>
//       <section className="gallery-section">
//         <div className="gallery-grid">
//           {products.map((p) => (
//             <div className="gallery-item" key={p.id}>
//               <img src={p.image} alt={p.name} />
//               <div className="overlay">
//                 <h3>{p.name}</h3>
//                 <p>{money(p.price)}</p>
//                 <button className="view-btn" onClick={() => addToCart(p.id)} disabled={p.stock <= 0}>
//                   <i className="fa fa-cart-plus"></i> {p.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   )
// }


import { useState } from 'react'
import { useShop, useAddToCart } from '../context/ShopContext'
import { money } from '../utils/helpers'

export default function Gallery() {
  const { products } = useShop()
  const addToCart = useAddToCart()
  const [sort, setSort] = useState('default')   // remembers the chosen filter

  // copy the array first, then sort the copy
  const sorted = [...products]
  if (sort === 'low')  sorted.sort((a, b) => a.price - b.price)   // low → high
  if (sort === 'high') sorted.sort((a, b) => b.price - a.price)   // high → low

  return (
    <>
      <div className="page-banner">
        <h1>GALLERY</h1>
        <p>Explore our exclusive SHOE HUB collection in detail.</p>
      </div>

      <section className="gallery-section">
        <div className="filter-bar">
          <label><i className="fa fa-filter"></i> Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        <div className="gallery-grid">
          {sorted.map((p) => (            
            <div className="gallery-item" key={p.id}>
              <img src={p.image} alt={p.name} />
              <div className="overlay">
                <h3>{p.name}</h3>
                <p>{money(p.price)}</p>
                <button className="view-btn" onClick={() => addToCart(p.id)} disabled={p.stock <= 0}>
                  <i className="fa fa-cart-plus"></i> {p.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}