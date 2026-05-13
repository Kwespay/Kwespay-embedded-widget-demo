"use client";
import { useCart } from "@/app/lib/cart";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  open,
  onClose,
  onCheckout,
}: CartDrawerProps) {
  const { items, remove, update, total, count } = useCart();

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0c14] z-50 flex flex-col transition-transform duration-300 ease-out border-l border-white/8 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#3a5aeb] rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 text-white"
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
            </div>
            <h2 className="text-white font-bold text-lg tracking-wide">
              Your Cart
              {count > 0 && (
                <span className="ml-2 text-[#3a5aeb] text-sm font-semibold">
                  ({count} {count === 1 ? "item" : "items"})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-white/25">
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-white/40 font-semibold text-sm">
                  Your cart is empty
                </p>
                <p className="text-white/20 text-xs mt-1">
                  Add items to get started
                </p>
              </div>
            </div>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white/4 hover:bg-white/6 p-3.5 rounded-xl border border-white/6 transition-colors"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-18 h-22 w-[72px] h-[88px] object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#3a5aeb] font-bold">
                    {item.category}
                  </p>
                  <p className="text-white font-semibold text-sm mt-0.5 leading-snug truncate">
                    {item.name}
                  </p>
                  <p className="text-white font-bold mt-1">${item.price}</p>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  {/* Quantity control */}
                  <div className="flex items-center bg-white/8 rounded-lg overflow-hidden border border-white/10">
                    <button
                      onClick={() => update(item.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-7 text-center text-sm font-semibold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => update(item.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => remove(item.id)}
                    className="text-white/25 hover:text-red-400 transition-colors text-xs font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/8 space-y-4 bg-[#0d0f1c]">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/50">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-white/50">
                <span>Shipping</span>
                <span className="text-emerald-400 font-medium">Free</span>
              </div>
              <div className="flex justify-between font-bold text-white text-base pt-2 border-t border-white/8">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-[#3a5aeb] hover:bg-[#2f4bd6] text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#3a5aeb]/30 hover:shadow-[#3a5aeb]/50 hover:-translate-y-0.5"
            >
              Proceed to Checkout
            </button>

            <p className="text-white/20 text-[10px] text-center">
              Secure checkout · Free returns · Encrypted
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
