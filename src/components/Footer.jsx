import React from "react";

const Footer = () => {
  return (
    <>
      <div className="w-full bg-[#718D6D] text-white">
        <div className="w-[80%] mx-auto pt-[48px]">
          <div className="flex justify-between">
            <div className="w-[25%]">
              <img src="\logo.svg" alt="" />
              <p className="mt-4">
                Design amazing digital experiences that create more happy in the
                world.
              </p>
            </div>
            <div className="flex gap-20">
              <div className="gap-2 flex flex-col">
                <h1 className="mb-3">Shop</h1>
                <p className="font-medium">Men’s Product</p>
                <p className="font-medium">Women’s Product</p>
              </div>
              <div className="">
                <h1 className="mb-3">Company</h1>
                <p className=""></p>
                <p className=""></p>
              </div>
              <div className="">
                <h1 className="mb-3">Support</h1>
                <p className="font-medium">F&Q</p>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-white mt-8"></div>

          <div className="flex justify-between mt-7">
            <p className="text-gray-600">@ 2025 SOBE. All rights reserved.</p>
            <div className="flex gap-5 pb-12">
              <img src="\fb.svg" alt="" className="" />
              <img src="\tw.svg" alt="" className="" />
              <img src="\ig.svg" alt="" className="" />
              <img src="\pin.svg" alt="" className="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
