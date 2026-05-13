# DRVN — KwesPay Demo Storefront

A demo storefront built with Next.js to showcase the embedded checkout infrastructure of [KwesPay](https://kwespay.xyz).

This project demonstrates how merchants and developers can integrate KwesPay directly into modern commerce applications to accept stablecoins, volatile crypto assets, and localized fiat pricing including GHS and USD through a seamless embedded checkout experience.

---

# About KwesPay

KwesPay is a global crypto payment infrastructure platform focused on simplifying onchain commerce for merchants, developers, and businesses.

The platform enables:

- Embedded crypto checkout
- Stablecoin and volatile token payments
- Fast settlement
- Automated payment verification
- Multi asset support
- Localized commerce experiences

with a strong focus on African and cross border commerce.

---

# What This Demo Showcases

This demo application highlights:

- Embedded KwesPay checkout
- Seamless payment flows inside Next.js apps
- Stablecoin and volatile asset payments
- Dynamic checkout integration
- Onchain payment confirmation handling
- Local fiat pricing support (GHS & USD)
- Modern commerce UX

---

# Supported Payments

Customers can complete payments using:

- Stablecoins
- ETH
- Volatile crypto assets
- EVM compatible tokens
- Local fiat pricing in GHS and USD

including assets like ETH, USDC, and USDT.

---

# Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- React Context API
- KwesPay Embedded Widget (`@kwespay/widget`)

---

# Project Structure

```bash id="w0a7nk"
app/
├── lib/
│   ├── cart.ts
│   ├── product.ts
│   └── types.ts
│
└── (root)/
    ├── page.tsx
    └── components/
        ├── Navbar.tsx
        ├── ProductCard.tsx
        ├── CartDrawer.tsx
        └── Checkout.tsx
```

---

# KwesPay Integration

## Install the Widget

```bash id="e8g5lr"
npm install @kwespay/widget
```

---

# Dynamic Widget Loading

The checkout widget is loaded dynamically only when payment is initiated.

```ts id="v2r6xa"
const { default: KwesPayWidget } = await import("@kwespay/widget");
```

This improves application performance and reduces unnecessary bundle size.

---

# Initialize KwesPay

```ts id="u9d1qm"
widgetRef.current = new KwesPayWidget({
  apiKey: "YOUR_PUBLIC_API_KEY",
  vendorId: "YOUR_VENDOR_ID",
  amount: total,
  currency: "USD", // supports fiat pricing including USD and GHS
});
```

---

# Configuration

| Key        | Description            |
| ---------- | ---------------------- |
| `apiKey`   | Public KwesPay API key |
| `vendorId` | Merchant/vendor UUID   |
| `amount`   | Payment amount         |
| `currency` | Fiat pricing currency  |

---

# Handle Successful Payments

KwesPay emits a `kwespay:paymentSuccess` event after successful onchain payment confirmation.

```ts id="n4t8by"
document.addEventListener("kwespay:paymentSuccess", (e: Event) => {
  const { transactionHash } = (e as CustomEvent).detail;

  finalize(transactionHash);
});
```

The transaction hash can be displayed to users or synced with backend systems.

---

# Open Embedded Checkout

```ts id="h7m2qs"
widgetRef.current.open();
```

Update the payment amount dynamically if the widget instance already exists:

```ts id="x1k5dz"
widgetRef.current.updateAmount(total, "USD");
```

---

# Full Integration Example

```tsx id="s5p3fv"
const openKwesPayWidget = async () => {
  if (!widgetRef.current) {
    const { default: KwesPayWidget } = await import("@kwespay/widget");

    widgetRef.current = new KwesPayWidget({
      apiKey: process.env.NEXT_PUBLIC_KWESPAY_API_KEY!,
      vendorId: process.env.NEXT_PUBLIC_KWESPAY_VENDOR_ID!,
      amount: total,
      currency: "USD",
    });

    document.addEventListener("kwespay:paymentSuccess", (e: Event) => {
      const { transactionHash } = (e as CustomEvent).detail;

      finalize(transactionHash);
    });
  } else {
    widgetRef.current.updateAmount(total, "USD");
  }

  widgetRef.current.open();
};
```

---

# Environment Variables

Create a `.env.local` file:

```env id="b3r7wp"
NEXT_PUBLIC_KWESPAY_API_KEY=pk_your_public_key
NEXT_PUBLIC_KWESPAY_VENDOR_ID=your_vendor_uuid
```

Reference them inside the checkout component:

```ts id="f9q4uh"
apiKey: process.env.NEXT_PUBLIC_KWESPAY_API_KEY!,
vendorId: process.env.NEXT_PUBLIC_KWESPAY_VENDOR_ID!,
```

> Never expose secret keys (`sk_...`) in frontend applications.

---

# Getting Started

## Install Dependencies

```bash id="q2z6vc"
npm install
```

## Start Development Server

```bash id="m7n1ta"
npm run dev
```

## Production Build

```bash id="d8w3ke"
npm run build
npm start
```

---

# Why This Demo Exists

This project exists to demonstrate how easily KwesPay can be embedded into modern commerce applications.

Instead of building:

- smart contract infrastructure
- wallet handling systems
- blockchain indexing pipelines
- payment verification logic
- settlement tracking systems

developers can integrate KwesPay with a few lines of code and focus entirely on commerce and user experience.

---

# Powered By

- [KwesPay](https://kwespay.xyz)
