"use client";

import BestSeller from "@/components/UI/BestSeller";
import Collections from "@/components/UI/Collections";
import SendAGiftContents from "@/components/UI/SendAGiftContents";
import React from "react";

const SendAGift = () => {
  return (
    <section className="bg-[#EDF1F4]">
      <div>
        <div>
          <SendAGiftContents />
        </div>

        <div>
          <div id="best-seller">
            <BestSeller />
          </div>

          <div id="collections">
            <Collections />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SendAGift;
