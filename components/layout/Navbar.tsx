"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", link: "/" },
  { name: "Send a gift", link: "/s" },
  { name: "Track", link: "/Track" },
  { name: "Calculator", link: "/price-calculator" },
  { name: "About us", link: "/about-us" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    if (link.includes("#")) {
      e.preventDefault();
      const targetId = link.split("#")[1];
      const element = document.getElementById(targetId);

      if (element) {
        setIsMenuOpen(false);
        setTimeout(() => {
          const headerHeight =
            document.querySelector("header")?.offsetHeight || 0;
          const isMobile = window.innerWidth < 768;
          const mobileOffset = isMobile ? 20 : 0;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerHeight - mobileOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 300);
      }
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300  ${
        scrolled
          ? "shadow-lg bg-white/80 backdrop-blur-md"
          : "bg-[#EDF1F4] backdrop-blur-sm border-b border-b-[#000000]"
      }`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <div className="w-[180px] xs:w-[200px] sm:w-[220px] lg:w-[250px] h-[65px] xs:h-[70px] sm:h-[80px] lg:h-[80px] relative">
                <Image
                  src="/logo-img/logo-main.png"
                  alt="logo"
                  fill
                  className="object-contain"
                  priority={true}
                />
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 lg:space-x-10">
              {links
                .filter((link) => link.name !== "Products")
                .map((link) => {
                  const isActive = pathname === link.link;
                  return (
                    <motion.li
                      key={link.name}
                      className="relative group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={link.link}
                        onClick={(e) => handleNavClick(e, link.link)}
                        className={`relative text-base lg:text-[20px] font-normal transition-colors duration-200 ${
                          isActive
                            ? "font-semibold text-blazeOrange"
                            : "text-black hover:text-blazeOrange"
                        }`}
                      >
                        {link.name}
                        {/* Active underline */}
                        <span
                          className={`absolute -bottom-1 left-0 h-[3px] rounded-full bg-blazeOrange transition-all duration-300 ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      </Link>
                    </motion.li>
                  );
                })}
            </ul>
          </nav>

          {/* Right Side: Cart and Hamburger */}
          <div className="flex items-center gap-4">
            {/* Hamburger Menu Button */}
            <motion.div
              className="md:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 transition-colors duration-200 rounded-md hover:text-blazeOrange focus:outline-none"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </motion.div>
            {/* Desktop Button/Profile Icon */}
            <motion.div
              className="hidden md:block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/auth/signin">
                <button className="h-[48px] lg:h-[56px] w-[160px] lg:w-[200px] rounded-[20px] px-4 lg:px-6 py-2 lg:py-3 bg-blazeOrange text-white text-base lg:text-[22px] font-medium cursor-pointer hover:opacity-90 transition-all duration-300 transform hover:shadow-lg">
                  Login / Signup
                </button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute left-0 z-40 w-full px-4 py-4 space-y-3 bg-white shadow-md md:hidden top-full">
            {links
              .filter((link) => link.name !== "Products")
              .map((link) => {
                const isActive = pathname === link.link;
                return (
                  <Link
                    key={link.name}
                    href={link.link}
                    onClick={(e) => handleNavClick(e, link.link)}
                    className={`block text-base font-medium transition ${
                      isActive
                        ? "font-semibold text-blazeOrange"
                        : "text-gray-800 hover:text-blazeOrange"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

            <>
              <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full py-2 mt-4 text-white transition rounded-full bg-blazeOrange hover:opacity-90">
                  Login / Signup
                </button>
              </Link>
            </>
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Navbar;
