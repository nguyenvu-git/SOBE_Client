import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [openCart, setOpenCart] = useState(false);
  const { cartItems, removeFromCart, totalProducts } = useCart();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <>
      <div className="py-6 bg-[#333] sm:block fixed top-0 left-0 w-full hidden z-100">
        <div className="flex justify-between px-8 text-[14px] text-gray-800 pb-1">
          <div className=""></div>
          <div className="flex gap-2 font-medium text-[#999]">
            {/* <Link to={"/login"}>
              <p className="cursor-pointer">Sign In</p>
            </Link>
            <p className="">/</p>
            <Link to={"/signup"}>
              <p className="cursor-pointer">Sign Up</p>
            </Link> */}
            <p
              className="cursor-pointer hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </p>
          </div>
        </div>
        <div className="w-[80%] mx-auto flex items-center">
          <div className=""></div>
          <div className="">
            <img src="\logo.svg" alt="" className="w-[64px] h-[64px]" />
          </div>

          {/* <div className="ml-20 flex gap-9">
            <NavLink
              className={"text-xl text-[#999] font-semibold hover:text-gray-100"}
              
              to={"/"}
            >
              Home
            </NavLink>

            <NavLink
              className={"text-xl text-[#999] font-semibold hover:text-gray-100"}
              to={"/shop"}
            >
              Shop
            </NavLink>

            <NavLink
              className={"text-xl text-[#999] font-semibold hover:text-gray-100"}
              to={"/store"}
            >
              Store
            </NavLink>

            <NavLink
              className="text-xl text-[#999] font-semibold hover:text-gray-100"
              to="/my-orders"
            >
              My Orders
            </NavLink>
          </div> */}

          <div className="ml-20 flex gap-9">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-xl font-semibold hover:text-gray-100 ${
                  isActive ? "text-white" : "text-[#999]"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `text-xl font-semibold hover:text-gray-100 ${
                  isActive ? "text-white" : "text-[#999]"
                }`
              }
            >
              Shop
            </NavLink>

            <NavLink
              to="/store"
              className={({ isActive }) =>
                `text-xl font-semibold hover:text-gray-100 ${
                  isActive ? "text-white" : "text-[#999]"
                }`
              }
            >
              Store
            </NavLink>

            <NavLink
              to="/my-orders"
              className={({ isActive }) =>
                `text-xl font-semibold hover:text-gray-100 ${
                  isActive ? "text-white" : "text-[#999]"
                }`
              }
            >
              My Orders
            </NavLink>
          </div>

          <div className="w-[40%] ml-10 flex">
            <input
              className="rounded-4xl px-4 py-4 w-full bg-gray-200"
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/shop?keyword=${search}`);
                }
              }}
            />
            {/* <img
              src="/vite.svg"
              className="right-4 top-4 cursor-pointer"
              onClick={() => navigate(`/shop?keyword=${search}`)}
            /> */}
          </div>

          {/* Overlay mờ phía sau */}
          {openCart && (
            <div
              onClick={() => setOpenCart(false)}
              className="fixed inset-0 bg-black/40 z-40"
            ></div>
          )}

          {/* Panel giỏ hàng trượt từ phải */}
          <div
            className={`fixed top-0 right-0 h-full w-[28%] bg-white z-50 shadow-lg transform transition-transform duration-300 
  ${openCart ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="p-5 flex justify-between items-center border-b">
              <h2 className="text-lg font-bold">Your Cart</h2>
              <button className="text-xl" onClick={() => setOpenCart(false)}>
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 h-[80%]">
              {cartItems.length === 0 ? (
                <p className="mt-80 text-center">Chưa có sản phẩm nào</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 items-center border-b pb-3"
                  >
                    <img
                      src={"http://localhost:8088/ecomer/" + item.image}
                      className="w-[60px] h-[60px] rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-bold">{item.name}</p>
                      <p>
                        {item.price} x {item.qty}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm"
                    >
                      Xóa
                    </button>
                  </div>
                ))
              )}
            </div>
            <Link to={"/buy"}>
              <button className="w-[80%] rounded-[50px] flex h-[8%] font-medium flex-col items-center justify-center text-white mx-auto bg-[#718D6D] hover:bg-[#254C22]">
                Check out
              </button>
            </Link>
          </div>

          <div
            onClick={() => setOpenCart(!openCart)}
            className="flex justify-end w-[14%] relative"
          >
            <div className="absolute -right-3 -top-3 rounded-full px-2 py-1 bg-[#00B207] text-white text-[12px]">
              {totalProducts}
            </div>
            <img className="cursor-pointer" src="\iconcart.svg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
