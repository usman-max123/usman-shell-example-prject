import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SEED_PRODUCTS, SEED_USERS } from '../data/seed'
import { hashPassword, nextId } from '../utils/helpers'

// 1) createContext  -> the shared "box"
const ShopContext = createContext(null)

// useState that also saves to localStorage (this replaces the MySQL database)
function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage full */ }
  }, [key, value])
  return [value, setValue]
}

// 2) The Provider puts data + functions into the box
export function ShopProvider({ children }) {
  const [users, setUsers]       = usePersistentState('sh_users', SEED_USERS)
  const [products, setProducts] = usePersistentState('sh_products', SEED_PRODUCTS)
  const [carts, setCarts]       = usePersistentState('sh_carts', {})     // { userId: [{productId, qty}] }
  const [orders, setOrders]     = usePersistentState('sh_orders', [])
  const [messages, setMessages] = usePersistentState('sh_messages', [])
  const [sessionId, setSessionId] = usePersistentState('sh_session', null)
  const [theme, setTheme]       = usePersistentState('sh_theme', 'dark')
  const [toast, setToast]       = useState('')

  // Apply dark/light class to <body> (your style.css uses body.dark-mode / body.light-mode)
  useEffect(() => {
    document.body.classList.remove('dark-mode', 'light-mode')
    document.body.classList.add(`${theme}-mode`)
  }, [theme])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2200)
  }

  /* ---------------- AUTH ---------------- */
  const currentUser = users.find((u) => u.id === sessionId) || null
  const isAdmin = currentUser?.role === 'admin'

  const register = async ({ name, email, password, phone, address, gender }) => {
    const cleanEmail = email.trim().toLowerCase()
    if (users.some((u) => u.email === cleanEmail)) return { ok: false, error: 'Email already registered!' }
    const passwordHash = await hashPassword(password)
    const user = {
      id: nextId(users), name: name.trim(), email: cleanEmail, passwordHash,
      phone: phone.trim(), address: address.trim(), gender, role: 'user',
      createdAt: new Date().toISOString(),
    }
    setUsers([...users, user])
    return { ok: true }
  }

  const login = async (email, password) => {
    const user = users.find((u) => u.email === email.trim().toLowerCase())
    if (user && user.passwordHash === (await hashPassword(password))) {
      setSessionId(user.id)
      return { ok: true }
    }
    return { ok: false, error: 'Invalid email or password!' }
  }

  const logout = () => setSessionId(null)

  const updateProfile = ({ name, phone, address, gender }) => {
    setUsers(users.map((u) => (u.id === sessionId ? { ...u, name: name.trim(), phone, address, gender } : u)))
  }

  /* ---------------- PRODUCTS ---------------- */
  const addProduct = (p) => setProducts([{ ...p, id: nextId(products) }, ...products])
  const updateProduct = (id, p) => setProducts(products.map((x) => (x.id === id ? { ...x, ...p } : x)))
  const deleteProduct = (id) => setProducts(products.filter((x) => x.id !== id))
  const searchProducts = (q) => {
    const k = q.trim().toLowerCase()
    if (k.length < 2) return []
    return products.filter((p) =>
      [p.name, p.description, p.category].some((f) => f.toLowerCase().includes(k)))
  }

  /* ---------------- CART (per logged-in user) ---------------- */
  const myCart = carts[sessionId] || []
  const setMyCart = (items) => setCarts({ ...carts, [sessionId]: items })

  // returns false when nobody is logged in -> the page then redirects to /login
  const addToCart = (productId) => {
    if (!currentUser) return false
    const found = myCart.find((i) => i.productId === productId)
    setMyCart(found
      ? myCart.map((i) => (i.productId === productId ? { ...i, qty: i.qty + 1 } : i))
      : [...myCart, { productId, qty: 1 }])
    showToast('Added to cart')
    return true
  }
  const updateQty = (productId, qty) =>
    setMyCart(myCart.map((i) => (i.productId === productId ? { ...i, qty: Math.max(1, qty || 1) } : i)))
  const removeFromCart = (productId) => setMyCart(myCart.filter((i) => i.productId !== productId))

  // join cart rows with product details (skip products the admin deleted)
  const cartItems = myCart
    .map((i) => ({ ...i, product: products.find((p) => p.id === i.productId) }))
    .filter((i) => i.product)
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0)
  const cartTotal = cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0)

  /* ---------------- ORDERS ---------------- */
  const placeOrder = () => {
    if (cartItems.length === 0) return
    const order = {
      id: nextId(orders), userId: sessionId, total: cartTotal, status: 'pending',
      createdAt: new Date().toISOString(),
      items: cartItems.map((i) => ({ name: i.product.name, price: i.product.price, qty: i.qty })),
    }
    setOrders([order, ...orders])
    setMyCart([])
  }
  const myOrders = orders.filter((o) => o.userId === sessionId)
  const cancelOrder = (id) =>
    setOrders(orders.map((o) => (o.id === id && o.userId === sessionId && o.status === 'pending'
      ? { ...o, status: 'cancelled' } : o)))
  const updateOrderStatus = (id, status) =>
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)))

  /* ---------------- CONTACT MESSAGES ---------------- */
  const saveMessage = ({ name, email, message }) =>
    setMessages([{ id: nextId(messages), name, email, message, sentAt: new Date().toISOString() }, ...messages])

  /* ---------------- ADMIN: reset ---------------- */
  const resetDemoData = () => {
    setUsers(SEED_USERS); setProducts(SEED_PRODUCTS); setCarts({})
    setOrders([]); setMessages([]); setSessionId(null)
  }

  const value = {
    theme, toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    toast,
    users, products, orders, messages,
    currentUser, isAdmin, register, login, logout, updateProfile,
    addProduct, updateProduct, deleteProduct, searchProducts,
    cartItems, cartCount, cartTotal, addToCart, updateQty, removeFromCart,
    placeOrder, myOrders, cancelOrder, updateOrderStatus,
    saveMessage, resetDemoData,
  }
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

// 3) useContext wrapped in a small hook -> any component can read the box
export const useShop = () => useContext(ShopContext)

// "Add to cart" button logic shared by Home + Gallery:
// not logged in -> go to /login, logged in -> add item
export function useAddToCart() {
  const { addToCart } = useShop()
  const navigate = useNavigate()
  return (productId) => {
    if (!addToCart(productId)) navigate('/login', { state: { msg: 'login_required' } })
  }
}
