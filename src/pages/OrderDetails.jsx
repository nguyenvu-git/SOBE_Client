// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function OrderDetails() {
//   const { id } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`http://localhost:8088/ecomer/api/orders?action=detail&id=${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setOrder(data.data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (!order) return <p className="text-center mt-10">Order not found</p>;

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       {/* Title */}
//       <h1 className="text-2xl font-bold mb-6">Order Details</h1>

//       {/* Order Info */}
//       <div className="bg-white shadow rounded p-4 mb-6 grid md:grid-cols-3 gap-4 mt-40">
//         <div>
//           <p className="text-gray-500">Order Code</p>
//           <p className="font-semibold">{order.id}</p>
//         </div>
//         <div>
//           <p className="text-gray-500">Order Date</p>
//           <p>{order.created_at}</p>
//         </div>
//         <div>
//           <p className="text-gray-500">Status</p>
//           <span className="px-3 py-1 rounded text-sm bg-blue-100 text-blue-700">
//             {order.status}
//           </span>
//         </div>
//       </div>

//       {/* Customer Info */}
//       <div className="bg-white shadow rounded p-4 mb-6">
//         <h2 className="font-semibold mb-3">Customer Information</h2>
//         <p>
//           <b>Name:</b> {order.username}
//         </p>
//         <p>
//           <b>Full name:</b> {order.fullname}
//         </p>
//         {/* <p>
//           <b>Phone:</b> {order.user.phone}
//         </p>
//         <p>
//           <b>Address:</b> {order.user.address}
//         </p> */}
//       </div>

//       {/* Products */}
//       <div className="bg-white shadow rounded p-4 mb-6">
//         <h2 className="font-semibold mb-4">Products</h2>

//         {/* Desktop Table */}
//         <div className="hidden md:block">
//           <table className="w-full border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2 text-left">Product</th>
//                 <th className="p-2">Price</th>
//                 <th className="p-2">Qty</th>
//                 <th className="p-2">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {order.items.map((item) => (
//                 <tr key={item.id} className="border-t">
//                   <td className="p-2 flex items-center gap-3">
//                     <img
//                       src={item.image}
//                       alt=""
//                       className="w-14 h-14 object-cover rounded"
//                     />
//                     {item.name}
//                   </td>
//                   <td className="p-2 text-center">
//                     {item.price.toLocaleString()} ₫
//                   </td>
//                   <td className="p-2 text-center">{item.qty}</td>
//                   <td className="p-2 text-center font-semibold">
//                     {(item.price * item.qty).toLocaleString()} ₫
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile Cards */}
//         <div className="md:hidden space-y-4">
//           {order.items.map((item) => (
//             <div key={item.id} className="border rounded p-3 flex gap-3">
//               <img
//                 src={`http://localhost:8088/ecomer${item.image}`}
//                 alt=""
//                 className="w-20 h-20 object-cover rounded"
//               />
//               <div className="flex-1">
//                 <p className="font-semibold">{item.name}</p>
//                 <p>Price: {item.price.toLocaleString()} ₫</p>
//                 <p>Qty: {item.quantity}</p>
//                 <p className="font-bold">
//                   Total: {(item.price * item.quantity).toLocaleString()} ₫
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Summary */}
//       <div className="bg-white shadow rounded p-4 flex justify-between items-center">
//         <span className="text-lg font-semibold">Total</span>
//         <span className="text-xl font-bold text-red-600">
//           {order.total_price.toLocaleString()} ₫
//         </span>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await fetch(
          `http://localhost:8088/ecomer/api/orders?action=detail&id=${id}`
        );

        if (!res.ok) throw new Error("Failed to fetch order");

        const data = await res.json();
        setOrder(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  const statusStyle = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading)
    return <p className="text-center py-20 text-gray-500">Loading...</p>;

  if (!order) return <p className="text-center py-20">Order not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-30">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Order Details</h1>
        <p className="text-gray-500">Order #{order.id}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <p className="text-gray-500 text-sm">Order Date</p>
          <p className="font-semibold">{order.created_at}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-5">
          <p className="text-gray-500 text-sm">Status</p>
          <span
            className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${statusStyle(
              order.status
            )}`}
          >
            {order.status}
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-5">
          <p className="text-gray-500 text-sm">Total Amount</p>
          <p className="text-xl font-bold text-[#00B207]">
            {order.total_price.toLocaleString()} ₫
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-medium">Username:</span> {order.username}
          </p>
          <p>
            <span className="font-medium">Full name:</span> {order.fullname}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h2 className="text-lg font-semibold mb-5">Products</h2>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-center">Price</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={item.image}
                      className="w-14 h-14 rounded object-cover"
                    />
                    <span className="font-medium">{item.name}</span>
                  </td>
                  <td className="p-3 text-center">
                    {item.price.toLocaleString()} ₫
                  </td>
                  <td className="p-3 text-center">{item.qty}</td>
                  <td className="p-3 text-center font-semibold">
                    {(item.price * item.qty).toLocaleString()} ₫
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 flex gap-4">
              <img
                src={`http://localhost:8088/ecomer${item.image}`}
                className="w-20 h-20 rounded object-cover"
              />
              <div className="flex-1 text-sm">
                <p className="font-semibold">{item.name}</p>
                <p>Price: {item.price.toLocaleString()} ₫</p>
                <p>Qty: {item.qty}</p>
                <p className="font-bold mt-1">
                  {(item.price * item.qty).toLocaleString()} ₫
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6 flex justify-between items-center">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-2xl font-bold text-[#00B207]">
          {order.total_price.toLocaleString()} ₫
        </span>
      </div>
    </div>
  );
}
