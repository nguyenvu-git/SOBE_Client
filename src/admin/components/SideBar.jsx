import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-5 h-screen">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="space-y-3">
        <Link to="/admin/users" className="block hover:text-blue-400">
          Users
        </Link>
        <Link to="/admin/category" className="block hover:text-blue-400">
          Categories
        </Link>
        <Link to="/admin/products" className="block hover:text-blue-400">
          Products
        </Link>
        <Link to="/admin/orders" className="block hover:text-blue-400">
          Orders
        </Link>
      </nav>
    </aside>
  );
}
