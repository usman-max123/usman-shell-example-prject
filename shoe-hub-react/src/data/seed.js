// Starting data. Used only the first time the site loads (or after "Reset Demo Data").
// After that everything lives in the browser's localStorage.

const img = (n) => `/images/shoe img/shoe${n}.png`

export const SEED_PRODUCTS = [
  { id: 1,  name: 'Air Runner',     price: 120, category: 'New Arrivals', description: 'Lightweight running shoe',    image: img(1),  stock: 15 },
  { id: 2,  name: 'Sport Sneaker',  price: 95,  category: 'New Arrivals', description: 'Casual sport sneaker',        image: img(2),  stock: 20 },
  { id: 3,  name: 'Classic Leather',price: 150, category: 'New Arrivals', description: 'Premium leather shoe',        image: img(3),  stock: 10 },
  { id: 4,  name: 'Run Pro',        price: 130, category: 'New Arrivals', description: 'Professional running shoe',   image: img(4),  stock: 12 },
  { id: 5,  name: 'Urban Walk',     price: 110, category: 'Collection',   description: 'Urban style walking shoe',    image: img(5),  stock: 18 },
  { id: 6,  name: 'Street Sneaker', price: 100, category: 'Collection',   description: 'Street style sneaker',        image: img(6),  stock: 25 },
  { id: 7,  name: 'Runner Elite',   price: 140, category: 'Collection',   description: 'Elite performance runner',    image: img(7),  stock: 8  },
  { id: 8,  name: 'Classic Sport',  price: 125, category: 'Collection',   description: 'Classic sport design',        image: img(8),  stock: 14 },
  { id: 9,  name: 'Trail Master',   price: 135, category: 'Collection',   description: 'Rugged all-terrain shoe',     image: img(9),  stock: 9  },
  { id: 10, name: 'Urban Glide',    price: 115, category: 'Collection',   description: 'Smooth everyday sneaker',     image: img(10), stock: 16 },
]

// Admin login:  admin@shoehub.com  /  password
// (stored as a SHA-256 hash of "password", never as plain text)
export const SEED_USERS = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@shoehub.com',
    passwordHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    phone: '',
    address: '',
    gender: '',
    role: 'admin',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
]
