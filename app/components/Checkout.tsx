"use client";
import { useState } from "react";
import { useCart } from "@/app/lib/cart";

interface CheckoutProps {
  open: boolean;
  onClose: () => void;
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
  half = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  half?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${half ? "" : "w-full"}`}>
      <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#3a5aeb] focus:bg-[#3a5aeb]/5 transition-all duration-200"
      />
    </div>
  );
}

const EMPTY_FORM = {
  name: "",
  email: "",
  address: "",
  city: "",
  zip: "",
  card: "",
  expiry: "",
  cvv: "",
};

export default function Checkout({ open, onClose }: CheckoutProps) {
  const { items, total, clear } = useCart();

  const [done, setDone] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [payMethod, setPayMethod] = useState<"card" | "crypto">("card");
  const [cryptoPending, setCryptoPending] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSuccess = (hash?: string) => {
    clear();
    if (hash) setTxHash(hash);
    setDone(true);

    setTimeout(() => {
      onClose();
      setTimeout(() => {
        setDone(false);
        setTxHash("");
        setCryptoPending(false);
        setForm(EMPTY_FORM);
      }, 0);
    }, 5000);
  };

  const handleCardPay = () => {
    if (!cardValid) return;
    handleSuccess();
  };

  const handleCryptoPay = async () => {
    const { kwespay } = await import("@kwespay/widget");

    setCryptoPending(true);
    try {
      const result = await kwespay({
        apiKey: process.env.NEXT_PUBLIC_KWESPAY_API_KEY!,
        vendorId: process.env.NEXT_PUBLIC_KWESPAY_VENDOR_ID!,
        amount: total,
        currency: "USD",
      });
      handleSuccess(result.transactionHash);
    } catch (err: any) {
      if (err?.code !== "USER_CANCELLED" && err?.code !== "USER_REJECTED") {
        console.error("[Checkout] crypto payment failed:", err?.message);
      }
    } finally {
      setCryptoPending(false);
    }
  };

  if (!open) return null;

  if (done) {
    return (
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center px-4">
        <div
          className="bg-[#0a0c14] w-full max-w-md border border-white/8 rounded-2xl shadow-2xl
                     flex flex-col items-center gap-6 text-center px-8 py-14
                     animate-[fadeUp_0.35s_cubic-bezier(0.16,1,0.3,1)_both]"
        >
          <style>{`
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(16px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes checkPop {
              0%   { transform: scale(0.4); opacity: 0; }
              60%  { transform: scale(1.15); }
              100% { transform: scale(1); opacity: 1; }
            }
          `}</style>

          <div
            className="w-20 h-20 rounded-2xl bg-emerald-500/15 border border-emerald-500/30
                       flex items-center justify-center
                       animate-[checkPop_0.5s_cubic-bezier(0.16,1,0.3,1)_0.15s_both]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <h2 className="text-white font-bold text-2xl tracking-tight">
              Order Confirmed!
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto">
              Your order has been placed. A confirmation email is on its way.
            </p>
          </div>

          {txHash && (
            <div className="bg-white/5 border border-white/8 rounded-xl px-4 py-3 w-full">
              <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1.5">
                Transaction Hash
              </p>
              <p className="text-white/50 text-xs font-mono break-all leading-relaxed">
                {txHash}
              </p>
            </div>
          )}

          <p className="text-white/20 text-[11px]">
            This window will close automatically…
          </p>
        </div>
      </div>
    );
  }

  const cardValid =
    form.name && form.email && form.card && form.expiry && form.cvv;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 overflow-y-auto">
      <div className="min-h-screen flex items-start justify-center py-10 px-4">
        <div className="bg-[#0a0c14] w-full max-w-3xl relative border border-white/8 rounded-2xl overflow-hidden shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 rounded-lg transition-all z-10"
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

          <div className="flex flex-col lg:flex-row">
            {/* ── Left panel ── */}
            <div className="flex-1 p-8 space-y-7 border-b lg:border-b-0 lg:border-r border-white/8">
              <div>
                <h2 className="text-white font-bold text-2xl tracking-tight">
                  Checkout
                </h2>
                <p className="text-white/35 text-sm mt-1">
                  Complete your order below
                </p>
              </div>

              <section className="space-y-4">
                <SectionHeading number={1} label="Contact & Shipping" />
                <div className="space-y-3">
                  <InputField
                    label="Full Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                  <InputField
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    type="email"
                  />
                  <InputField
                    label="Street Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="123 Main St"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField
                      label="City"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="New York"
                      half
                    />
                    <InputField
                      label="ZIP Code"
                      name="zip"
                      value={form.zip}
                      onChange={handleChange}
                      placeholder="10001"
                      half
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <SectionHeading number={2} label="Payment Method" />

                <div className="grid grid-cols-2 gap-2">
                  {(["card", "crypto"] as const).map((method) => (
                    <button
                      key={method}
                      onClick={() => setPayMethod(method)}
                      className={`flex items-center gap-2.5 px-4 py-3 border text-sm font-semibold transition-all duration-200 rounded-xl ${
                        payMethod === method
                          ? "border-[#3a5aeb] bg-[#3a5aeb]/12 text-white shadow-lg shadow-[#3a5aeb]/10"
                          : "border-white/10 text-white/35 hover:border-white/25 hover:text-white/60 bg-white/3"
                      }`}
                    >
                      {method === "card" ? (
                        <>
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
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                          Credit Card
                        </>
                      ) : (
                        <>
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
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Pay with Crypto
                        </>
                      )}
                    </button>
                  ))}
                </div>

                {payMethod === "card" && (
                  <div className="space-y-3">
                    <InputField
                      label="Card Number"
                      name="card"
                      value={form.card}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <InputField
                        label="Expiry"
                        name="expiry"
                        value={form.expiry}
                        onChange={handleChange}
                        placeholder="MM / YY"
                        maxLength={7}
                        half
                      />
                      <InputField
                        label="CVV"
                        name="cvv"
                        value={form.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength={4}
                        half
                      />
                    </div>
                    <button
                      onClick={handleCardPay}
                      disabled={!cardValid}
                      className="w-full bg-[#3a5aeb] hover:bg-[#2f4bd6] disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#3a5aeb]/25 hover:shadow-[#3a5aeb]/40 hover:-translate-y-0.5 mt-1"
                    >
                      Place Order — ${total.toFixed(2)}
                    </button>
                  </div>
                )}

                {payMethod === "crypto" && (
                  <div className="space-y-4">
                    <div className="bg-[#3a5aeb]/8 border border-[#3a5aeb]/20 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#3a5aeb]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-[#3a5aeb]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white/70 text-xs font-semibold mb-1">
                            Pay with ETH, USDC, or USDT
                          </p>
                          <p className="text-white/35 text-xs leading-relaxed">
                            Your payment is processed securely via KwesPay.
                            Click below to open the crypto payment widget.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleCryptoPay}
                      disabled={cryptoPending}
                      className="w-full bg-[#3a5aeb] hover:bg-[#2f4bd6] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#3a5aeb]/25 hover:shadow-[#3a5aeb]/40 hover:-translate-y-0.5"
                    >
                      {cryptoPending ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="w-4 h-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            />
                          </svg>
                          Processing…
                        </span>
                      ) : (
                        `Pay $${total.toFixed(2)} with Crypto`
                      )}
                    </button>
                  </div>
                )}

                <p className="text-white/15 text-[10px] text-center">
                  🔒 Secured by SSL encryption · Powered by KwesPay
                </p>
              </section>
            </div>

            {/* ── Order summary panel ── */}
            <div className="lg:w-72 p-7 bg-[#0d0f1c] space-y-5">
              <h3 className="text-white font-bold text-base tracking-tight">
                Order Summary
              </h3>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <span className="absolute -top-1.5 -right-1.5 bg-[#3a5aeb] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] uppercase tracking-widest text-[#3a5aeb] font-bold">
                        {item.category}
                      </p>
                      <p className="text-white text-xs font-semibold leading-snug mt-0.5 truncate">
                        {item.name}
                      </p>
                      <p className="text-white/60 text-xs font-bold mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/8 pt-4 space-y-2.5">
                <div className="flex justify-between text-xs text-white/40">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-white/40">
                  <span>Shipping</span>
                  <span className="text-emerald-400 font-semibold">Free</span>
                </div>
                <div className="flex justify-between font-bold text-white pt-2 border-t border-white/8">
                  <span>Total</span>
                  <span className="text-[#3a5aeb]">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                {[
                  "Free worldwide shipping",
                  "30-day free returns",
                  "Secure payments",
                ].map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 text-[10px] text-white/25"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5 text-emerald-500/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ number, label }: { number: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-full bg-[#3a5aeb] flex items-center justify-center text-[10px] text-white font-bold">
        {number}
      </div>
      <p className="text-xs uppercase tracking-widest text-white/50 font-semibold">
        {label}
      </p>
    </div>
  );
}
