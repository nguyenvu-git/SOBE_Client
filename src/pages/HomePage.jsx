import React from "react";
import { useState, useEffect } from "react";
import SignIn from "./SignIn";
import { Navigate, Link } from "react-router-dom";
import Featured from "../components/Featured";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
const HomePage = () => {
  const [category, setCategory] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [products, setProducts] = useState([]);
  // const user = JSON.parse(localStorage.getItem("user"));
  // if (!user) {
  //   return <Navigate to="/login" />;
  // }

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(
          "http://localhost:8088/ecomer/api/categories?action=list"
        );
        const datta = await res.json();
        setCategory(datta.data);

        if (datta.data.length > 0) {
          setActiveId(datta.data[0].id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:8088/ecomer/api/products?action=list"
        );
        const datta = await res.json();
        setProducts(datta.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeId
    ? products.filter((p) => p.category_id == activeId)
    : products;

  //cart view
  const { addToCart } = useCart();

  return (
    <>
      <div className="mx-auto w-[80%] mt-28">
        <div className="flex flex-col items-center py-20 rounded-[90%/100%] overflow-hidden relative z-8 bg-white">
          <div className="w-[80%] text-center">
            <p className="">Experience fashion like nevcer before</p>
            <h1 className="text-[48px] font-bold mt-2">
              Elevate Your Style With Fashion Store: Where Fashion Meets Passion
            </h1>
          </div>
          <div className="w-[60%]">
            <p className="text-[#00000094] text-center mt-7 text-[18px]">
              Discover a world of fashion-forward trends, curated collections,
              and timeless pieces that inspire. Unleash your inner fashionista
              and embark on a journey of confidence, elegance and impeccable
              style.
            </p>
          </div>

          <Link to={"/shop"}>
            <button className="font-medium text-white bg-[#718D6D] hover:bg-[#254C22] px-7 py-4 rounded-[50px] mt-8 cursor-pointer">
              Start Shopping
            </button>
          </Link>
        </div>

        <div className="flex mt-[-60px] gap-2 items-center justify-center">
          <img src="\bann1.jpg" alt="" className="w-[30%]" />
          <img src="\bann2.jpg" alt="" className="w-[30%]" />
          <img src="\bann3.jpg" alt="" className="w-[30%]" />
          <img src="\bann4.jpg" alt="" className="w-[30%]" />
        </div>
      </div>

      <div className="flex flex-col items-center w-[80%] mx-auto py-10 ">
        <h2 className="text-[32px] font-semibold mt-12">
          Explore Our Latest Collections For You
        </h2>
        <div className="w-full flex gap-6 mt-8">
          <div className="w-[70%] gap-7 flex flex-col">
            <div className="bg-[url('/ex1.jpg')] bg-cover bg-center w-full h-[300px] rounded-[20px]">
              <div className="flex flex-col justify-end h-full pl-6 pb-2 text-white">
                <p className="text-[32px] font-bold">Collection For Couples</p>
                <p className="text-[18px] font-medium mt-2">
                  Our Collection for Couple Features coordinated designs and
                  patterns, allowing couples to showcase their unity through
                  fashion.
                </p>
              </div>
            </div>
            <div className="flex w-full gap-8">
              <div className="bg-[url('/ex2.jpg')] bg-cover bg-center w-[50%] h-[280px] rounded-[20px]">
                <p className="text-white h-full flex flex-col justify-end font-bold text-[32px] w-[80%] pl-4 pb-2">
                  Leather Watch Collection
                </p>
              </div>
              <div className="bg-[url('/ex3.jpg')] bg-cover bg-center w-[50%] h-[280px] rounded-[20px]">
                <p className="text-white h-full flex flex-col justify-end font-bold text-[32px] w-[80%] pl-4 pb-2">
                  New tote Bags Collection
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[url('/ex-4.jpg')] bg-cover bg-center w-[30%] rounded-[20px]">
            <div className="text-white h-full flex flex-col justify-end  w-[80%] pl-4 pb-2">
              <p className="text-[32px] font-bold">Sheer Bomber Jacket</p>
              <p className="text-[18px] mt-3">
                Introducing our stylish and versatile sheer clergy caped bomber
                jacket
              </p>
              <button className="py-[12px] w-[70%] mt-6 border rounded-[54px] mb-5">
                Shop now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-[80%] mx-auto py-10 mb-30">
        <h2 className="text-[32px] font-semibold mt-12">
          Latest Arrivals By Categories
        </h2>

        <div className="">
          <div className="flex gap-10 mt-12">
            {category.map((cat) => (
              <div key={cat.id}>
                <p
                  onClick={() => setActiveId(cat.id)}
                  className={`cursor-pointer font-bold px-4 py-2 rounded-[50px] 
          ${activeId === cat.id ? "bg-[#EDE0CC] text-black" : "text-gray-800"}
        `}
                >
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 w-full">
          <div className="flex gap-10 flex-wrap justify-center">
            {filteredProducts.map((item) => (
              <div className="w-[26%] border rounded-[20px]" key={item.id}>
                <Link to={`/product/${item.id}`}>
                  <img
                    src={"http://localhost:8088/ecomer/" + item.image}
                    alt=""
                    className="w-full h-[325px] rounded-t-[20px] object-cover"
                  />
                </Link>
                <div className="pt-6 px-6 pb-[21px] bg-[#EDE0CC] rounded-b-[20px] flex items-center justify-between">
                  <div className="">
                    <p className="text-5 font-bold">{item.name}</p>
                    <p className="mt-1">{item.price}</p>
                  </div>
                  <div className="">
                    <img
                      onClick={() => addToCart(item)}
                      src="\shopping.svg"
                      alt=""
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Featured></Featured>
        <div className="bg-[#254C22] flex rounded-[20px] w-[80%] mx-auto mt-28">
          <div className="w-[70%] text-white mt-10 ml-10">
            <h1 className="text-[32px] font-semibold">
              Save 50% this Holiday season
            </h1>
            <p className="mt-6">
              It’s time to revamp your fashion game without breaking the bank!
              Dive into our exclusive 50% off sale and discover unbearable deals
              on the most coveted styles.
            </p>
            <Link to={"/shop"}>
              <button className="w-[30%] py-[7px] rounded-[40px] text-white border-white border mb-5 mt-6 cursor-pointer hover:text-gray-900 hover:border-gray-900">
                Shop Now
              </button>
            </Link>
          </div>
          <div className="w-[30%]">
            <img src="\hvo.jpg" alt="" className="" />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
