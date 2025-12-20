import { Outlet, Link } from "react-router-dom";
import UserList from "./pages/UserList";
import CategoryList from "./pages/CategoryList";
import Sidebar from "./components/SideBar";
export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        {/* <nav className="space-y-3 flex flex-col">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/category">Category</Link>
          <Link to="/admin/products">Products</Link>
        </nav> */}
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
