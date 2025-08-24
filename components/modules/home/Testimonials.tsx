"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import QuoteIcon from "../../assets/icons/QuoteIcon";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Robiul Ahsan",
    image: "/user-01.jpg",
    text: "Thought it wouldn't ship to Bangladesh but they made it happen. Impressed with the service!",
  },
  {
    id: 2,
    name: "Rafiul Hasan",
    image: "/user-02.jpg",
    text: "Saved so much money compared to local stores. Genuine product, great packaging, and quick updates!",
  },
  {
    id: 3,
    name: "Emma Carter",
    image: "/user-03.jpg",
    text: "Got my product from the US in perfect condition. Super smooth process and excellent communication!",
  },
  {
    id: 4,
    name: "Farhan Rahman",
    image: "/user-04.jpg",
    text: "Finally a trusted service for US products in Bangladesh. Fast delivery and 100% authentic!",
  },
  {
    id: 5,
    name: "Suvrata Barua",
    image: "/user-05.jpg",
    text: "Was worried about customs but they handled everything. I got exactly what I ordered with no surprises.",
  },
];

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    const slidesInView = emblaApi.slidesInView();
    if (slidesInView.length === 0) return;

    // Dynamically calculate the middle card index
    const middleIndex = Math.floor(slidesInView.length / 2);

    // This gives you the actual slide index of the middle visible card
    const active = slidesInView[middleIndex];

    setActiveIndex(active);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Autoplay
  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <div className="px-4">
      <div className="relative border max-w-7xl mx-auto rounded-[50px] my-10">
        {/* Section Header */}
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
              Testimonials
            </p>
          </motion.div>
          <div className="max-w-4xl px-4 text-center sm:px-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl font-bold leading-tight text-transparent sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-[#838383] via-[#000000CC] to-[#838383] bg-clip-text py-10"
            >
              Satisfied customers are our best Ad
            </motion.h1>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex pt-10 pb-5">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_33.333%] lg:flex-[0_0_20%] px-3"
              >
                <motion.div
                  animate={{
                    scale: activeIndex === index ? 1.05 : 0.9,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`
                    relative rounded-2xl p-6 h-80 flex flex-col items-center text-center transition-all duration-300
                    ${
                      activeIndex === index
                        ? "bg-orange-500 text-[#FFFFFF] shadow-[-11px_7px_30px_0px_rgba(0,0,0,0.25),_0px_-1px_4px_0px_rgba(0,0,0,0.25)]"
                        : "bg-[#FFFFFF] text-[#969899] shadow-[0px_-0.85px_3.42px_0px_rgba(0,0,0,0.25),-9.39px_5.98px_25.62px_0px_rgba(0,0,0,0.25)]"
                    }
                  `}
                >
                  {/* Quotes */}
                  <div
                    className={`absolute top-36 left-4 text-4xl font-bold select-none`}
                  >
                    <QuoteIcon className={`w-6 h-6 text-[#EDF1F4]`}></QuoteIcon>
                  </div>
                  <div
                    className={`absolute bottom-4 right-4 text-4xl font-bold rotate-180 select-none text-[#EDF1F4]`}
                  >
                    <QuoteIcon className={`w-6 h-6 text-[#EDF1F4]`}></QuoteIcon>
                  </div>

                  {/* Profile image */}
                  <div className="mb-4 mt-2">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white/20"
                    />
                  </div>

                  {/* Name */}
                  <h3
                    className={`font-semibold text-lg mb-4 ${
                      activeIndex === index
                        ? "text-[#FFFFFF]"
                        : "text-[#969899]"
                    }`}
                  >
                    {testimonial.name}
                  </h3>

                  {/* Text */}
                  <p
                    className={`text-sm leading-relaxed flex-1 flex items-center ${
                      activeIndex === index ? "text-white/90" : "text-gray-600"
                    }`}
                  >
                    {testimonial.text}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
