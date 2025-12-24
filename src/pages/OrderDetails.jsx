import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8088/ecomer/api/orders?action=detail&id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!order) return <p className="text-center mt-10">Order not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      {/* Order Info */}
      <div className="bg-white shadow rounded p-4 mb-6 grid md:grid-cols-3 gap-4 mt-40">
        <div>
          <p className="text-gray-500">Order Code</p>
          <p className="font-semibold">{order.id}</p>
        </div>
        <div>
          <p className="text-gray-500">Order Date</p>
          <p>{order.created_at}</p>
        </div>
        <div>
          <p className="text-gray-500">Status</p>
          <span className="px-3 py-1 rounded text-sm bg-blue-100 text-blue-700">
            {order.status}
          </span>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="font-semibold mb-3">Customer Information</h2>
        <p>
          <b>Name:</b> {order.username}
        </p>
        <p>
          <b>Full name:</b> {order.fullname}
        </p>
        {/* <p>
          <b>Phone:</b> {order.user.phone}
        </p>
        <p>
          <b>Address:</b> {order.user.address}
        </p> */}
      </div>

      {/* Products */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="font-semibold mb-4">Products</h2>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Product</th>
                <th className="p-2">Price</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt=""
                      className="w-14 h-14 object-cover rounded"
                    />
                    {item.name}
                  </td>
                  <td className="p-2 text-center">
                    {item.price.toLocaleString()} ₫
                  </td>
                  <td className="p-2 text-center">{item.qty}</td>
                  <td className="p-2 text-center font-semibold">
                    {(item.price * item.qty).toLocaleString()} ₫
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="border rounded p-3 flex gap-3">
              <img
                src={`http://localhost:8088/ecomer${item.image}`}
                alt=""
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p>Price: {item.price.toLocaleString()} ₫</p>
                <p>Qty: {item.quantity}</p>
                <p className="font-bold">
                  Total: {(item.price * item.quantity).toLocaleString()} ₫
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white shadow rounded p-4 flex justify-between items-center">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-xl font-bold text-red-600">
          {order.total_price.toLocaleString()} ₫
        </span>
      </div>
    </div>
  );
}
