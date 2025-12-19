import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
const Buy = () => {
  const [orderItems, setOrderItems] = useState([]);

  const { cartItems, removeFromCart, clearCart, increaseQty, decreaseQty } =
    useCart();
  const { createOrder, addItem, orderId } = useOrder();

  const user = JSON.parse(localStorage.getItem("user"));

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  useEffect(() => {
    if (!user) return;

    const fetchOrderItems = async () => {
      const res = await fetch(
        `http://localhost:8088/ecomer/api/orders?action=detail&id=${orderId}`
      );
      const data = await res.json();
      setOrderItems(data.items);
    };

    if (orderId) {
      fetchOrderItems();
    }
  }, [orderId]);

  const handleCheckout = async () => {
    const orderId = await createOrder(user.id, total);

    for (let item of cartItems) {
      await addItem(orderId, item);
    }

    clearCart();
    alert("Đặt hàng thành công!");
  };

  return (
    <>
      <div className="w-[80%] mx-auto mt-40 mb-30">
        <div className="w-full relative">
          <div className="flex gap-8">
            <div className="w-[70%] border rounded-2xl overflow-hidden">
              <table className="w-full h-[300px]">
                <thead className="">
                  <tr className=" text-left border px-5 py-4 ">
                    <th className="px-5 py-3 uppercase text-[14px] text-[#808080]">
                      Product
                    </th>
                    <th className="px-5 py-3 uppercase text-[14px] text-[#808080]">
                      price
                    </th>
                    <th className="px-5 py-3 uppercase text-[14px] text-[#808080]">
                      Quantity
                    </th>
                    <th className="px-5 py-3 uppercase text-[14px] text-[#808080]">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {cartItems.map((product) => (
                    <tr key={product.id} className=" text-left border">
                      <td className="px-5 py-3">
                        <div className="flex  items-center gap-3">
                          <img
                            src={
                              "http://localhost:8088/ecomer/" + product.image
                            }
                            className="w-24 h-24 rounded"
                          />
                          <p>{product.name}</p>
                        </div>
                      </td>
                      <td className=" px-5 py-3 gap-3">{product.price}</td>
                      <td className="px-5 py-3 gap-3">
                        <div className="flex gap-2 border-2 rounded-4xl w-[124px] justify-between p-2 items-center">
                          <div className="bg-[#F2F2F2] rounded-full p-[10px] flex items-center justify-center cursor-pointer">
                            <img
                              onClick={() => increaseQty(product.id)}
                              className="w-[14px] h-[14px]"
                              src="/add.svg"
                              alt=""
                            />
                          </div>
                          <p>{product.qty}</p>
                          <div className="bg-[#F2F2F2] rounded-full p-[10px] flex items-center justify-center cursor-pointer">
                            <img
                              onClick={() => decreaseQty(product.id)}
                              className="w-[14px] h-[14px]"
                              src="/del.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>

                      <td className=" px-5 py-3 gap-3"> {product.qty}</td>
                      <td className=" px-5 py-3 gap-3">
                        <img
                          onClick={() => removeFromCart(product.id)}
                          className="cursor-pointer w-6 h-6"
                          src="\cclose.svg"
                          alt=""
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-[30%] sticky top-40 h-[296px] border rounded-2xl p-6">
              {/* <h1 className="text-2xl font-bold">Giỏ hàng</h1>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-3 border-b">
                <p>
                  {item.name} (x{item.qty})
                </p>
                <p>{item.price} đ</p>
              </div>
            ))}

            <h2 className="text-xl mt-4">Tổng tiền: {total} $</h2>

            <button
              onClick={handleCheckout}
              className="bg-green-700 text-white px-6 py-3 rounded mt-5"
            >
              Thanh toán
            </button> */}
              <div className="p-6">
                <p className="text-[20px] font-medium">Cart Total </p>
                <div className="flex justify-between mt-5">
                  <p className="text-[14px] text-[#4D4D4D]">Subtotal: </p>
                  <p className="text-[14px] font-medium">${total}</p>
                </div>
                <p className="w-full bg-[#E6E6E6] h-[1px] mt-3"></p>
                <div className="flex justify-between mt-3">
                  <p className="text-[14px] text-[#4D4D4D]">Shipping: </p>
                  <p className="text-[14px] font-medium">Free</p>
                </div>
                <p className="w-full bg-[#E6E6E6] h-[1px] mt-3"></p>
                <div className="flex justify-between">
                  <p className="text-[#4D4D4D] mt-3">Total: </p>
                  <p className="font-semibold">${total}</p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="bg-[#00B207] rounded-4xl w-full py-[14px] mt-5 cursor-pointer text-[14px] font-semibold text-white"
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Buy;
