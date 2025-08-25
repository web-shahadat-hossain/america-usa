/* eslint-disable prefer-const */
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import Button from "@/components/UI/Button";
/* ------------------ Small reusable rotator for a single card ------------------ */
type CardItem = { title: string; subtitle?: string; img: string };

function CardRotator({
  items,
  tall = false,
  intervalMs = 4000,
  offset = 0,
  className = "",
  targetId, // click করলে যে সেকশনে যাবে তার id
}: {
  items: CardItem[];
  tall?: boolean;
  intervalMs?: number;
  offset?: number;
  className?: string;
  targetId?: string;
}) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!items.length) return;

    const tick = () => setIndex((prev) => (prev + 1) % items.length);

    // start after offset, then loop
    timeoutRef.current = window.setTimeout(() => {
      tick();
      intervalRef.current = window.setInterval(tick, intervalMs);
    }, Math.max(0, offset));

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [items.length, intervalMs, offset]);

  const baseClass = `relative ${
    tall ? "h-[320px]" : "h-[206px]"
  } w-[228px] rounded-[24px] 
     bg-white border-[1.5px] border-[rgba(255,92,16,0.75)] opacity-60 p-4`;

  // Smooth scroll helper
  const handleClick = () => {
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (!el) return;
    const headerH =
      (document.querySelector("header") as HTMLElement)?.offsetHeight || 0;
    const y = el.getBoundingClientRect().top + window.scrollY - headerH - 8;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div
      className={`${baseClass} ${className} cursor-pointer active:scale-[0.98] transition`}
      onClick={handleClick}
      role={targetId ? "button" : undefined}
      tabIndex={targetId ? 0 : -1}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick()}
      aria-label={targetId ? "Jump to section" : undefined}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 ${
            tall ? "items-start text-center" : "items-center justify-center"
          } flex flex-col p-4`}
        >
          <p className="text-[12px] font-normal text-[#00000080] mb-1">
            {items[index].subtitle || "Send love from abroad"}
          </p>
          <h3 className="text-[18px] font-bold text-[#000000cc] mb-3 text-center">
            {items[index].title}
          </h3>
          <img
            src={items[index].img}
            alt={items[index].title}
            className="w-[80px] h-auto object-contain mx-auto"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------ Main Hero Section ------------------------------ */
export default function HeroSection() {
  const [selectedTab, setSelectedTab] = useState<"ship" | "track">("ship");

  // animations
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  const handleTabChange = (tab: "ship" | "track") => setSelectedTab(tab);

  const perfumeItems: CardItem[] = [
    { title: "Perfume gift set", img: "/images/perfume.png" },
    { title: "Limited Edition Scent", img: "/images/perfume.png" },
    { title: "Holiday Duo Pack", img: "/images/perfume.png" },
  ];
  const shoeItems: CardItem[] = [
    { title: "Sneakers for Him", img: "/images/perfume.png" },
    { title: "Sport Runner", img: "/images/perfume.png" },
    { title: "Street Style", img: "/images/perfume.png" },
  ];
  const watchItems: CardItem[] = [
    { title: "Classic Watch", img: "/images/perfume.png" },
    { title: "Chrono Steel", img: "/images/perfume.png" },
    { title: "Minimal Dial", img: "/images/perfume.png" },
  ];
  const dressItems: CardItem[] = [
    { title: "Evening Dress", img: "/images/perfume.png" },
    { title: "Floral Outfit", img: "/images/perfume.png" },
    { title: "Summer Vibes", img: "/images/perfume.png" },
  ];

  return (
    <section className="w-full pt-10 md:py-10 bg-[#EDF1F4] overflow-hidden ">
      <div className="mx-auto max-w-7xl relative ">
        {/* TOP / HERO (always above) */}
        <div className="relative mx-auto max-w-7xl pb-8 md:pb-34 z-20">
          <div className="px-4 pt-0 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:pt-0">
            <motion.div
              ref={ref}
              className="relative flex flex-col items-center justify-center w-full"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Badge */}
              <div className="inline-flex items-center bg-white gap-1 md:gap-2 rounded-[20px] px-2 md:px-3 py-1 md:py-2 mb-4 md:mb-6 shadow-[0px_1px_3px_#00000019,0px_2px_6px_#00000019]">
                <img
                  src="/images/img_image.png"
                  alt="Fast"
                  className="w-5 h-5 md:w-7 md:h-7 rounded-[14px]"
                />
                <span className="text-[10px] md:text-[11px] font-normal leading-[13px] md:leading-[15px] text-global-1">
                  Fast, Safe, and 100% Trackable
                </span>
                <img
                  src="/images/img_image_28x28.png"
                  alt="Safe"
                  className="w-5 h-5 md:w-7 md:h-7 rounded-[14px]"
                />
              </div>

              {/* Heading */}

              <motion.div
                variants={itemVariants}
                className="w-full max-w-[1161px] mt-4 sm:mt-6 lg:mt-8 px-4"
              >
                <h1 className="pb-2 text-2xl font-bold leading-tight text-center sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl radial_text_gradient sm:pb-4 sm:leading-normal">
                  Ship from Cart to Bangladesh
                  <br />
                  <span>Hassle-Free</span>
                </h1>
              </motion.div>

              {/* Shipping Form */}
              <div className="w-full flex flex-row justify-center items-center mx-auto my-6 md:my-10">
                <div
                  className="w-full min-h-[110px] md:min-h-[120px] lg:w-[90%] xl:w-[64%] lg:min-h-[240px] px-4 md:px-6 lg:px-10 flex flex-row justify-center items-center self-end relative bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/img_union.svg')" }}
                >
                  <div className="flex flex-row justify-start items-center w-full mr-[5px] sm:mr-[7px] md:mr-[10px] lg:mr-[14px] ml-[5px] sm:ml-[7px] md:ml-[10px] lg:ml-[14px]">
                    <div className="flex flex-col justify-start items-center w-full ml-[5px] sm:ml-[10px] md:ml-[15px] lg:ml-[20px]">
                      {/* Tab Navigation */}
                      <div className="flex flex-row justify-between items-center w-[80%] sm:w-[70%] md:w-[60%] mt-[-5px] md:mt-[-15px]">
                        <button
                          onClick={() => handleTabChange("ship")}
                          className={`text-[10px] md:text-[16px] text-[#FF5C00] font-semibold cursor-pointer ${
                            selectedTab === "ship"
                              ? "text-global-9"
                              : "text-global-3"
                          }`}
                        >
                          Ship
                        </button>
                        <button
                          onClick={() => handleTabChange("track")}
                          className={`text-[10px] md:text-[16px] font-semibold cursor-pointer ${
                            selectedTab === "track"
                              ? "text-global-9"
                              : "text-global-3"
                          }`}
                        >
                          Track my order
                        </button>
                      </div>

                      {/* Form Title */}
                      <p className="text-[8px] md:text-[16px] font-medium mb-1 md:mb-2 mt-2 md:mt-8 text-left text-global-1 self-start">
                        Enter the Product description for Approval
                      </p>

                      {/* Search Form */}
                      <div className="flex flex-row justify-start items-center w-full mt-[10px] md:mt-[15px]">
                        <div className="flex h-[30px] lg:h-full flex-row w-full border border-[#969696] rounded-[20px] md:rounded-[24px] overflow-hidden">
                          {/* Input */}
                          <div className="flex flex-row items-center flex-1 px-[10px] md:px-[13px] lg:px-[18px]">
                            <Image
                              src="/images/link-icon.svg"
                              width={16}
                              height={18}
                              alt="search icon"
                              className="w-[10px] h-[11px] md:w-[12px] md:h-[13px] lg:w-[16px] lg:h-[18px]"
                            />
                            <div className="w-[1px] h-[12px] md:h-[15px] bg-[#a0a0a0] mx-2 md:mx-3" />
                            <input
                              type="text"
                              placeholder="I want to send a laptop from New York to Dhaka..."
                              className="text-[10px] md:text-[11px] lg:text-[15px] font-normal leading-[13px] md:leading-[15px] lg:leading-[20px] text-global-3 w-full bg-transparent outline-none"
                            />
                          </div>
                          {/* Button */}
                          <Button
                            className=" 
     lg:h-full min-w-[96px]

    grid place-items-center              /* ✅ perfect center */
    text-[12px] md:text-[13px] lg:text-[18px] font-medium leading-none
    bg-[#FF5C00] px-3 md:px-[22px] lg:px-[30px] py-0
    border-l border-[#5C5858]
    !rounded-none md:!rounded-tr-[24px] !rounded-br-[20px] md:!rounded-br-[24px]
    text-white
  "
                            variant="primary"
                          >
                            <span className="leading-none block lg:pt-1  h-[25px] lg:h-full">
                              Search
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <p className="text-center z-20 text-[11px] md:text-[12px] lg:text-lg flex flex-col sm:flex-row justify-center items-center gap-1 md:gap-2 lg:gap-4 cursor-pointer">
              Need to send used items or drop off personally?{" "}
              <span className="inline-flex items-center">
                <span className="text-[#FF740C] underline">
                  See all options
                </span>
                <img src="/images/arrow.svg" className="ml-1" />
              </span>
            </p>
          </div>
        </div>

        {/* ---------------- Fixed Bottom Cards (no slide; only content changes) ---------------- */}
        <div className="absolute inset-x-0 bottom-[-149px] z-10 opacity-70 hidden lg:block">
          <div className="px-4 sm:px-6 lg:px-8 flex items-end justify-center gap-4">
            {/* Column 1 (short+short) */}
            <div className="flex flex-col gap-y-4">
              <CardRotator
                items={perfumeItems}
                tall={false}
                intervalMs={4200}
                offset={0}
                targetId="best-seller"
              />
              <CardRotator
                items={shoeItems}
                tall={false}
                intervalMs={4600}
                offset={600}
                targetId="collections"
              />
            </div>

            {/* Column 2 (tall) */}
            <CardRotator
              items={watchItems}
              tall
              intervalMs={4800}
              offset={1000}
              targetId="best-seller"
            />

            {/* Column 3 (short) */}
            <CardRotator
              items={perfumeItems}
              tall={false}
              intervalMs={5000}
              offset={1400}
              targetId="collections"
            />

            {/* Column 4 (tall) */}
            <CardRotator
              items={dressItems}
              tall
              intervalMs={5200}
              offset={1800}
              targetId="best-seller"
            />

            {/* Column 5 (short+short) */}
            <div className="flex flex-col gap-y-4">
              <CardRotator
                items={shoeItems}
                tall={false}
                intervalMs={5400}
                offset={2200}
                targetId="collections"
              />
              <CardRotator
                items={perfumeItems}
                tall={false}
                intervalMs={5600}
                offset={2600}
                targetId="best-seller"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
