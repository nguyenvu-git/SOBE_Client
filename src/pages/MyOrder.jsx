// import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";

// export default function MyOrders() {
//   const user = JSON.parse(localStorage.getItem("auth"));
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetch(
//       `http://localhost:8088/ecomer/api/orders?action=user_orders&user_id=${user.id}`
//     )
//       .then((res) => res.json())
//       .then((res) => {
//         setOrders(res.data); // 👈 CHỈ LẤY data
//       });
//   }, []);

//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">My Orders</h1>

//       {orders.map((order) => (
//         <div
//           key={order.id}
//           className="flex justify-between items-center border-b py-4"
//         >
//           <div>
//             <p className="font-semibold">{order.created_at}</p>
//             <p className="text-sm text-gray-500">{order.status}</p>
//           </div>

//           <NavLink
//             to={`/orders/${order.id}`}
//             className="text-blue-600 hover:underline"
//           >
//             View Details
//           </NavLink>
//         </div>
//       ))}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function MyOrders() {
  const user = JSON.parse(localStorage.getItem("auth"));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:8088/ecomer/api/orders?action=user_orders&user_id=${user.id}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data.data); // chỉ lấy data
      } catch (error) {
        console.error("Fetch orders error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center text-gray-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="mx-auto w-[80%] px-4 py-10 mt-30">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          You have no orders yet.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-5 gap-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order #{order.id}
                  </p>
                  <p className="font-semibold">{order.created_at}</p>
                </div>

                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                  {order.status}
                </span>

                <NavLink
                  to={`/orders/${order.id}`}
                  className="text-sm font-semibold text-[#0a2a66] hover:underline"
                >
                  View Details →
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
