# 1Fi Marketplace — SDE Intern Assignment

> **Shop your favourite gadgets with 0% interest EMI backed by your mutual fund portfolio.**

This project implements the **1Fi Marketplace** section within the existing Shop page of the 1Fi app, built as part of the 1Fi SDE Intern Assignment.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

The app runs at **http://localhost:5173/**

---

## 📋 Assignment Scope

The Shop page contains three tabs:

| Tab | Status |
|-----|--------|
| **A. Top Brands** | Placeholder (no implementation required) |
| **B. Nearby Stores** | Placeholder (no implementation required) |
| **C. 1Fi Marketplace** | ✅ Fully designed and implemented |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 + Custom CSS |
| Icons | Lucide React |
| Animations | Canvas Confetti + CSS Keyframes |
| Data | Async Mock API Service (no hardcoded UI data) |

---

## 📁 Project Structure

```
src/
├── types/
│   └── marketplace.ts             # TypeScript interfaces (Product, EMIPlan, Variant, etc.)
├── data/
│   └── mockProducts.ts            # Mock product catalog & user portfolio data
├── services/
│   └── marketplaceApi.ts          # Async mock API with filters, EMI calculator, pledge flow
├── components/
│   ├── layout/
│   │   ├── Header.tsx             # Top nav with 1Fi branding & credit limit badge
│   │   └── BottomNav.tsx          # Mobile bottom tab bar
│   ├── shop/
│   │   ├── ShopTabs.tsx           # Tab switcher (Top Brands / Nearby Stores / Marketplace)
│   │   ├── TopBrandsPlaceholder.tsx
│   │   └── NearbyStoresPlaceholder.tsx
│   ├── marketplace/
│   │   ├── MarketplaceView.tsx    # Main orchestrator (state, filters, catalog, modals)
│   │   ├── PortfolioLimitBanner.tsx # LAMF hero banner with credit limit card
│   │   ├── FiltersBar.tsx         # Search + category pills + brand chips + sort
│   │   ├── ProductCard.tsx        # Product grid cards with EMI badges
│   │   ├── EMISelector.tsx        # Tenure picker with collateral breakdown
│   │   ├── ProductDetailModal.tsx # Full product view with variants & specs
│   │   ├── PledgeCheckoutModal.tsx # 3-step LAMF checkout flow
│   │   ├── OrderSuccessModal.tsx  # Confetti celebration + order confirmation
│   │   └── PortfolioDetailModal.tsx # Linked mutual fund folios view
│   └── common/
│       ├── SkeletonCard.tsx       # Shimmer loading placeholder
│       └── Toast.tsx              # Toast notification system
└── App.tsx                        # Root component with tabs, footer, mobile frame toggle
```

---

## ✨ Key Features

### Product Browsing
- **9 products** across 6 categories (Smartphones, Laptops, Audio, Wearables, Tablets, Appliances)
- Real-time search across product name, brand, subtitle, and category
- Category filter pills and multi-select brand chips
- Sort by popularity, price, starting EMI, or discount
- Skeleton loading states and empty/error states with retry

### Product Details
- Image gallery with thumbnail selector
- Variant picker (color / storage / RAM) with **live price recalculation**
- Three content tabs: EMI Plans & LAMF, Key Highlights, Tech Specs
- Delivery timeline and warranty information

### EMI Plans & LAMF Calculator
- **7 tenure options**: 3, 6, 9, 12, 18, 24, 36 months
- 0% interest, ₹0 processing fee, ₹0 foreclosure penalty
- Mutual fund collateral requirement (1.45× of product value)
- Savings comparison vs traditional credit card EMI (16% p.a.)
- Note: pledged mutual funds continue to earn market returns

### LAMF Pledge Checkout (3-Step Flow)
1. **Delivery & Plan** — Pre-filled address form + order summary
2. **Select Fund** — Choose mutual fund folio to pledge + PAN verification
3. **Authorize & Confirm** — OTP authorization simulation (demo OTP: `1234`)

### Order Confirmation
- Confetti celebration animation
- Order ID, EMI schedule, pledged fund details, delivery info
- Download Agreement and Continue Shopping CTAs

---

## 🔌 Data & API Architecture

> **No product or EMI data is hardcoded in UI components.**

All data flows through `src/services/marketplaceApi.ts`:

| Method | Purpose | Simulated Delay |
|--------|---------|----------------|
| `getProducts(filters)` | Fetch filtered/sorted product catalog | 350ms |
| `getProductById(id)` | Fetch single product details | 200ms |
| `calculateEMIPlans(amount)` | Compute 7 tenure EMI breakdowns | Sync |
| `verifyKyc(pan, mobile)` | Simulate PAN/KYC verification | 800ms |
| `pledgeAndCheckout(data)` | Simulate mutual fund pledge + order creation | 1200ms |

This architecture allows seamless migration to real backend APIs by replacing the mock implementations.

---

## 🎨 UI/UX Consistency with 1Fi App

| Element | 1Fi Pattern | Implementation |
|---------|------------|----------------|
| Primary Color | `#6C28D9` | Buttons, badges, accents, gradients |
| Button Style | 3D border-bottom press effect | `.btn-1fi-primary` with `border-b-4 #5300D9` |
| Cards | Purple gradient `#EFDAFF` / `#B3A3BF` | Product cards and EMI banners |
| Typography | Inter font family | Google Fonts (300–900 weights) |
| Badges | Pill-shaped `rounded-full` | Categories, brands, discounts, status |
| Trust Signals | CAMS / KFintech verification | Header badge and checkout modals |

---

## 🧪 Verification

| Check | Result |
|-------|--------|
| TypeScript compilation | ✅ Zero errors |
| Vite production build | ✅ Built in ~4s |
| CSS bundle | 51 kB (9.3 kB gzip) |
| JS bundle | 296 kB (87 kB gzip) |
| Responsive design | ✅ Mobile (375px+) and Desktop |

---

## 📝 Assignment Evaluation Criteria Addressed

1. **Product Understanding** — Studied 1Fi app design language, LAMF concept, and existing Shop UX
2. **UI/UX Consistency** — Matched 1Fi brand colors, typography, button styles, card patterns
3. **Engineering Quality** — Clean component architecture, TypeScript types, reusable components
4. **Functionality** — Complete marketplace flow from browse → detail → EMI selection → pledge → order
5. **Data/API Implementation** — Decoupled mock API service with async patterns, ready for real backend
6. **Attention to Detail** — Loading skeletons, error states, toast notifications, form validation, confetti celebration
