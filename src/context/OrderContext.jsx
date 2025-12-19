import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderId, setOrderId] = useState(null);

  const createOrder = async (userId, total) => {
    const res = await fetch(
      "http://localhost:8088/ecomer/api/orders?action=create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, total_price: total }),
      }
    );
    const data = await res.json();
    setOrderId(data.order_id);
    return data.order_id;
  };

  const addItem = async (orderId, item) => {
    await fetch("http://localhost:8088/ecomer/api/orders?action=add_item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: orderId,
        product_id: item.id,
        qty: item.qty,
        price: item.price,
      }),
    });
  };

  // const removeItem = async (itemId) => {
  //   await fetch(
  //     `http://localhost:8088/ecomer/api/orders?action=remove_item&item_id=${itemId}`,
  //     {
  //       method: "DELETE",
  //     }
  //   );
  // };

  return (
    <OrderContext.Provider value={{ orderId, createOrder, addItem }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
