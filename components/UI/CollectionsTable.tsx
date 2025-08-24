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
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 xl:px-0">
      <div className="overflow-x-auto xl:overflow-hidden scrollbar-thin scrollbar-thumb-gray-300">
        <table className="table w-full min-w-[700px]">
          {/* Table Head */}
          <thead>
            <tr className="text-gray-500 text-sm font-medium">
              <th className="w-1/4">Name</th>
              <th className="w-1/3">Tags</th>
              <th className="w-1/6">Price</th>
              <th className="w-1/6"></th>
            </tr>
          </thead>

          <tbody>
            {products.map((item, idx) => {
              const isActive = activeRow === idx;

              return (
                <tr
                  key={idx}
                  onMouseEnter={() => setActiveRow(idx)}
                  onMouseLeave={() => setActiveRow(null)}
                  onClick={() => setActiveRow(isActive ? null : idx)}
                  className="relative cursor-pointer transition"
                >
                  {/* Name */}
                  <td className="font-semibold text-md">{item.name}</td>

                  {/* Tags */}
                  <td>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 rounded-full text-xs border transition 
                          ${
                            isActive
                              ? "bg-[#FF5C00] text-[#FFFFFF] border-[#FF5C00]"
                              : "bg-white text-gray-700 border-gray-700"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Price */}
                  <td className="text-lg text-gray-800">{item.price}</td>

                  {/* Arrow Button */}
                  <td className="flex justify-end">
                    <button
                      className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300
                        ${
                          isActive
                            ? "bg-[#FF740C80] border-orange-500 -rotate-45"
                            : "hover:bg-transparent text-[#000000]"
                        }`}
                    >
                      <GoArrowRight size={20} />
                    </button>
                  </td>

                  {/* Hover Preview Card */}
                  <td className="absolute right-20 top-1/2 -translate-y-1/2 hidden xl:table-cell z-50">
                    <div
                      className={`relative w-48 h-32 rounded-xl overflow-hidden transition duration-300
                        ${isActive ? "opacity-100 scale-100 -rotate-5" : "opacity-0 scale-95"}`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="relative w-full h-full object-cover"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectionsTable;
