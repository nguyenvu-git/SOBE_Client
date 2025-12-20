import "./App.css";
import { NavLink } from "react-router-dom";
import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import Buy from "./pages/Buy";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import Store from "./pages/Store";
import SignUp from "./pages/SignUp";
import ScrollToTop from "./components/ScroolToTop";
import AdminLayout from "./admin/AdminLayout";
import ProtectedRoute from "./router/ProtectedRoute";
import { useEffect, useState } from "react";
import UserList from "./admin/pages/UserList";
import CategoryList from "./admin/pages/CategoryList";

function App() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const auth = localStorage.getItem("auth");
  //   setUser(auth ? JSON.parse(auth) : null);
  // }, []);

  const [user, setUser] = useState(() => {
    const auth = localStorage.getItem("auth");
    return auth ? JSON.parse(auth) : null;
  });

  return (
    <>
      {user?.role === "customer" && <Header />}

      <Routes>
        {/* <Route
          path="/login"
          element={
            user ? <Navigate to="/" replace /> : <SignIn setUserr={setUser} />
          }
        /> */}

        <Route path="/login" element={<SignIn setUserr={setUser} />} />

        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/store" element={<Store />} />
        </Route>
        {/* <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" replace />}
        />

        <Route path="/buy" element={<Buy />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/store" element={<Store />} /> */}

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="admin/users" element={<UserList></UserList>}></Route>
          <Route
            path="admin/category"
            element={<CategoryList></CategoryList>}
          ></Route>
        </Route>
      </Routes>

      <ScrollToTop />
    </>
  );
}
export default App;
