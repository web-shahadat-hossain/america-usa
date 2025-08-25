/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";
import { motion } from "framer-motion";
import icons1 from "../../assets/icons/ShipItYourWay1.png";
import icons2 from "../../assets/icons/ShipItYourWay2.png";
import icons3 from "../../assets/icons/ShipItYourWay3.png";
import icons4 from "../../assets/icons/ShipItYourWay4.png";
const ShipItYourWay = () => {
  const items = [
    {
      no: "01",
      title: "Personal Items Forwarding",
      icon: icons3,
      desc: "Easily send items you've bought for yourself or used belongings from anywhere in USA or Canada. We handle packaging, shipping, and delivery to Bangladesh with full care and tracking.",
    },
    {
      no: "02",
      title: "Purchase & Forward",
      icon: icons2,
      desc: "Shop online or in‑store, send your purchases to our warehouse, and we’ll forward them to Bangladesh quickly, safely, and without any stress.",
    },
    {
      no: "03",
      title: "We Buy It For You",

      icon: icons1,
      desc: "Easily send items you’ve bought for yourself or used belongings from anywhere in USA or Canada. We handle packaging, shipping, and delivery to Bangladesh with full care and tracking.",
    },
    {
      no: "04",
      title: "Walk‑in Handover",
      icon: icons4,
      desc: "Bring your parcels to our office personally, and we’ll manage all the forwarding steps to Bangladesh, ensuring safe and timely delivery.",
    },
  ];
  return (
    <section className="relative w-full pb-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center w-full pt-10"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-[166px] h-[52px] bg-[#FFFFFF] center rounded-full transition-all duration-300 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),0px_10px_15px_-3px_rgba(0,0,0,0.1)] flex items-center justify-center"
          >
            <p className="text-base font-medium sm:text-lg md:text-xl text-[#6B7280]">
              What we offer
            </p>
          </motion.div>
          <div className="max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl font-bold leading-tight text-transparent sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-[#838383] via-[#000000CC] to-[#838383] bg-clip-text py-4"
            >
              Ship It Your Way
            </motion.h1>
          </div>
        </motion.div>
        <p className="mx-auto  max-w-xl text-center text-sm text-[var(--color-stone)] md:text-base">
          Choose the option that works best for you
        </p>
      </div>

      <div className="mx-auto mt-8 grid w-full max-w-6xl  grid-cols-1 gap-5 px-4 sm:px-6 md:grid-cols-2 lg:gap-6 lg:px-8">
        {items.map(({ no, title, icon, desc }) => (
          <motion.article
            key={no}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative overflow-hidden h-[150px] rounded-2xl bg-gradient-to-br from-[var(--color-blazeOrange)] to-[var(--color-scarletOrange)] p-5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] md:p-6"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -left-3 -top-4 select-none text-8xl font-extrabold leading-none opacity-10 md:-left-2 md:-top-6 md:text-9xl"
            >
              {no}
            </span>

            <img
              src={icon.src}
              className="pointer-events-none absolute -right-6 -bottom-[50%] h-[80px] w-[80px]  md:-right-4 md:bottom-[20%] "
            />

            <div className="relative z-10 w-[90%]">
              <h3 className="text-lg font-bold md:text-xl">{title}</h3>
              <p className="mt-2 text-sm/6 text-white/90 leading-4 md:text-[12px]">
                {desc}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ShipItYourWay;
