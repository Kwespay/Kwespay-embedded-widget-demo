"use client";
import { Product } from "@/app/lib/types";
import { useCart } from "@/app/lib/cart";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group relative bg-[#0f1120] border border-white/8 rounded-2xl overflow-hidden flex flex-col hover:border-[#3a5aeb]/60 hover:shadow-xl hover:shadow-[#3a5aeb]/10 transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Tag badge */}
        {product.tag && (
          <span className="absolute top-3 left-3 bg-[#3a5aeb] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
            {product.tag}
          </span>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c14]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick add on hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleAdd}
            className={`w-full text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all duration-200 ${
              added
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                : "bg-[#3a5aeb] hover:bg-[#2f4bd6] text-white shadow-lg shadow-[#3a5aeb]/40"
            }`}
          >
            {added ? "✓ Added to Cart" : "Quick Add"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-widest text-[#3a5aeb] font-bold mb-1">
            {product.category}
          </p>
          <h3 className="text-white font-semibold text-sm leading-snug">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white font-bold text-lg">${product.price}</span>
          <button
            onClick={handleAdd}
            className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all duration-200 ${
              added
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                : "bg-[#3a5aeb]/15 text-[#3a5aeb] border border-[#3a5aeb]/30 hover:bg-[#3a5aeb] hover:text-white hover:border-[#3a5aeb]"
            }`}
          >
            {added ? "Added ✓" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
