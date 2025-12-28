import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
export default function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <aside className="w-[20%] bg-gray-900 text-white h-screen p-5 fixed top-0 left-0">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="space-y-3">
        <Link to="users" className="block font-medium hover:text-blue-400">
          Users
        </Link>
        <Link to="category" className="block font-medium hover:text-blue-400">
          Categories
        </Link>
        <Link to="products" className="block font-medium hover:text-blue-400">
          Products
        </Link>
        <Link to="orders" className="block font-medium hover:text-blue-400">
          Orders
        </Link>
        <div className="">
          <p
            className="font-medium cursor-pointer hover:text-blue-400"
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
      </nav>
    </aside>
  );
}
