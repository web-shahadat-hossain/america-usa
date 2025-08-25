"use client";

import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";

const products = [
  {
    name: "Chanel No.5",
    tags: ["Floral", "Luxury"],
    price: "245 USD",
    image: "/collection-01.jpg",
  },
  {
    name: "Dior Sauvage",
    tags: ["Woody", "Men", "Bestseller"],
    price: "29 USD",
    image: "/collection-01.jpg",
  },
  {
    name: "Gucci Bloom",
    tags: ["Fresh", "Woman"],
    price: "245 USD",
    image: "/collection-01.jpg",
  },
  {
    name: "Creed Aventus",
    tags: ["Woody", "Citrus", "Men"],
    price: "245 USD",
    image: "/collection-01.jpg",
  },
];

const CollectionsTable = () => {
  const defaultActiveRow = 1; // Dior Sauvage
  const [activeRow, setActiveRow] = useState<number | null>(defaultActiveRow);

  return (
    <section className="bg-[#EDF1F4] mt-6 rounded-md">
      <div className="max-w-7xl mx-auto px-4 xl:px-0 py-6">
        {/* ===== Mobile Cards (smaller than md) ===== */}
        <div className="md:hidden grid gap-3">
          {products.map((item, idx) => {
            const isActive = idx === defaultActiveRow; // মোবাইলে ডিফল্টটাই হাইলাইট
            return (
              <div
                key={idx}
                className={`w-full rounded-2xl border p-4 flex items-start justify-between gap-3
                  ${
                    isActive
                      ? "border-[#FF740C] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                      : "border-[#D0D5DD] bg-white"
                  }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[18px] font-semibold text-[#0F1728] truncate">
                    {item.name}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.tags.map((t, i) => (
                      <span
                        key={i}
                        className={`px-3 py-[6px] rounded-full text-xs border
                          ${
                            isActive
                              ? "bg-[#FF740C] text-white border-[#FF740C]"
                              : "bg-white text-[#344054] border-[#D0D5DD]"
                          }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 text-[18px] font-medium text-[#0F1728]">
                    {item.price}
                  </div>
                </div>

                <button
                  className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center
                    ${
                      isActive
                        ? "bg-[#FF740C]/80 border-[#FF740C] -rotate-45 text-white"
                        : "border-[#D0D5DD] text-[#0F1728]"
                    }`}
                  aria-label="Open"
                >
                  <GoArrowRight size={18} />
                </button>
              </div>
            );
          })}
        </div>

        {/* ===== Desktop Table (md and up) ===== */}
        <div className="hidden md:block overflow-x-auto md:overflow-visible">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="text-[#667085] text-sm">
                <th className="text-left font-medium py-4">Name</th>
                <th className="text-left font-medium py-4">Tags</th>
                <th className="text-left font-medium py-4">Price</th>
                <th className="py-4 pr-5"></th>
              </tr>
            </thead>

            <tbody>
              {products.map((item, idx) => {
                const isActive = activeRow === idx;
                return (
                  <tr
                    key={idx}
                    onMouseEnter={() => setActiveRow(idx)}
                    onMouseLeave={() => setActiveRow(defaultActiveRow)}
                    className="relative group border-t border-[#465967]/60"
                  >
                    <td className="py-6 text-[20px] leading-tight font-semibold text-[#0F1728]">
                      {item.name}
                    </td>

                    <td className="py-6">
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, i) => (
                          <span
                            key={i}
                            className={`px-3 py-[6px] rounded-full text-xs transition
                              ${
                                isActive
                                  ? "bg-[#FF740C] text-white border border-[#FF740C]"
                                  : "bg-white text-[#344054] border border-[#D0D5DD]"
                              }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-6 text-[20px] text-[#0F1728]">
                      {item.price}
                    </td>

                    <td className="py-6 pr-5">
                      <div className="flex justify-end">
                        <button
                          className={`w-11 h-11 rounded-full border transition-all duration-300 flex items-center justify-center
                            ${
                              isActive
                                ? "bg-[#FF740C]/80 border-[#FF740C] rotate-[-45deg] text-white"
                                : "bg-transparent border-[#D0D5DD] text-[#0F1728] hover:border-[#FF740C]"
                            }`}
                          aria-label="Open"
                        >
                          <GoArrowRight size={20} />
                        </button>
                      </div>
                    </td>

                    {/* Preview card (desktop only) */}
                    <td className="!p-0">
                      <div
                        className={`pointer-events-none hidden xl:block absolute right-24 top-1/2 -translate-y-1/2 transition duration-300
                          ${
                            isActive
                              ? "opacity-100 scale-100 -rotate-[6deg]"
                              : "opacity-0 scale-95"
                          }`}
                      >
                        <div className="relative w-[230px] h-[155px] rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.15)] bg-white">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5" />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={4} className="border-t border-[#D0D5DD]/60"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CollectionsTable;
