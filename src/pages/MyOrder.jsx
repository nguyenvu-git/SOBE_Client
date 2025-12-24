import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function MyOrders() {
  const user = JSON.parse(localStorage.getItem("auth"));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:8088/ecomer/api/orders?action=user_orders&user_id=${user.id}`
    )
      .then((res) => res.json())
      .then((res) => {
        setOrders(res.data); // 👈 CHỈ LẤY data
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="flex justify-between items-center border-b py-4"
        >
          <div>
            <p className="font-semibold">{order.created_at}</p>
            <p className="text-sm text-gray-500">{order.status}</p>
          </div>

          <NavLink
            to={`/orders/${order.id}`}
            className="text-blue-600 hover:underline"
          >
            View Details
          </NavLink>
        </div>
      ))}
    </div>
  );
}
