"use client";

import Image from "next/image";
import React from "react";

interface GiftCardProps {
    category: string;
    title: string;
    price: number;
    image: string;
}

const gifts: GiftCardProps[] = [
    {
        category: "Bakery Special",
        title: "Red Velvet Cake",
        price: 35,
        image: "/gift-01.jpg",
    },
    {
        category: "Flower Gift",
        title: "Classic Rose Bouquet",
        price: 25,
        image: "/gift-02.jpg",
    },
    {
        category: "Fragrance",
        title: "Perfume Gift Set",
        price: 55,
        image: "/gift-03.jpg",
    },
    {
        category: "Sweet gift",
        title: "Chocolate Box",
        price: 40,
        image: "/gift-04.jpg",
    },
];

const GiftCard: React.FC<GiftCardProps> = ({
    category,
    title,
    price,
    image,
}) => {
    return (
        <div
            className="rounded-[18px] border border-[#00000040] p-6 bg-[#FFFFFF] flex flex-col justify-between hover:border-[#FF740C] shadow-[0.9px_3.58px_7.17px_0px_#00000040] hover:shadow-[0px_0px_22.4px_0px_#FC772C4D] duration-300 ease-in-out">
            {/* Category */}
            <p className="text-sm text-gray-500 mb-1">{category}</p>

            {/* Title */}
            <h3 className="text-lg font-semibold mb-3">{title}</h3>

            {/* Image */}
            <div className="relative w-full h-56 mb-4 rounded-lg overflow-hidden">
                <Image src={image} alt={title} fill className="object-cover" />
            </div>

            {/* Price + Button */}
            <div className="flex items-center justify-between">
                <p className="text-xl font-bold">${price}</p>
                <button
                    className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#FF740C] hover:border-[#FF740C] hover:text-[#FFFFFF] border border-[#000000] text-[#000000] duration-300 ease-in-out cursor-pointer"
                >
                    Send a gift
                </button>
            </div>
        </div>
    );
};

const BestSellerCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto py-10 px-6 xl:px-0">
            {gifts.map((gift, index) => (
                <GiftCard key={index} {...gift} />
            ))}
        </div>
    );
};

export default BestSellerCards;