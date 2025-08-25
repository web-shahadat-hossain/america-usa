"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import CollectionsTable from "./CollectionsTable";

const Collections = () => {
  const [collections, setCollections] = useState("Fragnance");
  const [sort, setSort] = useState("Price high to low");

  return (
    <div className="max-w-7xl mx-auto px-4 xl:px-0">
      {/* Top row */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-3 md:gap-0">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-[102px] h-[32px] bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center"
        >
          <p className="text-[12px] font-medium text-[#465967]">Collections</p>
        </motion.div>

        <div className="w-full md:w-1/2 xl:w-1/5">
          <p className="text-[12px] md:text-[12px] font-medium text-center md:text-right text-[#000000]">
            Discover the bags that people has been buying lately. Our admin team
            evaluates your request & verifies the details
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-3 pt-6">
        <select
          className="border rounded-[10px] px-4 py-2 bg-transparent text-xl sm:text-2xl font-bold w-full sm:w-auto"
          value={collections}
          onChange={(e) => setCollections(e.target.value)}
        >
          <option>Fragnance</option>
          <option>…</option>
        </select>

        <div className="flex items-center gap-2 border rounded-[10px] px-3 py-2 w-full sm:w-auto justify-between sm:justify-start">
          <span className="text-sm font-medium">Sort by:</span>
          <select
            className="py-1 bg-transparent text-sm outline-none"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option>Price high to low</option>
            <option>Price low to high</option>
          </select>
        </div>
      </div>

      <CollectionsTable />
    </div>
  );
};

export default Collections;
