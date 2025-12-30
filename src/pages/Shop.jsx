import React from "react";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const [product, setProduct] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const { addToCart } = useCart();
  const [categories, setCategories] = useState([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("keyword") || "";

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(
        "http://localhost:8088/ecomer/api/categories?action=list"
      );

      const data = await res.json();
      setCategories(data.data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "http://localhost:8088/ecomer/api/products?action=list";

        if (categoryId) {
          url += `&category_id=${categoryId}`;
        }

        if (keyword) {
          url = `http://localhost:8088/ecomer/api/products?action=search&keyword=${keyword}`;
        }
        const res = await fetch(url);
        let data = await res.json();
        let products = data.data;

        if (priceSort === "asc") {
          products = [...products].sort((a, b) => a.price - b.price);
        } else if (priceSort === "desc") {
          products = [...products].sort((a, b) => b.price - a.price);
        }

        setProduct(products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [categoryId, priceSort, keyword]);

  return (
    <>
      <div className="mt-40 w-[80%] mx-auto mb-9">
        <Banner></Banner>
        <div className="flex gap-4 mt-4">
          <select
            className="border rounded-2xl p-2 px-4 font-medium cursor-pointer"
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((cate) => (
              <option value={cate.id} key={cate.id}>
                {cate.name}
              </option>
            ))}
          </select>

          <select
            className="border rounded-2xl p-2 px-4 font-medium cursor-pointer"
            onChange={(e) => setPriceSort(e.target.value)}
          >
            <option value="">Giá (Mặc định)</option>
            <option value="asc">Thấp → Cao</option>
            <option value="desc">Cao → Thấp</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-6 justify-center mt-6">
          {product.map((item) => (
            <div className="w-[26%] rounded-[20px]" key={item.id}>
              <Link to={`/product/${item.id}`}>
                <img
                  src={
                    // "http://localhost:8088/ecomer/" +
                    item.image
                  }
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

      <Footer></Footer>
    </>
  );
};

export default Shop;
