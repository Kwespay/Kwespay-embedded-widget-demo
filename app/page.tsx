"use client";
import { useState } from "react";
import { products } from "@/app/lib/product";
import { Category } from "@/app/lib/types";
import CartDrawer from "./components/Cartdrawer";
import Checkout from "./components/Checkout";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";

type Filter = "all" | Category;

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0c14]">
      <Navbar onCartClick={() => setCartOpen(true)} />

      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-14">
        {/* Hero section */}
        <div className="mb-14 relative">
          {/* Background glow */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#3a5aeb]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <h1
              style={{
                fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                letterSpacing: "0.05em",
              }}
              className="text-[clamp(3.5rem,10vw,7rem)] leading-none text-white"
            >
              WEAR &<br />
              <span className="text-[#3a5aeb]">WIRE.</span>
            </h1>

            <p className="text-white/40 text-base mt-4 max-w-md leading-relaxed">
              Curated drops in clothing and tech — built for people who move
              fast and look sharper doing it.
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-8">
          {(["all", "clothing", "gadgets"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`capitalize text-sm font-semibold px-5 py-2.5 rounded-xl border transition-all duration-200 ${
                filter === f
                  ? "bg-[#3a5aeb] border-[#3a5aeb] text-white shadow-lg shadow-[#3a5aeb]/25"
                  : "border-white/12 text-white/40 hover:border-white/25 hover:text-white/70 bg-white/3"
              }`}
            >
              {f === "all" ? "All Products" : f}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2 text-white/25 text-sm">
            <span>{filtered.length} items</span>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-20 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#3a5aeb] rounded-md flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M2 8L8 2L14 8L8 14L2 8Z" fill="white" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                letterSpacing: "0.15em",
              }}
              className="text-white text-lg"
            >
              DRVN
            </span>
          </div>
          <p className="text-white/20 text-xs">
            © 2026 DRVN. All rights reserved.
          </p>
        </div>
      </main>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckout}
      />
      <Checkout open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
}
