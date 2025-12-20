// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, role }) {
//   const user = JSON.parse(localStorage.getItem("auth") || "null");

//   // Chưa đăng nhập
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Có yêu cầu role nhưng không đủ quyền
//   if (role && user.role !== role) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("auth"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // return <Navigate to="/unauthorized" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
