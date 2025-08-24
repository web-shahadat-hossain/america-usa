"use client";

import React, { useState } from 'react';
import { motion } from "motion/react"
import CollectionsTable from './CollectionsTable';

const Collections = () => {
    const [collections, setCollections] = useState("Fragnance")
    const [sort, setSort] = useState("Price high to low");

    return (
        <div className='max-w-7xl mx-auto'>
            <div className='flex justify-between items-center px-6 xl:px-0'>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-[102px] h-[32px] bg-white center rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center"
                >
                    <p className="text-[12px] font-medium text-[#465967]">
                        Collections
                    </p>
                </motion.div>

                <div className='max-w-1/2 md:max-w-1/3 xl:max-w-1/5'>
                    <p className="text-[12px] font-medium text-right text-[#000000]">
                        Discover the bags that people has been buying lately Our admin team evaluates your request & verifies the details
                    </p>
                </div>
            </div>

            <div className="flex justify-between items-end px-6 xl:px-0 pt-6">
                <select
                    className="border rounded-[10px] px-[20px] py-[10px] bg-transparent text-2xl font-bold"
                    value={collections}
                    onChange={(e) => setCollections(e.target.value)}
                >
                    <option>Fragnance</option>
                    <option>...</option>
                </select>

                <div className="flex items-center gap-2 border px-2">
                    <span className="text-sm font-medium">Sort by:</span>
                    <select
                        className="py-1 bg-transparent text-sm"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option>Price high to low</option>
                        <option>Price low to high</option>
                    </select>
                </div>
            </div>

            <div>
                <CollectionsTable></CollectionsTable>
            </div>
        </div>
    );
};

export default Collections;