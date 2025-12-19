import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
const SignIn = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:8088/ecomer/api/auth?action=login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user,
            password: password,
          }),
        }
      );

      const data = await res.json();
      console.log(data);
      if (data.success) {
        // lưu user
        localStorage.setItem("user", JSON.stringify(data.user));
        // chuyển sang trang chủ
        // window.location.href = "/";
        navigate("/");
      } else {
        alert(data.message || "Sai tài khoản hoặc mật khẩu");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server");
    }
  };
  return (
    <div className="mx-auto flex items-center flex-col justify-center h-screen">
      <h1 className="sm:text-4xl text-2xl font-bold text-[#718D6D]">
        ĐĂNG NHẬP TÀI KHOẢN
      </h1>
      <p className="text-[#737373] sm:mt-4 mt-1 sm:text-[16px] text-[14px]">
        Bắt đầu hành trình thời trang bền vững
      </p>

      <form
        onSubmit={handleLogin}
        className="flex flex-col w-[60%] mx-auto mt-8 sm:mt-18"
      >
        <input
          type="text"
          className="sm:p-4 p-2 w-full rounded-2xl border"
          placeholder="User Name"
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          className="sm:p-4 p-2 w-full rounded-2xl border mt-4 sm:mt-8"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to={"/signup"}>
          <p className="text-blue-400 text-[12px] sm:text-[16px] mt-2 text-end cursor-pointer">
            Bạn chưa có tài khoản ?
          </p>
        </Link>
        <div className="w-full mt-4 sm:mt-8">
          <button
            type="submit"
            className="rounded-3xl bg-[#718D6D] py-2 sm:text-xl font-bold text-white w-full cursor-pointer hover:bg-[#254C22]"
          >
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
