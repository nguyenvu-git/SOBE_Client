import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const Comments = [
    {
      id: 1,
      img: "/img/avtpr3.jpg",
      name: "Kristin Watson",
      comment: "Duis at ullamcorper nulla, eu dictum eros.",
    },
    {
      id: 2,
      img: "/img/avtpr3.jpg",
      name: "Jane Cooper",
      comment:
        "Keep the soil evenly moist for the healthiest growth. If the sun gets too hot, Chinese cabbage tends to  or go to seed; in long periods of heat, some kind of shade may be helpful. Watch out for snails, as they will harm the plants.",
    },
    {
      id: 3,
      img: "/img/avtpr3.jpg",
      name: "Jacob Jones",
      comment:
        " Vivamus eget euismod magna. Nam sed lacinia nibh, et lacinia lacus.",
    },
  ];

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [changreTab, setChangreTap] = useState(false);
  const { addToCart } = useCart();
  const handleChargeTab = () => {
    setChangreTap(true);
  };
  const handleBackTab = () => {
    setChangreTap(false);
  };
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(
          `http://localhost:8088/ecomer/api/products?action=detail&id=${id}`
        );
        const data = await res.json();
        setProduct(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetail();
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:8088/ecomer/api/products?action=list"
        );
        const data = await res.json();
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  if (!product) return <p className="mt-40 text-center">Loading...</p>;

  return (
    <>
      <div className="w-[80%] mx-auto mt-40 mb-40">
        <div className="flex gap-10">
          <img
            src={product.image}
            className="w-[400px] h-[400px] object-cover rounded"
          />
          <div className="w-full">
            <h1 className="text-4xl font-semibold">{product.name}</h1>
            <p className="text-[#333] font-medium text-[14px] mt-4">
              SKU:
              <span className="text-[#666] font-normal">2,51,594</span>
            </p>
            <p className="text-[24px] text-[#2C742F] font-medium flex gap-2">
              {product.price} $
            </p>
            <div className="h-[1px] w-full bg-[#E5E5E5] mt-5"></div>
            <div className="flex justify-between items-center mt-6">
              <div className="flex gap-2 items-center">
                <p className="text-[14px]">Brand:</p>
                <img
                  className="w-[46px] h-[46px] p-2 rounded-xl bg-[#2C742F]"
                  src="\logo.svg"
                  alt=""
                />
              </div>
            </div>
            <p className="mt-4 text-gray-600">{product.description}</p>
            <button
              onClick={() => addToCart(product)}
              className="tex-center w-full bg-[#718D6D] hover:bg-[#254C22] py-3 cursor-pointer font-semibold rounded-4xl text-white mt-10"
            >
              Add To Card
            </button>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex gap-4 justify-center cursor-pointer">
            <p
              onClick={() => handleBackTab()}
              className={`p-4 font-medium ${
                changreTab ? "text-[#808080]" : "text-black"
              }`}
            >
              Additional Information
            </p>
            <p
              onClick={() => handleChargeTab()}
              className={`p-4 font-medium ${
                !changreTab ? "text-[#808080]" : "text-black"
              }`}
            >
              Customer Feedback
            </p>
          </div>
          {!changreTab && (
            <div className="flex mt-[32px] justify-between">
              <div className="flex gap-12">
                <div className="">
                  <p className="mb-3 text-[14px]">Weight:</p>
                  <p className="mb-3 text-[14px]">Color:</p>
                  <p className="mb-3 text-[14px]">Type:</p>
                  <p className="mb-3 text-[14px]">Category:</p>
                  <p className="mb-3 text-[14px]">Stock Status:</p>
                </div>
                <div className="">
                  <p className="mb-3 text-[14px] text-[#666]">03</p>
                  <p className="mb-3 text-[14px] text-[#666]">Green</p>
                  <p className="mb-3 text-[14px] text-[#666]">Organic</p>
                  <p className="mb-3 text-[14px] text-[#666]">Vegetables</p>
                  <p className="mb-3 text-[14px] text-[#666]">
                    Available (5,413)
                  </p>
                </div>
              </div>
              <div className="">
                <img src="\img\imgprd.jpg" alt="" />
              </div>
            </div>
          )}
          {changreTab && (
            <div className="mt-[22px]">
              {Comments.slice(0, 3).map((comment, index) => (
                <div className="" key={comment.id}>
                  <div className="flex mt-5">
                    <img className="mr-3" src={"/avtpr3.jpg"} alt="" />
                    <div className="">
                      <p className="text-[14px] font-medium">{comment.name}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[14px] text-[#808080]">
                    {comment.comment}
                  </p>
                  <p className="w-full h-[1px] bg-[#E5E5E5] mt-5"></p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12">
          <p className="flex justify-center text-[32px] font-semibold">
            Related Products
          </p>
          <div className="flex flex-wrap gap-4 w-full mt-8">
            {products.slice(0, 4).map((item) => (
              <div className="w-[24%] border rounded-[20px]" key={item.id}>
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
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
      </div>
      <Footer></Footer>
    </>
  );
};

export default ProductDetail;
