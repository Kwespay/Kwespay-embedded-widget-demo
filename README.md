# DRVN — KwesPay Demo Storefront

A demo storefront built with Next.js to showcase the embedded checkout infrastructure of [KwesPay](https://kwespay.xyz).

This project demonstrates how merchants and developers can integrate KwesPay directly into modern commerce applications to accept stablecoins, volatile crypto assets, and localized fiat pricing including GHS and USD through a seamless embedded checkout experience.

---

## About KwesPay

KwesPay is a global crypto payment infrastructure platform focused on simplifying onchain commerce for merchants, developers, and businesses.

The platform enables:

- Embedded crypto checkout
- Stablecoin and volatile token payments
- Fast settlement
- Automated payment verification
- Multi-asset support
- Localized commerce experiences

with a strong focus on African and cross-border commerce.

---

## What This Demo Showcases

- Embedded KwesPay checkout inside a Next.js app
- Seamless payment flows with a single function call
- Stablecoin and volatile asset payments
- Onchain payment confirmation handling
- Local fiat pricing support (GHS & USD)
- Modern commerce UX

---

## Supported Payments

Customers can complete payments using:

- Stablecoins (USDT, MUSD, USDC)
- ETH
- MEZO
- Volatile crypto assets
- Any EVM-compatible token
- Local fiat pricing in GHS and USD

---

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- React Context API
- KwesPay Embedded Widget (`@kwespay/widget`)

---

## Project Structure

```bash
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

## KwesPay Integration

### Install the Widget

```bash
npm install @kwespay/widget
```

---

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_KWESPAY_API_KEY=pk_your_public_key
NEXT_PUBLIC_KWESPAY_VENDOR_ID=your_vendor_uuid
```

> Never expose secret keys (`sk_...`) in frontend applications.

---

### Full Integration Example

The widget is loaded dynamically — only when payment is initiated — so it stays
out of the initial bundle.

```ts
const handleCryptoPay = async () => {
  const { kwespay } = await import("@kwespay/widget");

  try {
    const result = await kwespay({
      apiKey: process.env.NEXT_PUBLIC_KWESPAY_API_KEY!,
      vendorId: process.env.NEXT_PUBLIC_KWESPAY_VENDOR_ID!,
      amount: total,
      currency: "USD", // supports USD and GHS
    });

    // result.transactionHash is available immediately after confirmation
    finalize(result.transactionHash);
  } catch (err: any) {
    if (err?.code !== "USER_CANCELLED") {
      console.error("Payment failed:", err?.message);
    }
  }
};
```

`kwespay()` handles everything internally — widget construction, amount
reconciliation on re-opens, and cleanup after the payment settles. No refs,
no event listeners, no lifecycle management required.

---

### Configuration

| Key              | Description                                               |
| ---------------- | --------------------------------------------------------- |
| `apiKey`         | Public KwesPay API key (`pk_...`)                         |
| `vendorId`       | Merchant/vendor UUID                                      |
| `amount`         | Fiat amount to charge                                     |
| `currency`       | Fiat pricing currency (`"USD"` or `"GHS"`)                |
| `acceptedTokens` | Optional — restrict to specific tokens or `"stablecoins"` |

---

### Payment Result

`kwespay()` returns a Promise that resolves with:

```ts
{
  transactionHash: string; // On-chain transaction hash
  transactionReference: string; // KwesPay internal reference
  paymentIdBytes32: string; // On-chain payment ID (bytes32)
  transactionStatus: "completed" | "unconfirmed";
  fiatAmount: number;
  currency: string;
  token: string;
  network: string;
}
```

The Promise rejects with an `Error` whose `.code` is one of:

| Code             | Meaning                                           |
| ---------------- | ------------------------------------------------- |
| `USER_CANCELLED` | User closed the widget without completing payment |
| `USER_REJECTED`  | User rejected the transaction in their wallet     |
| `UNKNOWN`        | Unexpected error — check `err.message`            |

---

## Getting Started

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

---

## Why This Demo Exists

This project exists to demonstrate how easily KwesPay can be embedded into modern commerce applications.

Instead of building:

- Smart contract infrastructure
- Wallet handling systems
- Blockchain indexing pipelines
- Payment verification logic
- Settlement tracking systems

developers can integrate KwesPay with a few lines of code and focus entirely on commerce and user experience.

---

## Powered By

[KwesPay](https://kwespay.xyz)
