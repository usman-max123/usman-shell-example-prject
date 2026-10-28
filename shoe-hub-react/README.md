# Shoe Hub – E-Commerce Website (React.js)

A complete e-commerce web app built with **React 18 + Vite + React Router**.
Converted from the original PHP/MySQL "Shoe Hub" project. No backend or database is needed:
all data is stored in the browser's `localStorage`, so it can be hosted as a static site on **Vercel**.

## Features
- Home page with hero banner, product sections, image slider and promo pop-up
- Gallery page with hover "Add to Cart"
- Live search bar (name / description / category)
- Register & Login (passwords stored as SHA-256 hashes, never plain text)
- Only logged-in users can use the cart (guests are redirected to Login)
- Cart: change quantity, remove items, place order
- Profile page: view info, edit profile, order history with progress tracker, cancel pending orders
- Contact form (messages are saved and shown to the admin)
- Dark / Light mode (remembered)
- **Admin panel**: add / edit / delete products (with image upload), see users, update order status, read messages

## Demo accounts
| Role  | Email               | Password |
|-------|---------------------|----------|
| Admin | admin@shoehub.com   | password |
| User  | create one on the Register page | – |

## Run locally
```bash
npm install
npm run dev        # open http://localhost:5173
npm run build      # production build -> dist/
```

## Project structure
```
src/
  main.jsx                 entry: BrowserRouter + ShopProvider
  App.jsx                  all routes
  context/ShopContext.jsx  useContext store: auth, products, cart, orders, messages, theme
  data/seed.js             starting products + admin user
  utils/helpers.js         password hash, money/date format, image resize
  components/              Header, Footer, ProductCard, Slider, PromoModal, RequireAuth, SiteLayout
  pages/                   Home, Gallery, About, Contact, Cart, Profile, Login, Register
  pages/admin/             AdminDashboard, ProductForm (add + edit)
public/images/             all pictures
vercel.json                makes page refresh / deep links work on Vercel
```

## Where each React concept is used
- **useState** – forms, tabs, slider, search box
- **useEffect** – slider timer, saving to localStorage, dark/light class, scroll to product
- **useContext** – `ShopContext.jsx` shares user, cart, products etc. with every page (no prop drilling)
- **React Router** – pages, `NavLink`, `Navigate`, route guard `RequireAuth` (protects cart and admin)
- **Controlled components** – every form input

## Deploy: GitHub + Vercel
1. Create an empty repository on https://github.com (e.g. `shoe-hub-react`).
2. In this folder run:
   ```bash
   git init
   git add .
   git commit -m "Shoe Hub e-commerce React project"
   git branch -M main
   git remote add origin https://github.com/usman-max123/shoe-hub-react.git
   git push -u origin main
   ```
3. Go to https://vercel.com → **Add New → Project** → import the GitHub repo.
   Vercel detects Vite automatically (Build: `npm run build`, Output: `dist`). Click **Deploy**.
4. Copy the live `https://….vercel.app` link and submit it with the GitHub link.

## Note about data
Data is saved in each visitor's own browser (localStorage). Products or orders added by the admin
on one device are not visible on another device. Use **Admin → Reset Demo Data** to return to the starting data.
