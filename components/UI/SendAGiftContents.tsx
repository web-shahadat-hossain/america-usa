"use client";

import React from 'react';
import { motion } from "motion/react"

const SendAGiftContents = () => {
    return (
        <div className='flex flex-col justify-center items-center px-6 xl:px-0'>
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-[102px] h-[32px] bg-white center rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 my-10 flex items-center justify-center"
            >
                <p className="text-[12px] font-medium text-[#465967]">
                    Send a Gift
                </p>
            </motion.div>

            <div>
                <h2 className="text-2xl md:text-3xl lg:text-[55px] font-bold bg-linear-to-r from-[#838383] via-[#000000]/80 to-[#838383] bg-clip-text text-transparent mb-5 text-center">
                    Surprise Someone Back Home
                </h2>

                <p className='text-xs md:text-lg text-[#474747] max-w-2xl mx-auto font-semibold text-center'>Browse our curated collection and have your gift delivered quickly and safely to any city in Bangladesh.</p>
            </div>
        </div>
    );
};

export default SendAGiftContents;