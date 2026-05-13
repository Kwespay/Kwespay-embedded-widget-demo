"use client";
import { useCart } from "@/app/lib/cart";

interface NavbarProps {
  onCartClick: () => void;
}

export default function Navbar({ onCartClick }: NavbarProps) {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[#0a0c14]/98 backdrop-blur-md border-b border-white/8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between h-18 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#3a5aeb] rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8L8 2L14 8L8 14L2 8Z" fill="white" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              letterSpacing: "0.2em",
            }}
            className="text-2xl text-white font-bold"
          >
            DRVN
          </span>
        </div>

        {/* Nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8">
          {["New Arrivals", "Clothing", "Gadgets", "About"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-white/50 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Cart button */}
        <button
          onClick={onCartClick}
          className="relative flex items-center gap-2.5 px-5 py-2.5 bg-[#3a5aeb] hover:bg-[#2f4bd6] transition-all duration-200 text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#3a5aeb]/25"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>Cart</span>
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-[#3a5aeb] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
