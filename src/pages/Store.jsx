import React from "react";
import Footer from "../components/Footer";
const Store = () => {
  return (
    <>
      <div className="mt-40 w-[80%] mx-auto flex flex-col items-center mb-20">
        <h1 className="text-[32px] font-semibold">Stores</h1>
        <p className="mt-4">Find one of our 11 stores nearest you.</p>

        <div className="flex flex-wrap gap-8 justify-center mt-12">
          <div className="w-[30%]">
            <img src="\st1.jpg" alt="" className="" />
            <p className="text-[10px] mt-2">SEATTLE</p>
            <p className="">University Village</p>
          </div>
          <div className="w-[30%]">
            <img src="\st2.jpg" alt="" className="" />
            <p className="text-[10px] mt-2">SAN FRANCISCO</p>
            <p className="">Valencia Street, San Francisco</p>
          </div>
          <div className="w-[30%]">
            <img src="\st3.jpg" alt="" className="" />
            <p className="text-[10px] mt-2">SEATTLE</p>
            <p className="">University Village</p>
          </div>
          <div className="w-[30%]">
            <img src="\st4.jpg" alt="" className="" />
            <p className="text-[10px] mt-2">SEATTLE</p>
            <p className="">University Village</p>
          </div>
          <div className="w-[30%]">
            <img src="\st5.jpg" alt="" className="" />
            <p className="text-[10px] mt-2">SEATTLE</p>
            <p className="">University Village</p>
          </div>
          <div className="w-[30%]">
            <img src="\st6.jpg" alt="" className="" />
            <p className="text-[10px] mt-2">SEATTLE</p>
            <p className="">University Village</p>
          </div>
          <div className="w-[30%]">
            <img src="\st7.jpg" alt="" className="" />
            <p className="text-[10px] mt-2">SEATTLE</p>
            <p className="">University Village</p>
          </div>
          <div className="w-[30%]">
            <img src="\st8.jpg" alt="" className="" />
            <p className="text-[10px] mt-2">SEATTLE</p>
            <p className="">University Village</p>
          </div>
          <div className="w-[30%]">
            <img src="\st9.jpg" alt="" className="" />
            <p className="text-[10px] mt-2">SEATTLE</p>
            <p className="">University Village</p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Store;
