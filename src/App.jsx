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
function App() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return (
    <>
      {user && <Header></Header>}

      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        ></Route>
        <Route path="/buy" element={<Buy></Buy>}></Route>
        <Route
          path="product/:id"
          element={<ProductDetail></ProductDetail>}
        ></Route>
        <Route path="/shop" element={<Shop></Shop>}></Route>
        <Route path="/store" element={<Store></Store>}></Route>
      </Routes>
      <ScrollToTop></ScrollToTop>
    </>
  );
}

export default App;
