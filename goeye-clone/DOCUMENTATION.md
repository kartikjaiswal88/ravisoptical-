# GoEye Clone — Project Documentation

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Getting Started](#3-getting-started)
4. [User Guide](#4-user-guide)
   - 4.1 [Storefront — Customer Pages](#41-storefront--customer-pages)
   - 4.2 [Admin Panel](#42-admin-panel)
5. [Code Structure](#5-code-structure)
   - 5.1 [Folder Layout](#51-folder-layout)
   - 5.2 [Entry Points](#52-entry-points)
   - 5.3 [Context / State](#53-context--state)
   - 5.4 [Components](#54-components)
   - 5.5 [Pages — Storefront](#55-pages--storefront)
   - 5.6 [Pages — Admin](#56-pages--admin)
6. [Routing Map](#6-routing-map)
7. [Data Model](#7-data-model)
8. [Key Behaviours & Logic](#8-key-behaviours--logic)
9. [Styling System](#9-styling-system)
10. [Persistence](#10-persistence)
11. [Extending the Project](#11-extending-the-project)

---

## 1. Project Overview

GoEye Clone is a full-featured eyewear e-commerce web application built with React. It replicates the look, feel, and functionality of the GoEye.in storefront and adds a complete admin module for product and order management.

**What it includes:**
- Public storefront with product browsing, filtering, cart, wishlist, and checkout
- Product detail page with lens selection options
- Admin panel (login-protected) for uploading, editing, and deleting products
- Order listing with status tracking
- Fully responsive layout from mobile (320px) to desktop

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Build Tool | Vite 5 |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React |
| State Management | React Context API |
| Persistence | localStorage |
| Language | JavaScript (JSX) |

---

## 3. Getting Started

```bash
# Navigate into the project
cd goeye-clone

# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

**Admin credentials (demo):**
- Email: `admin@goeye.in`
- Password: `admin123`

---

## 4. User Guide

### 4.1 Storefront — Customer Pages

#### Home (`/`)
The landing page. Contains:
- Auto-rotating hero banner (3 slides, 4-second interval) with CTA buttons
- Features bar: Authentic / Free Delivery / Easy Returns / 24/7 Support
- Eyeglasses category grid (Men, Women, Sports, Kids)
- Bestsellers product grid
- Buy 1 Get 1 Free offer banner
- Sunglasses category grid
- Featured Collection grid
- Customer testimonials

#### Shop (`/shop`, `/shop/eyeglasses`, `/shop/sunglasses`, `/shop/kids`)
Product listing page with:
- Left sidebar filters (desktop) or slide-in drawer (mobile):
  - Gender: All / Men / Women / Unisex / Kids
  - Frame Shape: 11 options (aviator, round, rectangle, etc.)
  - Price Range: 5 bands from Under ₹999 to Above ₹2499
  - Clear All Filters button
- Sort dropdown: Relevance / Price Low-High / Price High-Low / Rating / Newest
- Product count shown
- URL-driven filtering — gender and search params are read from the URL query string

#### Product Detail (`/product/:id`)
- Image gallery with prev/next navigation and thumbnail strip
- Discount badge, rating, review count
- Lens selector with 5 options, each adding to the base price:
  - Without Lens (Free)
  - Single Vision (+₹500)
  - Bifocal (+₹800)
  - Progressive (+₹1200)
  - Blue Light Block (+₹600)
- Quantity selector
- Add to Cart (with animated confirmation) and Buy Now buttons
- Wishlist toggle
- Trust badges: Authentic / Free Delivery / 14-Day Returns
- Related products section at the bottom

#### Cart (`/cart`)
- Lists all cart items with image, name, lens option, colour
- Quantity controls (increase / decrease / remove)
- Coupon code input field
- Order summary: subtotal, shipping (free above ₹999), total
- Proceed to Checkout button

#### Checkout (`/checkout`)
3-step flow:
1. **Delivery** — name, email, phone, address, city, state, pincode
2. **Payment** — UPI / Credit-Debit Card / Net Banking / Cash on Delivery
3. **Review** — order summary with all items, totals, place order button

On placing the order, cart is cleared and user is redirected to home after 3 seconds.

#### Wishlist (`/wishlist`)
- Grid of saved products
- Heart icon on any product card toggles wishlist membership
- Empty state with Shop Now CTA

#### About (`/about`)
- Mission statement with image
- 4 value cards: Quality First / Expert Advice / Customer Love / Best Prices
- Stats banner: 50K+ customers, 500+ styles, 6+ years, 4.8★ rating

#### Contact (`/contact`)
- Contact info: phone, email, address
- Contact form: name, email, subject, message with submit confirmation

---

### 4.2 Admin Panel

Access at `/admin/login`. Protected — redirects to login if not authenticated.

#### Login (`/admin/login`)
- Email + password form
- Show/hide password toggle
- Demo credentials shown on page

#### Dashboard (`/admin`)
- 4 stat cards: Total Products, Total Orders, Revenue, Bestsellers count
- Recent Products table: image, name, category, price, stock, status badge

#### Products (`/admin/products`)
- Full product table with search and category filter
- Columns: Product (image + name), Category, Price (sale + original), Stock badge, Featured badge, Actions
- Edit button → navigates to edit form
- Delete button → confirmation modal before deletion
- Add Product button in header

#### Add / Edit Product (`/admin/products/add`, `/admin/products/edit/:id`)
- Image upload from device (file picker) or by pasting a URL — live preview shown
- Fields: Name, Sale Price, Original Price, Color, Stock, Category, Gender, Frame Shape
- Featured Product and Bestseller toggles (custom toggle UI)
- On edit, form is pre-filled with existing product data
- Save / Update button with success animation

#### Orders (`/admin/orders`)
- Order table: Order ID, Customer, Items, Total, Status badge, Date, View button
- Search by customer name or order ID
- Filter by status: pending / processing / shipped / delivered / cancelled
- View button opens a detail modal with full order info

---

## 5. Code Structure

### 5.1 Folder Layout

```
goeye-clone/
├── index.html                  # HTML shell, loads /src/main.jsx
├── vite.config.js              # Vite + React plugin config
├── tailwind.config.js          # Tailwind theme (custom xs breakpoint, colors)
├── postcss.config.js           # PostCSS for Tailwind
├── package.json
└── src/
    ├── main.jsx                # React DOM root render
    ├── App.jsx                 # Router setup, route definitions
    ├── index.css               # Tailwind directives + global styles + utility classes
    ├── context/
    │   └── AppContext.jsx      # Global state: products, cart, wishlist, auth
    ├── components/
    │   ├── Navbar.jsx          # Top navigation bar
    │   ├── Footer.jsx          # Site footer
    │   ├── ProductCard.jsx     # Reusable product tile
    │   └── ProtectedRoute.jsx  # Admin route guard
    └── pages/
        ├── Home.jsx
        ├── Shop.jsx
        ├── ProductDetail.jsx
        ├── Cart.jsx
        ├── Checkout.jsx
        ├── Wishlist.jsx
        ├── About.jsx
        ├── Contact.jsx
        └── admin/
            ├── AdminLogin.jsx
            ├── AdminLayout.jsx
            ├── AdminDashboard.jsx
            ├── AdminProducts.jsx
            ├── AdminAddProduct.jsx
            └── AdminOrders.jsx
```

---

### 5.2 Entry Points

**`index.html`**
Single HTML file. Contains `<div id="root">` and loads `src/main.jsx` as a module script.

**`src/main.jsx`**
Mounts the React app into `#root` using `ReactDOM.createRoot`. Imports `App.jsx` and `index.css`.

**`src/App.jsx`**
Wraps everything in `<AppProvider>` (context) and `<BrowserRouter>` (routing).

Defines two route groups:
- `/admin/*` routes — rendered without Navbar/Footer, wrapped in `<ProtectedRoute>`
- All other routes — rendered inside a flex column with `<Navbar>` and `<Footer>`

---

### 5.3 Context / State

**`src/context/AppContext.jsx`**

Single context that manages all global state. Consumed via the `useApp()` hook.

| State | Type | Description |
|---|---|---|
| `products` | Array | All product objects. Seeded with 12 defaults, persisted to localStorage |
| `cart` | Array | Cart items (product + qty + lensOption). Persisted |
| `wishlist` | Array | Saved products. Persisted |
| `user` | Object / null | Logged-in admin user `{ email, role: 'admin' }` |

**Exposed functions:**

| Function | Description |
|---|---|
| `addToCart(product, qty, lensOption)` | Adds or increments a cart item |
| `removeFromCart(id, lensOption)` | Removes a specific cart line |
| `updateCartQty(id, lensOption, qty)` | Updates quantity; removes if qty < 1 |
| `clearCart()` | Empties the cart (called after order placed) |
| `toggleWishlist(product)` | Adds or removes from wishlist |
| `isInWishlist(id)` | Returns boolean |
| `addProduct(product)` | Admin: adds new product with generated id |
| `updateProduct(id, data)` | Admin: merges data into existing product |
| `deleteProduct(id)` | Admin: removes product by id |
| `loginAdmin(email, password)` | Validates credentials, sets user state |
| `logout()` | Clears user state |

**Computed values:**

| Value | Description |
|---|---|
| `cartCount` | Total quantity across all cart items |
| `cartTotal` | Sum of (price × qty) for all cart items |

---

### 5.4 Components

#### `Navbar.jsx`
- Sticky top bar with logo, desktop nav links, search, wishlist, cart, admin icon
- Desktop: hover dropdowns for Eyeglasses and Sunglasses sub-categories
- Mobile: hamburger opens a slide-in left drawer with search input and all nav links
- Announcement bar at top (dismissible)
- Cart and wishlist badge counts from context

#### `Footer.jsx`
- 4-column grid (2-col on mobile): Brand info + socials, Quick Links, Help & Support, Contact + email subscribe
- All links use React Router `<Link>` for internal navigation

#### `ProductCard.jsx`
- Displays product image, badges (% OFF, Bestseller), wishlist heart, name, shape/colour, rating, price
- Desktop: "Quick Add" bar slides up on hover
- Mobile: always-visible "+ Add" button at bottom of image
- Clicking image or name navigates to `/product/:id`

#### `ProtectedRoute.jsx`
- Reads `user` from context
- If `user` is null or not admin, redirects to `/admin/login`
- Otherwise renders `children`

---

### 5.5 Pages — Storefront

#### `Home.jsx`
- Local state: `currentBanner` (0–2), auto-advances every 4s via `setInterval`
- Derives `bestsellers` and `featured` arrays from context products
- All category image links are hardcoded Unsplash URLs

#### `Shop.jsx`
- Reads `category` from URL params (`useParams`)
- Reads `search`, `gender`, `offer` from query string (`useSearchParams`)
- Local filter state: `selectedShape`, `selectedPrice`, `selectedGender`, `sortBy`, `filtersOpen`
- `filtered` list computed with `useMemo` — recalculates when any filter or product list changes
- `FilterPanel` is an inner component rendered in both desktop sidebar and mobile drawer

#### `ProductDetail.jsx`
- Finds product by `id` param from context products array
- Local state: `selectedLens`, `qty`, `imgIdx`, `added`
- `totalPrice` = `product.price + selectedLens.price`
- `handleAddToCart` passes modified price and lensOption to context

#### `Cart.jsx`
- Reads cart from context, renders empty state if length is 0
- Shipping is free if `cartTotal >= 999`, else ₹99

#### `Checkout.jsx`
- Local state: `step` (1–3), `form` (address fields), `payMethod`, `ordered`
- Step 3 calls `handleOrder` → `clearCart()` → redirects after 3s

#### `Wishlist.jsx`
- Reads wishlist from context, renders `ProductCard` for each item

#### `About.jsx` / `Contact.jsx`
- Static content pages. Contact form has local `sent` state for submit feedback.

---

### 5.6 Pages — Admin

#### `AdminLogin.jsx`
- Local form state, calls `loginAdmin()` from context
- Shows error message on bad credentials
- Redirects to `/admin` on success

#### `AdminLayout.jsx`
- Shared shell for all admin pages: sidebar + top bar + main content area
- Desktop: fixed left sidebar (256px wide)
- Mobile: sidebar hidden, hamburger opens overlay drawer
- Active nav item highlighted by comparing `location.pathname`

#### `AdminDashboard.jsx`
- Derives stats from context products (count, bestseller count)
- Orders count and revenue are static mock values
- Recent products = last 5 items in products array (reversed)

#### `AdminProducts.jsx`
- Local state: `search`, `filterCat`, `confirmDelete`
- Filters products client-side
- Delete triggers a confirmation modal; confirmed delete calls `deleteProduct(id)`

#### `AdminAddProduct.jsx`
- Detects edit mode via `useParams` — if `id` exists, pre-fills form from products array
- Image can be set via file upload (creates object URL) or direct URL input
- On submit: calls `addProduct` or `updateProduct`, shows success state, navigates back

#### `AdminOrders.jsx`
- Uses static `mockOrders` array (no backend)
- Local state: `search`, `filterStatus`, `selectedOrder`
- Clicking View opens a modal with full order details

---

## 6. Routing Map

| Path | Component | Protected |
|---|---|---|
| `/` | Home | No |
| `/shop` | Shop | No |
| `/shop/:category` | Shop | No |
| `/product/:id` | ProductDetail | No |
| `/cart` | Cart | No |
| `/checkout` | Checkout | No |
| `/wishlist` | Wishlist | No |
| `/about` | About | No |
| `/contact` | Contact | No |
| `/admin/login` | AdminLogin | No |
| `/admin` | AdminDashboard | Yes |
| `/admin/products` | AdminProducts | Yes |
| `/admin/products/add` | AdminAddProduct | Yes |
| `/admin/products/edit/:id` | AdminAddProduct | Yes |
| `/admin/orders` | AdminOrders | Yes |

---

## 7. Data Model

### Product

```js
{
  id: Number,           // unique, Date.now() for new products
  name: String,
  category: String,     // 'eyeglasses' | 'sunglasses' | 'kids'
  gender: String,       // 'men' | 'women' | 'unisex' | 'kids'
  price: Number,        // sale price in ₹
  originalPrice: Number,
  image: String,        // URL
  rating: Number,       // 0–5
  reviews: Number,
  shape: String,        // 'aviator' | 'round' | 'rectangle' | 'square' | 'cat-eye' | ...
  color: String,
  stock: Number,
  featured: Boolean,
  bestseller: Boolean
}
```

### Cart Item

```js
{
  ...product,           // all product fields
  qty: Number,
  lensOption: String    // 'Without Lens' | 'Single Vision' | 'Bifocal' | 'Progressive' | 'Blue Light Block'
}
```

### User (admin session)

```js
{
  email: String,
  role: 'admin'
}
```

---

## 8. Key Behaviours & Logic

**Cart identity** — a cart item is uniquely identified by `(id, lensOption)`. The same product with different lens options creates separate line items.

**Price with lens** — `totalPrice = product.price + selectedLens.price`. This combined price is stored in the cart item, not the base price.

**Free shipping threshold** — ₹999. Below this, ₹99 shipping is added at cart and checkout.

**Discount badge** — calculated as `Math.round(((originalPrice - price) / originalPrice) * 100)`.

**Product persistence** — the full products array (including admin-added products) is saved to `localStorage` under `goeye_products`. Cart and wishlist are also persisted separately.

**Admin auth** — credentials are hardcoded in context (`admin@goeye.in` / `admin123`). `ProtectedRoute` checks `user.role === 'admin'`. There is no token or session expiry — auth state lives in React memory and resets on page refresh.

**Search** — triggered from Navbar, navigates to `/shop?search=<query>`. Shop page reads this param and filters by product name and category.

**URL-driven filters** — gender filter from category image links passes `?gender=men` etc. Shop reads this on mount and applies it alongside local filter state.

---

## 9. Styling System

**Tailwind CSS** with a custom config:

```js
// tailwind.config.js
screens: {
  xs: '480px',   // custom — single-column product grids below this
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
}

colors: {
  primary: '#0a0a2e',   // dark navy — used for header, buttons, prices
  accent:  '#f97316',   // orange — used for CTAs, badges, highlights
  gold:    '#d4a017',   // unused reserve
}
```

**Global utility classes** (defined in `index.css`):

| Class | Description |
|---|---|
| `.btn-primary` | Dark navy pill button |
| `.btn-accent` | Orange pill button |
| `.card-hover` | Lift + shadow on hover transition |
| `.scrollbar-hide` | Hides scrollbar cross-browser |

---

## 10. Persistence

Three keys are stored in `localStorage`:

| Key | Contents |
|---|---|
| `goeye_products` | Full products array (including admin changes) |
| `goeye_cart` | Cart items array |
| `goeye_wishlist` | Wishlist products array |

Data is read on initial render via lazy initialiser in `useState`. Each array is written back via `useEffect` whenever it changes.

Admin auth (`user` state) is **not** persisted — refreshing the page logs out the admin.

---

## 11. Extending the Project

**Connect a real backend**
Replace the `products` state in `AppContext` with API calls (`fetch` / `axios`). The function signatures (`addProduct`, `updateProduct`, `deleteProduct`) stay the same — just swap the body to call your API instead of `setProducts`.

**Add real auth**
Replace `loginAdmin` with a JWT-based login. Store the token in `localStorage` and send it as a Bearer header. Update `ProtectedRoute` to validate the token.

**Add more product images**
`AdminAddProduct` already supports file upload (creates a local object URL) and URL input. For production, wire the file upload to an S3 bucket or Cloudinary and store the returned URL.

**Add real orders**
`AdminOrders` uses a static `mockOrders` array. Replace it with an API call. On checkout completion (`handleOrder` in `Checkout.jsx`), POST the order to your backend before calling `clearCart()`.

**Add pagination to Shop**
`Shop.jsx` renders all filtered products at once. Add a `page` state and slice the `filtered` array: `filtered.slice((page-1)*pageSize, page*pageSize)`.

**Add more categories**
Add entries to the `categories` array in `Navbar.jsx` and the `initialProducts` seed in `AppContext.jsx`. The filter system in `Shop.jsx` is already generic — it filters by `p.category` which can be any string.
