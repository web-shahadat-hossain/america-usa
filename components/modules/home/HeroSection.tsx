"use client";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useAnimation,
  useSpring,
  Variants,
} from "framer-motion";
import { useInView } from "framer-motion";
import { HiCheckCircle, HiClock, HiOutlineXCircle } from "react-icons/hi2";
// ---------- Types ----------
type TabId = "shop" | "track" | "ship";

type TabContentType = {
  [K in TabId]: {
    title: string;
    placeholder: string;
    buttonText: string;
  };
};

const TabContent: TabContentType = {
  shop: {
    title: "Enter the Product Link to Send for Approval",
    placeholder: "Paste Product URL Here (e.g., nike.com/air-max-90)",
    buttonText: "Request",
  },
  track: {
    title: "Track Your Order Status",
    placeholder: "Enter your order/tracking number",
    buttonText: "Track Now",
  },
  ship: {
    title: "Calculate Shipping Cost",
    placeholder: "Enter product weight in kg",
    buttonText: "Calculate",
  },
};

// ---------- Mock helpers (purely static) ----------
function mockTrackOrder(orderNo: string) {
  if (!orderNo) return null;
  // Static demo payload
  const now = Date.now();
  return {
    id: orderNo.toUpperCase(),
    created_at: now - 1000 * 60 * 60 * 24 * 3,
    updated_at: now - 1000 * 60 * 30,
    is_canceled: false,
    is_paid: true,
    paid_time: now - 1000 * 60 * 60 * 48,
    is_shipped_in_usa: true,
    shipped_in_usa_time: now - 1000 * 60 * 60 * 36,
    is_on_board: true,
    on_board_time: now - 1000 * 60 * 60 * 24,
    is_landed_in_bd: false,
    landed_in_bd_time: null,
    is_ready_to_delivery: false,
    ready_to_delivery_time: null,
    is_refunded: false,
    refunded_time: null,
    is_delivered: false,
    delivered_time: null,
  };
}

function mockCreateRequest(url: string) {
  // If looks like a known site, return a static parsed product; else null
  const trusted = [
    "amazon.com",
    "ebay.com",
    "nike.com",
    "adidas.com",
    "walmart.com",
    "jomashop.com",
  ];
  const ok = trusted.some((s) => url.includes(s));
  if (!ok) return null;
  return {
    title: "Demo Product Title",
    price: 99.99,
    image: "https://via.placeholder.com/600x400?text=Product+Image",
    url,
  };
}

// ---------- Component ----------
export default function HeroSection() {
  // region hardcoded (previously useUserRegion)
  const countryCode = "US";

  const [activeTab, setActiveTab] = useState<TabId>(
    countryCode === "US" ? "ship" : "shop"
  );
  const [inputValue, setInputValue] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // tracking
  const [orderNumber, setOrderNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      setError("Please enter a tracking/order number");
      return;
    }
    setIsLoading(true);
    setError(null);
    setTrackingInfo(null);
    setTimeout(() => {
      const data = mockTrackOrder(orderNumber.trim());
      if (!data) {
        setError("Failed to fetch tracking information");
      } else {
        setTrackingInfo(data);
      }
      setIsLoading(false);
    }, 600); // tiny delay to show loader
  };

  // product form
  const [productDetails, setProductDetails] = useState({
    productLink: "",
    quantity: "1",
    details: "",
    withBox: false,
  });

  const handleProductFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product Details (static submit):", productDetails);
    setShowProductForm(false);
    setProductDetails({
      productLink: "",
      quantity: "1",
      details: "",
      withBox: false,
    });
  };

  // Submit button behavior (static)
  const handleSubmit = () => {
    if (!inputValue.trim()) {
      alert("Please enter a product URL.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const data = mockCreateRequest(inputValue.trim());
      if (data?.title && data?.price && data?.image) {
        // In static mode we just log & alert; no router push
        console.log("Auto-Order data:", data);
        alert("Auto-Order flow (static): Parsed product! Check console.");
      } else {
        console.log("Manual Request URL:", inputValue.trim());
        alert("Manual request flow (static): Untrusted site. Check console.");
      }
      setIsSubmitting(false);
    }, 700);
  };

  // reset input when tab changes
  useEffect(() => {
    setInputValue("");
    setShowProductForm(false);
  }, [activeTab]);

  // animations
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollY } = useScroll();
  const controls = useAnimation();

  const smoothY1 = useSpring(useTransform(scrollY, [0, 500], [0, 50]), {
    stiffness: 100,
    damping: 30,
  });
  const smoothY2 = useSpring(useTransform(scrollY, [0, 500], [0, -50]), {
    stiffness: 100,
    damping: 30,
  });
  const smoothOpacity1 = useSpring(useTransform(scrollY, [0, 300], [1, 0.7]), {
    stiffness: 100,
    damping: 30,
  });
  const smoothOpacity2 = useSpring(useTransform(scrollY, [0, 300], [1, 0.8]), {
    stiffness: 100,
    damping: 30,
  });

  const floatVariants: Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const floatVariants2: Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      },
    },
  };

  useEffect(() => {
    if (isInView) controls.start("animate");
  }, [isInView, controls]);

  const tabs =
    countryCode === "US"
      ? [
          { id: "ship" as TabId, label: "Ship" },
          { id: "track" as TabId, label: "Track your order" },
        ]
      : [
          { id: "shop" as TabId, label: "Shop" },
          { id: "track" as TabId, label: "Track your order" },
        ];

  useEffect(() => {
    if (!tabs.some((t) => t.id === activeTab)) {
      setActiveTab(tabs[0].id);
    }
  }, [activeTab, tabs]);

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
  const tabContainerVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
  };
  const tabItemVariants: Variants = {
    initial: { opacity: 0.7, y: 0 },
    animate: { opacity: 1, y: 0, transition: { type: "tween", duration: 0.2 } },
  };

  const guaranteeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const statusSteps = [
    {
      key: "AC",
      label: "Accepted",
      field: null as any,
      timeField: "created_at",
    },
    {
      key: "PD",
      label: "Payment Done",
      field: "is_paid",
      timeField: "paid_time",
    },
    {
      key: "SP",
      label: "Shipped in USA",
      field: "is_shipped_in_usa",
      timeField: "shipped_in_usa_time",
    },
    {
      key: "OB",
      label: "On Board for BD",
      field: "is_on_board",
      timeField: "on_board_time",
    },
    {
      key: "LB",
      label: "Landed in BD",
      field: "is_landed_in_bd",
      timeField: "landed_in_bd_time",
    },
    {
      key: "RD",
      label: "Ready to Delivery",
      field: "is_ready_to_delivery",
      timeField: "ready_to_delivery_time",
    },
    {
      key: "RF",
      label: "Refunded",
      field: "is_refunded",
      timeField: "refunded_time",
    },
    {
      key: "DD",
      label: "Delivery Done",
      field: "is_delivered",
      timeField: "delivered_time",
    },
  ];

  function getStepStates(info: any) {
    if (!info) return [];
    if (info.is_canceled) {
      return statusSteps.map((s, idx) =>
        idx === 0 ? { ...s, state: "canceled" } : { ...s, state: "upcoming" }
      );
    }
    let foundCurrent = false;
    return statusSteps.map((s) => {
      if (s.field === null)
        return { ...s, state: foundCurrent ? "upcoming" : "completed" };
      if (info[s.field])
        return { ...s, state: foundCurrent ? "upcoming" : "completed" };
      if (!foundCurrent) {
        foundCurrent = true;
        return { ...s, state: "current" };
      }
      return { ...s, state: "upcoming" };
    });
  }

  return (
    <section className="w-full pt-0 md:py-10 bg-[#F8F9FB] relative overflow-hidden">
      <div className="px-4 pt-0 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:pt-0">
        <motion.div
          ref={ref}
          className="relative flex flex-col items-center justify-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={guaranteeVariants}
            whileHover="hover"
            className="relative inline-flex items-center justify-center p-2 mx-auto mb-6 bg-white rounded-full shadow-xl cursor-pointer sm:mb-8 md:mb-10 group"
          >
            <div className="flex items-center px-4 py-1">
              <motion.span
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mr-2 text-[#FF4B26] text-xl"
              >
                ✨
              </motion.span>
              <p className="text-sm sm:text-base md:text-lg lg:text-[20px] leading-normal lg:leading-[28px] text-black text-center font-medium group-hover:text-[#FF4B26] transition-colors duration-300">
                100% Money-back guaranteed
              </p>
            </div>
            <motion.div
              className="absolute inset-0 rounded-full bg-[#FF4B26]/5 -z-10"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full max-w-[1161px] mt-4 sm:mt-6 lg:mt-8 px-4"
          >
            <h1 className="pb-2 text-2xl font-bold leading-tight text-center sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl radial_text_gradient sm:pb-4 sm:leading-normal">
              The choice of U.S. Imports to Bangladesh
            </h1>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full mt-8 sm:mt-12 lg:mt-16"
          >
            <div className="w-full max-w-[844px] mx-auto px-4">
              <motion.div
                className={`relative z-10 grid items-center justify-center w-full gap-2 px-2 mb-4 ${
                  (countryCode === "US" ? 2 : 2) === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
                } sm:flex sm:flex-row sm:gap-6 sm:px-0`}
                variants={tabContainerVariants}
                initial="initial"
                animate="animate"
              >
                {(countryCode === "US"
                  ? [
                      { id: "ship" as TabId, label: "Ship" },
                      { id: "track" as TabId, label: "Track your order" },
                    ]
                  : [
                      { id: "shop" as TabId, label: "Shop" },
                      { id: "track" as TabId, label: "Track your order" },
                    ]
                ).map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    variants={tabItemVariants}
                    className={`relative px-3 sm:px-6 py-2 sm:py-3 rounded-xl w-full flex flex-col items-center transition-all duration-200 ease-out ${
                      activeTab === tab.id
                        ? "bg-white shadow-md"
                        : "bg-transparent hover:bg-white/50"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
                      <span className="mb-1 text-lg sm:text-xl sm:mb-0">
                        {tab.id === "shop" && "🛍️"}
                        {tab.id === "track" && "📦"}
                        {tab.id === "ship" && "🚢"}
                      </span>
                      <span
                        className={`whitespace-normal sm:whitespace-nowrap text-xs sm:text-base font-medium ${
                          activeTab === tab.id
                            ? "text-[#FF4B26]"
                            : "text-gray-700"
                        }`}
                      >
                        {tab.label}
                      </span>
                    </div>
                    {activeTab === tab.id && (
                      <motion.div
                        className="absolute -bottom-2 sm:-bottom-4 left-1/2 w-1 h-1 bg-[#FF4B26] rounded-full"
                        layoutId="activeTabIndicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{ transform: "translateX(-50%)" }}
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>

              {/* Content box */}
              <motion.div
                className={`w-full bg-white rounded-2xl shadow-sm p-4 sm:p-8 ${
                  activeTab === "track" ? "max-w-[800px] mx-auto" : ""
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {showProductForm ? (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Product Details
                    </h2>
                    <form
                      onSubmit={handleProductFormSubmit}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Product link
                          </label>
                          <input
                            type="text"
                            value={productDetails.productLink}
                            onChange={(e) =>
                              setProductDetails((prev) => ({
                                ...prev,
                                productLink: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-3 mt-1 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF4B26]"
                            placeholder="Enter your product URL"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Quantity
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={productDetails.quantity}
                            onChange={(e) =>
                              setProductDetails((prev) => ({
                                ...prev,
                                quantity: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-3 mt-1 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF4B26]"
                            placeholder="How many?"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Product Details
                          </label>
                          <textarea
                            value={productDetails.details}
                            onChange={(e) =>
                              setProductDetails((prev) => ({
                                ...prev,
                                details: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-3 mt-1 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF4B26]"
                            rows={4}
                            placeholder="Product Details (color, size, etc.)"
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            Provide more info so we pick the correct item.
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium text-gray-700">
                              With Box?
                            </label>
                            <div
                              onClick={() =>
                                setProductDetails((prev) => ({
                                  ...prev,
                                  withBox: !prev.withBox,
                                }))
                              }
                              className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out cursor-pointer ${
                                productDetails.withBox
                                  ? "bg-[#FF4B26]"
                                  : "bg-gray-200"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                                  productDetails.withBox
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                }`}
                              />
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">
                            With box increases volumetric weight & shipping
                            cost.
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between space-x-4">
                        <button
                          type="button"
                          onClick={() => setShowProductForm(false)}
                          className="px-6 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 text-white bg-[#FF4B26] rounded-lg hover:bg-[#ff3c1a] transition-colors"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <>
                    {/* Track */}
                    {activeTab === "track" && (
                      <div className="space-y-4 sm:space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                          {TabContent.track.title}
                        </h2>
                        <form onSubmit={handleTrack} className="relative">
                          <input
                            type="text"
                            placeholder={TabContent.track.placeholder}
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value)}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF4B26] transition-colors text-sm sm:text-base"
                          />
                          <button
                            type="submit"
                            disabled={!orderNumber.trim() || isLoading}
                            className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 bg-[#FF4B26] text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:bg-[#ff3c1a] transition-colors text-sm sm:text-base"
                          >
                            {isLoading
                              ? "Checking..."
                              : TabContent.track.buttonText}
                          </button>
                        </form>
                        {!trackingInfo && !error && (
                          <p className="text-xs text-center text-gray-500 sm:text-sm">
                            Enter your tracking number to get status updates.
                          </p>
                        )}
                        {error && (
                          <div className="max-w-xl p-4 mx-auto mb-6 text-red-700 bg-red-100 rounded-lg">
                            {error}
                          </div>
                        )}
                        {trackingInfo && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl mx-auto"
                          >
                            <div className="p-8 bg-white shadow-xl rounded-3xl">
                              <div className="pb-8 mb-8 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h2 className="text-2xl font-semibold text-gray-900">
                                      Order #{trackingInfo.id}
                                    </h2>
                                    <p className="mt-1 text-gray-600">
                                      Created:{" "}
                                      {new Date(
                                        trackingInfo.created_at
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-0 px-1 py-4 overflow-x-auto sm:gap-2">
                                  {getStepStates(trackingInfo).map(
                                    (step: any, idx: number, arr: any[]) => (
                                      <div
                                        key={step.key}
                                        className="flex items-center"
                                      >
                                        <div
                                          className={`flex flex-col items-center min-w-[90px] sm:min-w-[120px] px-2 py-2 rounded-lg transition-all duration-200
                                        ${
                                          step.state === "completed"
                                            ? "bg-green-50 border-2 border-green-400 text-green-700"
                                            : step.state === "current"
                                            ? "bg-yellow-50 border-2 border-yellow-400 text-yellow-700 shadow-lg"
                                            : step.state === "canceled"
                                            ? "bg-red-50 border-2 border-red-400 text-red-700"
                                            : "bg-gray-50 border border-gray-200 text-gray-400"
                                        }`}
                                        >
                                          <div className="mb-1">
                                            {step.state === "completed" && (
                                              <HiCheckCircle className="text-green-500 w-7 h-7" />
                                            )}
                                            {step.state === "current" && (
                                              <HiClock className="text-yellow-500 w-7 h-7 animate-pulse" />
                                            )}
                                            {step.state === "canceled" && (
                                              <HiOutlineXCircle className="text-red-500 w-7 h-7" />
                                            )}
                                            {step.state === "upcoming" && (
                                              <span className="flex items-center justify-center inline-block font-bold text-gray-400 bg-gray-200 rounded-full w-7 h-7">
                                                {idx + 1}
                                              </span>
                                            )}
                                          </div>
                                          <div className="text-xs font-semibold text-center whitespace-nowrap">
                                            {step.label}
                                          </div>
                                          {trackingInfo[step.timeField] &&
                                            step.state === "completed" && (
                                              <div className="text-[10px] text-gray-500 mt-1">
                                                {new Date(
                                                  trackingInfo[step.timeField]
                                                ).toLocaleString()}
                                              </div>
                                            )}
                                        </div>
                                        {idx < arr.length - 1 && (
                                          <div className="flex-1 h-1 mx-1 sm:mx-2 bg-gray-200 rounded-full min-w-[16px] max-w-[32px]" />
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div className="text-sm text-gray-500">
                                  <p>Order ID: {trackingInfo.id}</p>
                                  <p>
                                    Created:{" "}
                                    {new Date(
                                      trackingInfo.created_at
                                    ).toLocaleString()}
                                  </p>
                                  <p>
                                    Last Updated:{" "}
                                    {new Date(
                                      trackingInfo.updated_at
                                    ).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* Shop */}
                    {activeTab === "shop" && (
                      <div className="space-y-4 sm:space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                          {TabContent.shop.title}
                        </h2>
                        {isSubmitting ? (
                          <div className="flex items-center justify-center mt-4">
                            <svg
                              className="animate-spin h-5 w-5 text-[#FF4B26]"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                              />
                            </svg>
                            <span className="ml-2 text-sm text-[#FF4B26]">
                              Fetching product details (static)...
                            </span>
                          </div>
                        ) : (
                          <div className="relative">
                            <input
                              type="text"
                              placeholder={TabContent.shop.placeholder}
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF4B26] transition-colors text-sm sm:text-base"
                            />
                            <button
                              onClick={handleSubmit}
                              className="absolute right-1.5 cursor-pointer sm:right-2 top-1/2 -translate-y-1/2 bg-[#FF4B26] text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:bg-[#ff3c1a] transition-colors text-sm sm:text-base"
                            >
                              {TabContent.shop.buttonText}
                            </button>
                          </div>
                        )}
                        <button
                          onClick={() => setShowProductForm(true)}
                          className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
                        >
                          Open Detailed Product Form
                        </button>
                      </div>
                    )}

                    {/* Ship */}
                    {activeTab === "ship" && (
                      <div className="space-y-4 sm:space-y-6">
                        <h2 className="text-xl font-semibold text-center text-gray-900 sm:text-2xl">
                          {countryCode === "US"
                            ? "Drop your product info for a quote"
                            : TabContent.ship.title}
                        </h2>
                        {countryCode === "US" && (
                          <p className="mb-2 text-sm text-center text-gray-500">
                            Enter your product details and we’ll get back with a
                            shipping quote. (Static demo)
                          </p>
                        )}
                        <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center">
                          <input
                            type="text"
                            placeholder={
                              countryCode === "US"
                                ? "Product info (name, link, weight, etc.)"
                                : TabContent.ship.placeholder
                            }
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full px-3 sm:px-4 py-3 sm:py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF4B26] transition-colors text-sm sm:text-base"
                          />
                          <button
                            onClick={() => alert("Static Calculate/Submit")}
                            className="mt-2 sm:mt-0 sm:ml-2 bg-[#FF4B26] text-white px-4 sm:px-6 py-2 sm:py-2 rounded-lg hover:bg-[#ff3c1a] transition-colors text-sm sm:text-base min-w-[100px]"
                          >
                            {countryCode === "US"
                              ? "Submit"
                              : TabContent.ship.buttonText}
                          </button>
                        </div>
                        {countryCode !== "US" && (
                          <p className="text-xs text-gray-500 sm:text-sm">
                            Minimum weight: 0.5 kg
                          </p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Decorative floating icons */}
          <div className="absolute inset-0 hidden overflow-hidden pointer-events-none md:block">
            <motion.div
              style={{ y: smoothY1, opacity: smoothOpacity1 }}
              variants={floatVariants}
              initial="initial"
              animate={controls}
              className="absolute top-[40px] md:left-[5%] lg:left-[10%] xl:left-[15%]"
            >
              <svg
                width="65"
                height="65"
                viewBox="0 0 65 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[45px] h-[45px] md:w-[55px] md:h-[55px] xl:w-[65px] xl:h-[65px]"
              >
                <rect
                  width="65"
                  height="65"
                  rx="16"
                  fill="#FF4B26"
                  fillOpacity="0.1"
                />
                <path
                  d="M20 22L24 23L26.5 35C26.7 36.2 27.8 37 29 37H39C40.1 37 41.1 36.3 41.4 35.2L43.9 26.5C44.3 25 43.1 23.5 41.5 23.5H26"
                  stroke="#FF4B26"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="29" cy="43" r="2" fill="#FF4B26" />
                <circle cx="39" cy="43" r="2" fill="#FF4B26" />
              </svg>
            </motion.div>

            <motion.div
              style={{ y: smoothY2, opacity: smoothOpacity2 }}
              variants={floatVariants2}
              initial="initial"
              animate={controls}
              className="absolute top-[240px] md:left-[2%] lg:left-[5%] xl:left-[7%]"
            >
              <svg
                width="65"
                height="65"
                viewBox="0 0 65 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[45px] h-[45px] md:w-[55px] md:h-[55px] xl:w-[65px] xl:h-[65px]"
              >
                <rect
                  width="65"
                  height="65"
                  rx="16"
                  fill="#FF4B26"
                  fillOpacity="0.1"
                />
                <circle
                  cx="32.5"
                  cy="32.5"
                  r="12"
                  stroke="#FF4B26"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="1 3"
                />
                <path
                  d="M32.5 20.5V44.5M20.5 32.5H44.5"
                  stroke="#FF4B26"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="32.5" cy="32.5" r="3" fill="#FF4B26" />
              </svg>
            </motion.div>

            <motion.div
              style={{ y: smoothY2, opacity: smoothOpacity1 }}
              variants={floatVariants2}
              initial="initial"
              animate={controls}
              className="absolute top-[40px] md:right-[5%] lg:right-[10%] xl:right-[15%]"
            >
              <svg
                width="65"
                height="65"
                viewBox="0 0 65 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[45px] h-[45px] md:w-[55px] md:h-[55px] xl:w-[65px] xl:h-[65px]"
              >
                <rect
                  width="65"
                  height="65"
                  rx="16"
                  fill="#FF4B26"
                  fillOpacity="0.1"
                />
                <path
                  d="M20 32.5L26 35L32.5 25L39 35L45 32.5"
                  stroke="#FF4B26"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M32.5 25V40"
                  stroke="#FF4B26"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="32.5" cy="25" r="2" fill="#FF4B26" />
              </svg>
            </motion.div>

            <motion.div
              style={{ y: smoothY1, opacity: smoothOpacity2 }}
              variants={floatVariants}
              initial="initial"
              animate={controls}
              className="absolute top-[240px] md:right-[2%] lg:right-[5%] xl:right-[7%]"
            >
              <svg
                width="65"
                height="65"
                viewBox="0 0 65 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[45px] h-[45px] md:w-[55px] md:h-[55px] xl:w-[65px] xl:h-[65px]"
              >
                <rect
                  width="65"
                  height="65"
                  rx="16"
                  fill="#FF4B26"
                  fillOpacity="0.1"
                />
                <rect
                  x="25"
                  y="22"
                  width="15"
                  height="21"
                  rx="2"
                  stroke="#FF4B26"
                  strokeWidth="2"
                />
                <path
                  d="M28 28H37M28 33H37M28 38H37"
                  stroke="#FF4B26"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
