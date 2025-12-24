import { useEffect, useState } from "react";

/* ================= CONFIG ================= */
const BASE_URL = "http://localhost:8088/ecomer/api";

/* ================= BADGE ================= */
function OrderStatusBadge({ status }) {
  const colors = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    shipping: "bg-purple-100 text-purple-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
}

/* ================= MODAL ================= */
function OrderDetailModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Đơn hàng #{order.id}</h2>
          <button onClick={onClose} className="text-gray-500">
            ✖
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <p>
            User ID: <b>{order.user_id}</b>
          </p>
          <OrderStatusBadge status={order.status} />
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left">Sản phẩm</th>
              <th className="text-center">SL</th>
              <th className="text-right">Giá</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item) => (
              <tr key={item.id} className="border-b">
                <td>{item.product_name}</td>
                <td className="text-center">{item.qty}</td>
                <td className="text-right">{item.price}đ</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right font-semibold mt-4">
          Tổng tiền: {order.total_price}đ
        </div>
      </div>
    </div>
  );
}

/* ================= PAGE ================= */
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  /* ===== LOAD ORDERS ===== */
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await fetch(`${BASE_URL}/orders?action=list`);
    const data = await res.json();
    setOrders(data.data);
  };

  /* ===== DETAIL ===== */
  const fetchOrderDetail = async (id) => {
    const res = await fetch(`${BASE_URL}/orders?action=detail&id=${id}`);
    const data = await res.json();
    setSelectedOrder(data.data);
  };

  /* ===== UPDATE STATUS ===== */
  const handleUpdateStatus = async (id, status) => {
    await fetch(`${BASE_URL}/orders?action=update_status&id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  /* ===== FILTER ===== */
  const filteredOrders = orders.filter(
    (o) => !statusFilter || o.status === statusFilter
  );

  /* ===== STATS ===== */
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    completed: orders.filter((o) => o.status === "completed").length,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>

      {/* ===== DASHBOARD ===== */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatBox label="Tổng đơn" value={stats.total} />
        <StatBox label="Chờ xử lý" value={stats.pending} />
        <StatBox label="Hoàn thành" value={stats.completed} />
      </div>

      {/* ===== FILTER ===== */}
      <div className="mb-4">
        <select
          className="border px-3 py-2 rounded"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipping">Shipping</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* ===== TABLE ===== */}
      <table className="w-full bg-white rounded-xl overflow-hidden shadow">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th>ID</th>
            <th>User</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((o) => (
            <tr key={o.id} className="border-b text-center">
              <td>{o.id}</td>
              <td>{o.user_id}</td>
              <td>
                <OrderStatusBadge status={o.status} />
              </td>
              <td className="space-x-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => fetchOrderDetail(o.id)}
                >
                  Xem
                </button>

                <select
                  className="border rounded px-2 py-1"
                  defaultValue={o.status}
                  onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                >
                  <option value="pending">pending</option>
                  <option value="confirmed">confirmed</option>
                  <option value="shipping">shipping</option>
                  <option value="completed">completed</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== MODAL ===== */}
      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}

/* ================= STAT BOX ================= */
function StatBox({ label, value }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <p className="text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
