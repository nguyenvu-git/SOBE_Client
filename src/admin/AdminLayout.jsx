import { Outlet, Link } from "react-router-dom";
import UserList from "./pages/UserList";
import CategoryList from "./pages/CategoryList";
import Sidebar from "./components/SideBar";
export default function AdminLayout() {
  return (
    <div className="flex">
      {/* <aside className="w-64 bg-gray-900 text-white p-5"></aside> */}
      <div className="w-[20%]">
        <Sidebar></Sidebar>
      </div>
      <main className="bg-gray-100 pl-16 w-[80%] pt-6">
        <Outlet />
      </main>
    </div>
  );
}
