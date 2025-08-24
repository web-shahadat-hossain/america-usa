"use client";

import React from "react";
import { motion } from "motion/react";
import PlayIcon from "../assets/icons/PlayIcon";
import BestSellerCards from "./BestSellerCards";

const BestSeller = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center px-6 pt-6 xl:px-0">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-[102px] h-[32px] bg-white center rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center"
        >
          <p className="text-[12px] font-medium text-[#465967]">Bestseller</p>
        </motion.div>

        <div className="w-[102px] h-[32px] bg-transparent hover:bg-[#FF740C] hover:text-[#FFFFFF] center rounded-full border duration-300 flex items-center justify-center gap-2 ease-in-out cursor-pointer">
          <p className="text-[12px] font-medium">View all</p>
          <PlayIcon></PlayIcon>
        </div>
      </div>

      <div>
        <BestSellerCards></BestSellerCards>
      </div>
    </div>
  );
};

export default BestSeller;
