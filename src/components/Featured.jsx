import React from "react";
import { Link } from "react-router-dom";

const Featured = () => {
  return (
    <>
      <div className="w-[80%] mx-auto mt-30">
        <h1 className="text-[32px] font-semibold">Featured</h1>
        <div className="flex gap-8 mt-10">
          <div className="bg-[url('/fea1.jpg')] bg-cover bg-center w-[50%] h-[300px] rounded-[20px] flex flex-col justify-end">
            <p className=" text-2xl text-white font-medium w-[80%] pl-[27px]">
              Bottega veneta Women Exclusive Series
            </p>
           <Link to={"/shop"}>
              <button className="hover:text-gray-900 hover:border-gray-900 w-[30%] py-[7px] rounded-[40px] text-white border-white border ml-[27px] mb-5 mt-3 cursor-pointer">
                Shop Now
              </button>
           </Link>
          </div>
          <div className="bg-[url('/fea2.jpg')] bg-cover bg-center w-[50%] h-[300px] rounded-[20px] flex flex-col justify-end">
            <p className=" text-2xl text-white font-medium w-[80%] pl-[27px]">
              John Lewis : Any Day Ceollections
            </p>
            <button className="hover:text-gray-900 hover:border-gray-900 w-[30%] py-[7px] rounded-[40px] text-white border-white border ml-[27px] mb-5 mt-3 cursor-pointer">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;
